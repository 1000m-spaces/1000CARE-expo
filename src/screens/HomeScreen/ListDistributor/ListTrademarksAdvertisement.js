import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Text } from '~/common/index'
import { NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'
import { getListTrademarksAdvertisement } from '~/store/selector'
import { logoNeoMed } from '~/assets/constants'
import { formatMoney } from '~/utils/format'
import styles from './styles'
import PressScale from '~/design-system/PressScale'

const ListTrademarksAdvertisement = ({ navigation, distributor, onMessage }) => {
  const listTrademarksAdvertisement = useSelector(state => getListTrademarksAdvertisement(state))
  const safeListTrademarksAdvertisement = Array.isArray(listTrademarksAdvertisement) ? listTrademarksAdvertisement : []
  if (safeListTrademarksAdvertisement.length === 0)
    return null

  const onItemPress = (item) => {
    // Cho phép xem thương hiệu mà không cần đăng nhập
    navigation.navigate(NAVIGATION_PRODUCT_LIST, {
      type: 'trademark',
      distributorId: distributor?.id,
      trademarkId: item?.id,
      title: item?.name,
    })
  }

  const getBrandImage = item => {
    const uri = item?.logo || item?.images || item?.image
    return uri ? { uri } : logoNeoMed
  }

  const getBrandName = item => item?.nick_name || item?.name || 'Thương hiệu'

  const getVoucherLabel = item => {
    const voucher = item?.voucher || item?.campaign || item?.promotion || item?.best_voucher
    const discount = Number(item?.discount || item?.voucher_discount || voucher?.discount || 0)
    const discountPercent = Number(item?.discount_percent || item?.percent || voucher?.discount_percent || voucher?.percent || 0)

    if (discountPercent > 0) return `Voucher -${Math.round(discountPercent)}%`
    if (discount > 0) return `Voucher ${formatMoney(discount, { unit: 'đ', space: false })}`
    return null
  }

  const renderBrandItem = (item, index) => {
    const voucherLabel = getVoucherLabel(item) || 'Xem ưu đãi'

    return (
      <PressScale
        key={item?.id ?? index}
        style={styles.trademarkCard}
        onPress={() => onItemPress(item)}
      >
        <View style={styles.trademarkLogoWrap}>
          <Image source={getBrandImage(item)} style={styles.trademarkLogo} resizeMode="contain" />
          <Text style={styles.trademarkName} numberOfLines={2}>
            {getBrandName(item)}
          </Text>
        </View>
        <View style={styles.trademarkVoucher}>
          <Text style={styles.trademarkVoucherText} numberOfLines={2}>{voucherLabel}</Text>
        </View>
      </PressScale>
    )
  }

  return (
    <View style={styles.brandRailContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.brandHorizontalRail}
      >
        {safeListTrademarksAdvertisement.map((item, index) => renderBrandItem(item, index))}
      </ScrollView>

    </View>
  )
}

export default ListTrademarksAdvertisement
