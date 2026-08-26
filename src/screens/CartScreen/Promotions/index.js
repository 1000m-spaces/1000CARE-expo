import React from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import { Text } from '~/common/index'
import PromotionItem from '~/common/PromotionItem/index'
import { NAVIGATION_LIST_PROMOTIONS } from '~/navigation/routes'
import PressScale from '~/design-system/PressScale'

const Promotions = ( { navigation, promotionData, distributorId, paymentType, promotionProductIds, mode }) => {
  console.log('BIENBUONBUCCCCCCCCCC:', mode, promotionData)
  return (
    <FlatList 
      data={(promotionData || []).filter(pm => pm?.is_order_valid)}
      style={styles.mainContainer}
      scrollEnabled={true}
      ListHeaderComponent={() => {
        return (
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}
            >
                Khuyến mãi
            </Text>
            {
              promotionData && promotionData.length > 0 && (
                <PressScale
                  onPress={() => {
                    navigation.navigate(NAVIGATION_LIST_PROMOTIONS, {
                      listPromotions: promotionData,
                    })
                  }}
                >
                  <Text
                    style={styles.seeAll}
                  >
                  Xem tất cả
                  </Text>
                </PressScale>
              )}
          </View>
        )
      }}
      renderItem={({ item }) => {
        return (
          <PromotionItem
            mode={mode}
            promotion={item}
            distributorId={distributorId}
            paymentType={paymentType}
            navigation={navigation}
            promotionProductIds={promotionProductIds}
          />
        )
      }}
      ListEmptyComponent={() => {
        return (
          <Text
            style={styles.emptyText}
          >
            {promotionData && promotionData.length > 0 ? 'Đơn hàng chưa đủ điều kiện nhận khuyến mại' : 'Hiện tại nhà cung cấp không có chương trình khuyến mãi nào'}
          </Text>
        )
      }}
      keyExtractor={(item) => {
        return item.id.toString()
      }}
    />
  )
}

export default Promotions