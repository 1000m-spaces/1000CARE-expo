import React from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import DetailDeliveryItem from '~/common/DetailDeliveryItem/DetailDeliverItem'
import { brandColors } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

const OrderDetailDelivery = ({ navigation, route }) => {
  const { state_histories = [] } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Theo dõi đơn hàng'}
        iconLeft={back}
        leftAction={() => navigation.pop()}
      />
      <FlatList
        data={state_histories}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => {
          return (
            <DetailDeliveryItem
              data={item}
              isLast={index === state_histories.length - 1}
              isCurrent={index === state_histories.length - 1}
            />)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  content: {
    padding: s(16),
    paddingTop: s(20),
    backgroundColor: brandColors.surface,
    margin: s(16),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
  },
})

export default OrderDetailDelivery
