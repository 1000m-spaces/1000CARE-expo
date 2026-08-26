import React from 'react'
import { View, FlatList } from 'react-native'
import { checked, discount_icon } from '~/assets/constants'
import styles from './styles'
import { Button, Image, Text } from '~/common/index'
import HTML from 'react-native-render-html'
import Colors from '../Colors/Colors'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

const PromotionTypes = {
  3: 'range_prices',
  4: 'discount_order_meta', // Chiết khấu x% khi đơn hàng trên y đồng
  5: 'gift_order_meta', // Tặng quà A khi đơn hàng trên y đồng
  6: 'accumulation_order_meta', // Tích lũy % khi đơn hàng trên y đồng
  7: 'discount_buying_products_meta', // Mua m/n sản phẩm, chiết khấu x% (đơn hàng trên y đồng)
  8: 'gift_buying_products_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  9: 'combo_advance_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  10: 'gift_buying_products_meta',
}

const PromotionInfo = ({ type, promotion, onPress, showLevelInfo = false }) => {
  const is_checked = !!promotion?.is_order_valid
  const data = promotion[PromotionTypes[promotion?.campaign_type]]

  return (
    <PressScale
      onPress={onPress}
      style={[
        styles.itemContainer,
        is_checked ? styles.itemContainerChecked : {}, 
        type === 'product' ? { 
          backgroundColor: 'rgba(66, 118, 254, 0.1)',
          borderWidth: 0,
        } : {},
      ]}
    >
      {
        is_checked && (
          <Image 
            style={styles.iconCheck}
            source={checked}
          />
        )
      }
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingRight: 24,
      }}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={discount_icon}
          />
        </View>
        <Text style={styles.promotionName}>{promotion?.name}</Text>
      </View>
      <View style={styles.promotionInfoContainer}>
        <HTML
            tagsStyles={ { p: { color:'black',lineHeight: 18 } }}
            source={{ html: promotion?.description }}
          />
        {
         showLevelInfo && data?.items && data?.items.map((item, idx) => {
          return (
            <View
            key={idx} 
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 2,
              alignItems: 'center',
            }}>
              <Text 
                style={styles.level}
              >
                {`Mức ${idx + 1}`}
              </Text>
              <Text 
                key={idx} 
                style={{
                  backgroundColor: item?.is_order_valid ? Colors.systemColor2 : '#C8C8C8',
                  padding: 5,
                  paddingHorizontal: 20,
                  width: 150,
                  borderRadius: 24,
                  color: Colors.white,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: Fonts.medium,
                }}
                >
                  {item?.is_order_valid ? 'Đủ điều kiện' : 'Chưa đủ điều kiện'}
              </Text>
            </View>
          )
        })
      }
      </View>
    </PressScale>
  )
}

export default PromotionInfo