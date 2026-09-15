import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { useState } from 'react'
import { Text } from '~/common/index'
import PressScale from '~/design-system/PressScale'
import InfoItem from './InfoItem'
import { NAVIGATION_LOAN_PAYMENT } from '~/navigation/routes'
import { useDispatch, useSelector } from 'react-redux'
import { getLoanInfo } from '~/store/selector'
import { requestGetLoanInfo } from '~/store/actions'
import { formatMoney } from '~/utils/format'
import { parseDateString } from '~/utils/date'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import { brandColors, brandGradients, brandShadow, radiusScale } from '~/design-system/tokens'
import BackgroundWash from '~/design-system/BackgroundWash'

// Màn "Vay vốn" viết lại theo spec: card hạn mức gradient teal + thanh tiến
// độ sử dụng, card thông tin lãi suất/kỳ hạn/ngày đến hạn, nút CTA gradient
// "Trả nợ ngay" (giữ nguyên logic điều hướng sang LoanPayment cũ).
const LoanRepayment = props => {
  const onGoBack = props.route?.params?.onGoBack

  const dispatch = useDispatch()
  const loanConfirmDetail = useSelector(state => getLoanInfo(state))
  const [paymentType] = useState(1)

  useEffect(() => {
    dispatch(requestGetLoanInfo())
  }, [])

  const limitAmount = Number(loanConfirmDetail?.Info?.limitAmount) || 0
  const usedAmount = Math.abs(Number(loanConfirmDetail?.Info?.loanAmount) || 0)
  const remainingAmount = Math.max(0, limitAmount - usedAmount)
  const usedPercent = limitAmount > 0 ? Math.min(100, Math.round((usedAmount / limitAmount) * 100)) : 0
  const isOverdue = loanConfirmDetail?.Info?.totalOverdueAmount && loanConfirmDetail?.Info?.totalOverdueAmount !== 0

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        title={strings.loanRepayment.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={brandGradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.limitCard}
        >
          <Text style={styles.limitEyebrow}>Hạn mức thấu chi</Text>
          <Text style={styles.limitValue}>{formatMoney(limitAmount, { unit: 'đ' })}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${usedPercent}%` }]} />
          </View>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Đã dùng: {formatMoney(usedAmount, { unit: 'đ' })}</Text>
            <Text style={styles.progressLabel}>Còn lại: {formatMoney(remainingAmount, { unit: 'đ' })}</Text>
          </View>
        </LinearGradient>

        <View style={styles.infoCard}>
          <InfoItem title='Lãi suất'>
            <Text style={styles.styleValue}>{`${loanConfirmDetail?.Info?.interestRate || 0}%/năm`}</Text>
          </InfoItem>
          <InfoItem title='Kỳ hạn thanh toán'>
            <Text style={styles.styleValue}>Hàng tháng</Text>
          </InfoItem>
          <InfoItem title='Ngày đến hạn tiếp theo'>
            <Text style={styles.styleValueAccent}>{parseDateString(loanConfirmDetail?.Info?.endDate, 'yyyy-MM-DD')}</Text>
          </InfoItem>
          <InfoItem title='Ngày truy vấn'>
            <Text style={styles.styleValue}>{parseDateString(loanConfirmDetail?.Info?.startDate, 'yyyy-MM-DD')}</Text>
          </InfoItem>
          <InfoItem title='Tài khoản thấu chi'>
            <Text style={styles.styleValue}>{loanConfirmDetail?.Info?.loanId}</Text>
          </InfoItem>
          <InfoItem title='Tình trạng khoản vay'>
            <Text style={[styles.styleValue, isOverdue && styles.styleValueDanger]}>
              {isOverdue ? 'Quá hạn' : 'Trong hạn'}
            </Text>
          </InfoItem>
        </View>
      </ScrollView>

      <View style={styles.ctaWrap}>
        <PressScale
          style={styles.ctaButton}
          onPress={() => {
            props.navigation.navigate(NAVIGATION_LOAN_PAYMENT, {
              title: 'Trả nợ toàn phần',
              paymentType,
              onGoBack,
            })
          }}
        >
          <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Trả nợ ngay</Text>
          </LinearGradient>
        </PressScale>
      </View>
    </SafeAreaView>
  )
}
export default LoanRepayment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  scrollContent: {
    padding: s(16),
    paddingBottom: s(90),
  },
  limitCard: {
    borderRadius: s(radiusScale.xxxl),
    padding: s(20),
    marginBottom: s(18),
    ...brandShadow.button,
  },
  limitEyebrow: {
    fontSize: fs(11),
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: s(8),
  },
  limitValue: {
    fontSize: fs(22),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.surface,
    marginBottom: s(10),
  },
  progressTrack: {
    height: s(6),
    borderRadius: s(3),
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
    marginBottom: s(8),
  },
  progressFill: {
    height: '100%',
    backgroundColor: brandColors.goldAccent,
    borderRadius: s(3),
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: fs(11),
    color: 'rgba(255,255,255,0.85)',
  },
  infoCard: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    paddingHorizontal: s(16),
    ...brandShadow.soft,
  },
  styleValue: {
    color: brandColors.textDark,
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  styleValueAccent: {
    color: brandColors.goldAccent,
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  styleValueDanger: {
    color: brandColors.danger,
  },
  ctaWrap: {
    padding: s(16),
    paddingBottom: s(20),
    backgroundColor: brandColors.background,
    borderTopWidth: 1,
    borderTopColor: brandColors.borderSoft,
  },
  ctaButton: {
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    ...brandShadow.button,
  },
  ctaGradient: {
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
})
