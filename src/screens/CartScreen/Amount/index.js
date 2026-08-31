import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { Button, CheckBox, Text } from '~/common/index'
import PressScale from '~/design-system/PressScale'
import { brandGradients } from '~/design-system/tokens'
import { getListItem } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import strings from '~/i18n'
import { formatMoney } from '~/utils/format'
import { NAVIGATION_PAYMENT_CHECKOUT_SCREEN } from '~/navigation/routes'
import styles from './styles'
import { getCheckoutInfo } from '~/store/actions'

const Amount = ({ navigation, openMessage, arrayOrderLimit, listSelectedIds, chooseAll, setChooseAll, fullSelectedIds, cartDataOverride }) => {
  console.log('AAAAAAABBBBCCCCCCCCCC:', listSelectedIds, arrayOrderLimit)
  const dispatch = useDispatch()
  const cartDataStore = useSelector((state) => getListItem(state))
  const cartData = cartDataOverride || cartDataStore
  const [isEnableBuy, setIsEnableBuy] = useState(false)
  const [isCheckDistriLimited, setIsCheckDistriLimited] = useState(false)
  const [isCheckBox, setIsCheckBox] = useState(true)

  useEffect(() => {
    setIsEnableBuy(true)
    productInCart.forEach(p => {
      p.items?.forEach(item => {
        item.items?.forEach(item2 => {
          if (item2.product_status === 0) {
            setIsEnableBuy(false)
            return
          }
        })
      })
    })
  }, [cartData])

  const productInCart = useMemo(() => {
    const data = cartData
    if (!cartData || !cartData.items)
      return []
    return data.items
  }, [cartData])

  const totalItem = () => {
    if (productInCart === null)
      return 0
    return productInCart.length
  }

  const totalPrices = useMemo(() => {
    let total = 0
    productInCart.forEach(p => {
      p.items?.forEach(item => {
        item.items?.forEach(item2 => {
          if (listSelectedIds.includes(item2.id)) {
            total += item2.price * item2.qty
          }
        })
      })
    })
    return total
  }, [productInCart, listSelectedIds])

  useEffect(() => {
    if (arrayOrderLimit && arrayOrderLimit.length > 0) {
      var listProductLimited = []
      arrayOrderLimit.map(itemOrderLimit =>
        listProductLimited = productInCart.map(item => {
          if (item?.distributor?.id === itemOrderLimit?.id) {
            return item
          }
        }) || [],
      )
      if (listProductLimited && listProductLimited.length > 0) {
        listProductLimited.some(itemProLimi => {
          if (itemProLimi && itemProLimi?.items) {
            let proLimited = []
            proLimited = itemProLimi?.items[0]?.items || []
            console.log('111111111111:::::::::::', proLimited, listSelectedIds)
            setIsCheckDistriLimited(proLimited.some(pro => listSelectedIds.some(itemIds => itemIds === pro.id)))
            return proLimited.some(pro => listSelectedIds.some(itemIds => itemIds === pro.id))
          } else {
            return false
          }
        })
      } else {
        setIsCheckDistriLimited(false)
      }
    }
  }, [listSelectedIds])

  useEffect(() => {
    if (listSelectedIds && listSelectedIds.length === fullSelectedIds) {
      setIsCheckBox(true)
    } else {
      setIsCheckBox(false)
    }
  }, [listSelectedIds, fullSelectedIds])

  return (
    <>
      <View style={styles.priceContainer}>
        <Text style={styles.totalText}>{strings.cartDetail.total}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={styles.originPrice}
          >
            {cartData?.sub_total?.amount !== cartData?.grand_total?.amount ? formatMoney(cartData?.grand_total?.amount, { unit: 'đ' }) : ''}
          </Text>
          <Text style={styles.priceText}>{formatMoney(totalPrices || 0, { unit: 'đ' })}</Text>
        </View>
      </View>
      {
        totalItem() !== 0 && (
          <View style={styles.actionRow}>
            <CheckBox
              checked={isCheckBox}
              onPress={() => setChooseAll(!isCheckBox)}
              title={'Tất cả'}
              containerStyle={styles.checkAllContainer}
            />
            {(() => {
              const canBuy = isEnableBuy && listSelectedIds.length > 0
              const onPress = () => {
                if (!canBuy) {
                  return
                }
                if (arrayOrderLimit && arrayOrderLimit.length === 0 || !isCheckDistriLimited) {
                  navigation.navigate(NAVIGATION_PAYMENT_CHECKOUT_SCREEN, {
                    next: true,
                    listSelectedIds,
                  })
                  dispatch(getCheckoutInfo({
                    ids: listSelectedIds,
                  }))
                } else {
                  openMessage(`Đơn hàng của ${arrayOrderLimit[0].name} chưa đạt giá trị tối thiểu ${formatMoney(arrayOrderLimit[0].order_limit, { unit: 'đ' })}`)
                }
              }
              return (
                <PressScale style={styles.nextStepBtn} onPress={onPress} disabled={!canBuy}>
                  <LinearGradient
                    colors={canBuy ? brandGradients.primary : ['#C7D0D2', '#C7D0D2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.nextStepBtnGradient}
                  >
                    <Text style={styles.nextStepBtnText}>{strings.cartDetail.nextStep}</Text>
                  </LinearGradient>
                </PressScale>
              )
            })()}
          </View>
        )
      }
      {
        totalItem() === 0 && (
          <Button
            styleView={styles.buyBtnContainer}
            styleButton={styles.buyBtn}
            styleText={styles.buyBtnText}
            onPressEvent={() => navigation.pop()}
            text={strings.cartDetail.buy}
          />
        )
      }
    </>
  )
}

export default Amount
