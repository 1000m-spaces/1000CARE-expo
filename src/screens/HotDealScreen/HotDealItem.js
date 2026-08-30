import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { Image } from '~/common/index'
import dimens from '~/constants/dimens'
import { DIMENS } from '~/constants/index'
import { brandColors, brandShadow } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import PressScale from '~/design-system/PressScale'

const HotDealItem = ({ data, onClick }) => {
  const isPending = data.distributor?.status === 2
  return (
    <PressScale
      style={styles.wrap}
      onPress={() => {
        if (!isPending && onClick) {
          onClick(data)
        }
      }}
    >
      {
        isPending && (
          <View style={styles.overlay}>
            <Text
              style={styles.pending}
            >
              {'Coming soon'}
            </Text>
          </View>
        )
      }
      <Image
        style={styles.image}
        source={{ uri: data.images }}
        resizeMode={'cover'}
        heightImage={Number(1.5 * DIMENS.common.WINDOW_WIDTH * 2 / 3).toFixed(0)}
        widthImage={Number(1.5 * DIMENS.common.WINDOW_WIDTH).toFixed(0)}
      />
      {
        !isPending && (
          <View style={styles.button}>
            {data?.banner_type == 1
              ? <Text style={styles.textButton}>Đặt ngay</Text>
              : data?.banner_type == 2 ? <Text style={styles.textButton}>Nạp tiền</Text>
                : <Text style={styles.textButton}>Xem chi tiết</Text>
            }
          </View>
        )
      }
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: dimens.common.WINDOW_WIDTH - s(32),
    height: (dimens.common.WINDOW_WIDTH - s(32)) * 0.5,
    backgroundColor: brandColors.surface,
    marginTop: s(12),
    borderRadius: s(20),
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    minWidth: s(132),
    height: s(38),
    backgroundColor: brandColors.tealPrimary,
    borderRadius: s(19),

    position: 'absolute',
    zIndex: 9,
    right: s(14),
    bottom: s(14),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: fs(13),
    lineHeight: fs(16),
    color: brandColors.surface,
    fontWeight: '600',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(114, 114, 114, 0.5)',
    position: 'absolute',
    zIndex: 999999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pending: {
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.white,
  },
})

export default HotDealItem
