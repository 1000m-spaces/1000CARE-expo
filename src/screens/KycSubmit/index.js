import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActionSheetIOS, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PressScale from '~/design-system/PressScale';
import LiquidGlassView from '~/design-system/LiquidGlassView';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import ErrorView from '~/common/ErrorView';
import {
  getKycV2 as getKycV2Action,
  submitKycV2,
  resetSubmitKycV2,
  uploadKycDocV2,
  resetUploadKycDocV2,
} from '~/store/authV2/authV2Actions';
import {
  getKycV2Status,
  getKycV2,
  getSubmitKycV2Status,
  getSubmitKycV2Err,
  getUploadKycDocV2Status,
  getUploadKycDocV2Err,
  getUploadedKycDocsV2,
} from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { brandColors, brandGradients } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

const KYC_STATUS_LABEL = {
  unverified: { text: 'Chưa nộp hồ sơ', color: brandColors.muted },
  submitted: { text: 'Đang chờ duyệt', color: brandColors.goldAccent },
  verified: { text: 'Đã xác thực', color: brandColors.success },
  rejected: { text: 'Bị từ chối', color: brandColors.danger },
};

// Màn nộp hồ sơ nhà thuốc (GPP) — điều kiện để đặt đơn thật
// (kyc_status='verified'), backend mới marketplace-core. Xem
// [[marketplace-core-business-model]] mục "Duyệt user" + KYC.
// LƯU Ý: upload ảnh dùng module media (2 bước: create + confirm) —
// purpose='legal_doc' còn ghi "còn nợ" trong chính thiết kế backend tại
// 2026-09-07, có thể lỗi thật khi gọi — không mock, để ErrorView hiện
// lỗi thật nếu backend chưa xử lý xong.
const KycSubmit = ({ navigation }) => {
  const dispatch = useDispatch();

  const kycStatusReq = useSelector(state => getKycV2Status(state));
  const kyc = useSelector(state => getKycV2(state));
  const submitStatus = useSelector(state => getSubmitKycV2Status(state));
  const submitErr = useSelector(state => getSubmitKycV2Err(state));
  const uploadStatus = useSelector(state => getUploadKycDocV2Status(state));
  const uploadErr = useSelector(state => getUploadKycDocV2Err(state));
  const uploadedDocs = useSelector(state => getUploadedKycDocsV2(state));

  const [showError, setShowError] = useState('');

  useEffect(() => {
    dispatch(getKycV2Action());
  }, []);

  useEffect(() => {
    if (uploadErr) setShowError(uploadErr);
  }, [uploadErr]);

  useEffect(() => {
    if (submitErr) setShowError(submitErr);
  }, [submitErr]);

  const currentStatus = kyc?.kyc_status || 'unverified';
  const statusInfo = KYC_STATUS_LABEL[currentStatus] || KYC_STATUS_LABEL.unverified;
  const canEdit = currentStatus === 'unverified' || currentStatus === 'rejected';
  const uploading = uploadStatus === Status.LOADING;
  const submitting = submitStatus === Status.LOADING;

  const addPhoto = source => {
    const options = { mediaType: 'photo', quality: 0.8 };
    const onPicked = response => {
      const picked = response?.assets?.[0];
      if (!picked) return;
      dispatch(
        uploadKycDocV2({
          uri: picked.uri,
          mime: picked.type || 'image/jpeg',
          sizeBytes: picked.fileSize || 0,
          fileName: picked.fileName || `gpp-${Date.now()}.jpg`,
          kind: 'gpp',
        }),
      );
    };
    if (source === 'camera') {
      launchCamera(options, onPicked);
    } else {
      launchImageLibrary(options, onPicked);
    }
  };

  const onAddPhotoPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Huỷ', 'Chụp ảnh', 'Chọn từ thư viện'], cancelButtonIndex: 0 },
        buttonIndex => {
          if (buttonIndex === 1) addPhoto('camera');
          if (buttonIndex === 2) addPhoto('library');
        },
      );
    } else {
      Alert.alert('Ảnh giấy phép GPP', '', [
        { text: 'Huỷ', style: 'cancel' },
        { text: 'Chụp ảnh', onPress: () => addPhoto('camera') },
        { text: 'Chọn từ thư viện', onPress: () => addPhoto('library') },
      ]);
    }
  };

  const onSubmit = () => {
    if (uploadedDocs.length === 0) return;
    dispatch(submitKycV2(uploadedDocs.map(d => ({ asset_id: d.assetId, kind: d.kind }))));
  };

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <LiquidGlassView intensity="regular" style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </LiquidGlassView>
        </PressScale>

        <View style={styles.content}>
          <Text style={styles.title}>Xác thực hồ sơ nhà thuốc</Text>
          <Text style={styles.subtitle}>
            Nộp ảnh Giấy chứng nhận GPP để được duyệt đặt đơn hàng thật trên hệ thống.
          </Text>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Trạng thái:</Text>
            <Text style={[styles.statusValue, { color: statusInfo.color }]}>{statusInfo.text}</Text>
          </View>
          {currentStatus === 'rejected' && kyc?.kyc_note ? (
            <View style={styles.rejectBox}>
              <Text style={styles.rejectText}>Lý do từ chối: {kyc.kyc_note}</Text>
            </View>
          ) : null}

          {canEdit && (
            <>
              <Text style={styles.sectionLabel}>Ảnh giấy phép GPP</Text>
              <View style={styles.photoGrid}>
                {uploadedDocs.map((doc, index) => (
                  <Image key={`${doc.assetId}-${index}`} source={{ uri: doc.previewUri }} style={styles.photoThumb} />
                ))}
                <PressScale onPress={onAddPhotoPress} disabled={uploading} style={styles.addPhotoTile}>
                  {uploading ? (
                    <Text style={styles.addPhotoText}>...</Text>
                  ) : (
                    <>
                      <Icon type="feather" name="camera" color={brandColors.tealDark} size={s(22)} />
                      <Text style={styles.addPhotoText}>Thêm ảnh</Text>
                    </>
                  )}
                </PressScale>
              </View>

              <PressScale
                onPress={onSubmit}
                disabled={uploadedDocs.length === 0 || submitting}
                style={styles.submitButton}
              >
                <LinearGradient
                  colors={
                    uploadedDocs.length === 0 || submitting
                      ? [brandColors.border, brandColors.border]
                      : brandGradients.primary
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.submitButtonGradient}
                >
                  <Text style={styles.submitButtonText}>
                    {submitting ? 'Đang gửi...' : 'Gửi hồ sơ duyệt'}
                  </Text>
                </LinearGradient>
              </PressScale>
            </>
          )}
        </View>
      </ScrollView>

      <ErrorView
        error={showError}
        isOpen={!!showError}
        onClose={() => {
          setShowError('');
          dispatch(resetUploadKycDocV2());
          dispatch(resetSubmitKycV2());
        }}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    marginTop: s(58),
    marginLeft: s(16),
  },
  backButtonGlass: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: s(24),
    paddingTop: s(20),
    paddingBottom: s(40),
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(18),
    fontWeight: '800',
    marginBottom: s(8),
  },
  subtitle: {
    color: brandColors.muted,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '600',
    marginBottom: s(20),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    marginBottom: s(8),
  },
  statusLabel: {
    color: brandColors.textDark,
    fontSize: fs(13.5),
    fontWeight: '700',
  },
  statusValue: {
    fontSize: fs(13.5),
    fontWeight: '800',
  },
  rejectBox: {
    backgroundColor: 'rgba(255,59,48,0.08)',
    borderRadius: s(12),
    padding: s(10),
    marginBottom: s(16),
  },
  rejectText: {
    color: brandColors.danger,
    fontSize: fs(12.5),
    fontWeight: '600',
  },
  sectionLabel: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
    marginTop: s(12),
    marginBottom: s(10),
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(10),
    marginBottom: s(24),
  },
  photoThumb: {
    width: s(90),
    height: s(90),
    borderRadius: s(14),
    backgroundColor: brandColors.tealLight,
  },
  addPhotoTile: {
    width: s(90),
    height: s(90),
    borderRadius: s(14),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: brandColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(4),
  },
  addPhotoText: {
    color: brandColors.tealDark,
    fontSize: fs(11),
    fontWeight: '700',
  },
  submitButton: {
    width: '100%',
    borderRadius: s(16),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  submitButtonGradient: {
    height: s(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: brandColors.surface,
    fontWeight: '700',
    fontSize: fs(15),
  },
});

export default KycSubmit;
