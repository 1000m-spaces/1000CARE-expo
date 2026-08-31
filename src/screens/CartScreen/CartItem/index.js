import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { CheckBox, Text } from '~/common/index'
import strings from '~/i18n'
import { formatMoney } from '~/utils/format'
import EmptyItem from '../EmptyItem'
import ProductItem from './ProductItem/index'
import TopProduct from './TopProduct'
import styles from './styles'
import Promotions from '../Promotions/index'

const CartItem = ({ navigation, distributor, item, index, setOpenDialogWaiting, onDeleteProduct, pushArrayLimit, deleteArrayLimit, cartData, listSelectedIds, setSelection }) => {
  const [chooseAll, setChooseAll] = useState(false)

  const getProduct = () => {
    if (!item.promo_infos)
      return [...item.items]

    const products = item.items ? [...item.items] : []
    return products
  }

  const totalPrices = useMemo(() => {
    let total = 0
    let isChooseAll = true
    item.items.forEach(p => {
      if (listSelectedIds.includes(p.id)) {
        total += p.price * p.qty
      } else {
        isChooseAll = false
      }
    })
    setChooseAll(isChooseAll)
    return total
  }, [item, listSelectedIds])

  const onChooseAll = () => {
    setSelection(null, chooseAll ? 'delete' : 'add', true, item.items)
    setChooseAll(!chooseAll)
  }

  useEffect(() => {
    console.log('distributor', distributor, item)
    if (totalPrices > 0 && distributor?.order_limit > totalPrices && item?.payment_type == 1) {
      pushArrayLimit(distributor)
    } else {
      deleteArrayLimit(distributor)
    }
  }, [cartData, item, totalPrices])

  return (
    <FlatList
      data={getProduct()}
      scrollEnabled={true}
      style={styles.mainContainer}
      initialNumToRender={100}
      ListHeaderComponent={() => {
        return (
          <>
            <View style={styles.listHeader}>
              <View style={styles.listHeaderRow}>
                <CheckBox
                  checked={chooseAll}
                  onPress={onChooseAll}
                  containerStyle={styles.listHeaderCheckbox}
                />
                <View style={styles.distributorIconWrap}>
                  <Text style={styles.distributorIconText}>🏬</Text>
                </View>
                <View style={styles.distributorNameWrap}>
                  <Text style={styles.textInfoListHeader}>{strings.cartDetail.distributorInfo}</Text>
                  <Text style={styles.textListHeader} numberOfLines={1}>{distributor.name || distributor.nick_name}</Text>
                </View>
              </View>
              {
                totalPrices > 0 && distributor?.order_limit > totalPrices && item?.payment_type === 1
                  ? (
                    <View style={styles.orderLimitBanner}>
                      <Text style={styles.orderLimitIcon}>⚠️</Text>
                      <Text style={styles.textOrderLimit}>
                        Đơn hàng chưa đạt giá trị tối thiểu {formatMoney(distributor?.order_limit, { unit: item?.payment_type === 1 ? 'đ' : 'điểm' })}
                      </Text>
                    </View>
                  )
                  : null
              }
            </View>
            <TopProduct
              navigation={navigation}
              distributorId={distributor?.id}
              product={{}}
            />
          </>
        )
      }}
      ListFooterComponent={() => {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {
              item?.payment_type !== 2 && (
                <>
                  <Promotions
                    mode={'order'}
                    navigation={navigation}
                    distributorId={distributor?.id}
                    paymentType={item?.payment_type}
                    promotionData={item.promo_infos ? item.promo_infos : []}
                    promotionProductIds={item.promo_products ? item.promo_products : []}
                  />
                </>
              )
            }
          </View>
        )
      }}
      renderItem={({ item: productItem, index }) => {
        return (
          <ProductItem
            product={productItem}
            distributorId={productItem.distributor_id}
            productInCart={item.items}
            setOpenDialogWaiting={setOpenDialogWaiting}
            onDeleteProduct={onDeleteProduct}
            isSelected={listSelectedIds?.includes(productItem.id)}
            setSelection={() => {
              setSelection(productItem)
            }}
          />
        )
      }}
      ListEmptyComponent={EmptyItem}
      keyExtractor={(_, idx) => {
        return idx.toString()
      }}
    />
  )
}

export default CartItem