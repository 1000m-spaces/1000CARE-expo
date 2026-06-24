import React, { useEffect, useRef, useState } from 'react'
import { View, FlatList } from 'react-native'
import { Image, Text } from '~/common/index'
import { formatMoney } from '~/utils/index'
import { icon_info } from '~/assets/constants'

import styles from './styles'
import strings from '~/i18n'
import { NAVIGATION_VOUCHER } from '~/navigation/routes'
import SectionVoucher from '~/common/SectionVoucher/index'
import { useDispatch, useSelector } from 'react-redux'
import { addOptionInfo, requestGetPaymentMethob } from '~/store/actions'
import { getPaymentMethob, getDataSelectVoucher } from '~/store/selector'
import RadioButtonGroup from '~/common/RadioButtonGroup/RadioButtonGroup'
import Colors from '~/common/Colors/Colors'
import Promotions from '../../Promotions/index'
import { TextInput } from 'react-native'
import _ from 'lodash'

const PromotionTypes = {
  3: 'range_prices',
  4: 'discount_order_meta', // Chiết khấu x% khi đơn hàng trên y đồng
  5: 'gift_order_meta', // Tặng quà A khi đơn hàng trên y đồng
  6: 'accumulation_order_meta', // Tích lũy % khi đơn hàng trên y đồng
  7: 'discount_buying_products_meta', // Mua m/n sản phẩm, chiết khấu x% (đơn hàng trên y đồng)
  8: 'gift_buying_products_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  9: 'combo_advance_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
}

const VoucherSection = ({ voucher, setVoucher, voucherNeoMed, setVoucherNeoMed, checkout, payment_method, navigation, index }) => {
  return (
    <>
      {
        checkout?.payment_type === 1 && (
          <View>
            <Text
              style={styles.promotionTitle}
            >
              Voucher khuyến mãi
            </Text>
            <SectionVoucher
              title='1000M Voucher'
              voucher={voucherNeoMed}
              onPress={() => navigation.navigate(NAVIGATION_VOUCHER, {
                index: index,
                payment_method: payment_method,
                currentVoucher: voucherNeoMed,
                paymentType: checkout?.payment_type,
                distributorId: 1, // Neomed
                orgDistributorId: checkout?.distributor?.id,
                orderAmount: checkout?.total,
                isSelect: true,
                onVoucherSelected: (item) => {
                  setVoucherNeoMed(item)
                },
              })}
            />
            <SectionVoucher
              title={`${checkout?.distributor?.nick_name ? checkout?.distributor?.nick_name : checkout?.distributor?.name} Voucher`}
              voucher={voucher}
              onPress={() => navigation.navigate(NAVIGATION_VOUCHER, {
                index: index,
                payment_method: payment_method,
                currentVoucher: voucher,
                paymentType: checkout?.payment_type,
                distributorId: checkout?.distributor?.id,
                orgDistributorId: checkout?.distributor?.id,
                orderAmount: checkout?.total,
                isSelect: true,
                onVoucherSelected: (item) => {
                  setVoucher(item)
                },
              })}
            />
          </View>
        )
      }
    </>
  )
}

const AmountItem = ({ title, value }) => {
  return (
    <View
      style={styles.bottomInfoContainer}
    >
      <Text
        style={styles.label}
      >
        {title}
      </Text>
      <View>
        <Text
          style={styles.priceItem}
        >
          {formatMoney(value, { unit: 'đ' })}
        </Text>
      </View>
    </View>
  )
}

const AmountSection = ({ checkout, voucher, voucherNeoMed }) => {
  // console.log('AmountSection - checkout:::::::::::', checkout)
  return (
    <>
      {
        checkout?.payment_type === 1 && (
          <View
            style={styles.bottomContainer}
          >
            <Text
              style={styles.paymentTitle}
            >
              {'Thanh toán'}
            </Text>
            <View
              style={styles.bottomInfoContainer}
            >
              <Text
                style={styles.label}
              >
                Tổng tiền {checkout?.items?.length} sp:
              </Text>
              <View>
                {
                  checkout?.saving > 0 ? (
                    <>
                      <Text
                        style={styles.price}
                      >
                        {formatMoney(checkout.total + (checkout?.discount || 0), { unit: 'đ' })}
                      </Text>
                      <Text
                        style={styles.discount}
                      >
                        {formatMoney(checkout.total + (checkout?.discount || 0) + checkout?.saving, { unit: 'đ' })}
                      </Text>
                    </>
                  ) : (
                    <Text
                      style={styles.price}
                    >
                      {formatMoney(checkout.total + (checkout?.discount || 0), { unit: 'đ' })}
                    </Text>
                  )
                }

              </View>
            </View>
            {
              checkout?.saving > 0 && (
                <AmountItem
                  title={'Tổng tiền tiết kiệm:'}
                  value={checkout?.saving}
                />
              )
            }
            {
              checkout?.discount !== 0 && (
                <AmountItem
                  title={'Ưu đãi voucher:'}
                  value={checkout?.discount}
                />
              )
            }
            {
              <AmountItem
                title={'Tổng thanh toán:'}
                value={checkout?.total}
              />
            }
          </View>)
      }
    </>
  )
}

const ProductItem = ({ product }) => {
  return (
    <View>
      <View
        style={[
          styles.productItemContainer,
          product?.is_promotion ? {
            marginLeft: 18,
            marginRight: 24,
          } : {},
        ]}
      >
        <Text
          style={styles.productName}
        >
          {product?.qty} x {product?.product_name}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}
        >
          {
            product?.payment_type !== 2 && (
              <View>
                <Text
                  style={[styles.price, product?.is_promotion ? {
                    color: Colors.systemColor2,
                    flex: 1,
                    textAlign: 'right',
                  } : {}]}
                >
                  {formatMoney(product?.price, { unit: 'đ' })}
                </Text>
                {
                  product?.origin_price !== product?.price && (
                    <Text
                      style={styles.discount}
                    >
                      {formatMoney(product?.origin_price, { unit: 'đ' })}
                    </Text>
                  )
                }
              </View>
            )
          }
          {
            product?.payment_type === 2 && (
              <Text
                style={[styles.salePrice,
                product?.is_promotion ?
                  {
                    color: Colors.systemColor2,
                    flex: 1,
                    textAlign: 'right',
                  } : {},
                ]}
              >
                {formatMoney(product?.price, { unit: 'điểm' })}
              </Text>
            )
          }
        </View>
      </View>
      {
        (Array.isArray(product?.combo) ? product.combo : []).map((item, idx) => {
          return (
            <View
              key={idx}
              style={[styles.productItemContainer, {
                marginLeft: 18,
                marginRight: 24,
              }]}
            >
              <Text
                style={[styles.productName, {
                  fontWeight: 'normal',
                  fontStyle: 'italic',
                  flex: 2,
                }]}
              >
                {item?.quantity} x {item?.ref_product?.name}
              </Text>
              {
                product?.payment_type !== 2 && (
                  <Text
                    style={[styles.price, {
                      color: Colors.systemColor2,
                      flex: 1,
                      textAlign: 'right',
                    }]}
                  >
                    {formatMoney(item?.sale_price, { unit: 'đ' })}
                  </Text>
                )
              }
              {
                item?.ref_product?.payment_type === 2 && (
                  <Text
                    style={[styles.salePrice,
                    {
                      color: Colors.systemColor2,
                      flex: 1,
                      textAlign: 'right',
                    },
                    ]}
                  >
                    {formatMoney(item?.ref_product?.price, { unit: 'điểm' })}
                  </Text>
                )
              }
            </View>
          )
        })
      }
    </View>
  )
}

const PaymentMethob = ({ checkout, setChangeMethod, changeMethod, index, setCounts, changeNote }) => {
  const dispatch = useDispatch()
  const paymentMethods = useSelector(state => getPaymentMethob(state))

  useEffect(() => {
    if (paymentMethods[checkout?.distributor?.id]
      && paymentMethods[checkout?.distributor?.id][checkout?.payment_type]
      && paymentMethods[checkout?.distributor?.id][checkout?.payment_type].length === 1
      && !checkout?.payment_method?.code) {
      dispatch(addOptionInfo(paymentMethods[checkout?.distributor?.id][checkout?.payment_type][0].code, 2, checkout?.distributor?.id, checkout?.payment_type))
    }
  }, [paymentMethods])

  const getPaymentMethobName = (code) => {
    if (code === 'NEOW') {
      return 'Thanh toán bằng điểm mua hàng'
    } else if (code === 'NEOWP') {
      return 'Thanh toán bằng điểm tích luỹ'
    } else if (code === 'COD') {
      return 'Thanh toán khi nhận hàng (COD)'
    } else if (code === 'VQR') {
      return 'Thanh toán qua VietQR'
    }
  }

  return (
    <View
      style={styles.bottomContainer}
    >
      <Text
        style={styles.paymentMethobTitle}
      >
        {strings.cartDetail.paymentCheckoutScreen.paymentMethob}
      </Text>
      <RadioButtonGroup
        value={changeMethod}
        itemContainerStyles={{
          width: '100%',
          marginVertical: 8,
        }}
        containerStyles={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        data={((paymentMethods[checkout?.distributor?.id] || {})[checkout?.payment_type] || []).map(it => {
          return {
            title: getPaymentMethobName(it.code),
            value: it.code,
            data: it,
          }
        })}
        onDataChange={(item) => {
          setCounts(index)
          dispatch(addOptionInfo(item.data.code, 2, checkout?.distributor?.id, 3))
          setChangeMethod(item.data.code)
        }}
      />
      <TextInput
        placeholder={'Ghi chú...'}
        placeholderTextColor={Colors.border_input_update}
        underlineColorAndroid="transparent"
        keyboardType="default"
        returnKeyLabel={'Hoàn Thành'}
        returnKeyType={'done'}
        multiline={true}
        style={styles.styleTextInputNote}
        onChangeText={(val) => changeNote(val)}

      />
    </View>
  )
}

const CheckoutItem = ({ checkout, navigation, idx, next, noteChanged }) => {
  const [voucher, setVoucher] = useState(null)
  const [voucherNeoMed, setVoucherNeoMed] = useState(null)
  const [changeMethod, setChangeMethod] = useState('COD')
  const [count, setCount] = useState('')
  const refCartData = useRef({})
  const dispatch = useDispatch()

  const dataSelectVoucher = useSelector(state => getDataSelectVoucher(state))
  useEffect(() => {
    if (dataSelectVoucher && checkout?.discount != 0 && checkout?.discount != null && checkout?.discount != undefined) {
      for (const property in dataSelectVoucher) {
        if (count == property) {
          var countss = 0
          for (const value of dataSelectVoucher[property]) {
            console.log('VALUEEEEEEEEEEEEEEEE:', countss * 800)
            setTimeout(() => { dispatch(addOptionInfo('', value.selectDistributorId === 1 ? 6 : 5, value.selectDistributorId === 1 ? value.selectOrgDistributorId : value.selectDistributorId, value.selectPaymentType)) }, countss * 800)
            countss++
          }
        }
      }
      // dispatch(resetDataSelectVoucher())
      setVoucher(null)
      setVoucherNeoMed(null)
    }
  }, [changeMethod])
  const getNoteOrder = (note) => {
    const tempCheckoutItem = JSON.parse(JSON.stringify(checkout))
    if (tempCheckoutItem?.distributor) {
      tempCheckoutItem.distributor.note = note
    }
    refCartData.current = tempCheckoutItem
    setTimeout(() => {
      handleUpdateNote()
    }, 100)
  }
  const handleUpdateNote = _.debounce(() => {
    dispatch(addOptionInfo(refCartData.current.distributor.note, 4, checkout?.distributor?.id, checkout?.payment_type))
  }, 500)

  useEffect(() => {
    dispatch(requestGetPaymentMethob(checkout?.distributor?.id, checkout?.payment_type))
  }, [])

  useEffect(() => {
    if (next)
      setChangeMethod('COD')
  }, [])

  const getProductGifts = () => {
    if (!checkout.promo_infos)
      return [...checkout.items]

    const products = checkout.items ? [...checkout.items] : []
    checkout.promo_infos?.forEach(promotion => {
      const data = promotion[PromotionTypes[promotion?.campaign_type]] || []
      data.items?.forEach(d => {
        if (promotion.is_order_valid && d.is_order_valid && d.gifts) {
          if (data?.is_gift_selection) {
            products.push(...(d.gifts || []).filter(p => {
              return checkout.promo_products && checkout.promo_products.find(pp => pp.campaign_id === promotion.id)?.product_ids?.includes(p.product.product_id)
            }).map(p => {
              return {
                ...p.product,
                qty: p.quantity,
                is_promotion: true,
                product_name: p.product?.name,
                origin_price: p.product?.price,
                price: 0,
                distributor_id: checkout.items?.[0]?.distributor_id,
              }
            }))
          } else {
            products.push(...(d.gifts || []).map(p => {
              return {
                ...p.product,
                qty: p.quantity,
                is_promotion: true,
                product_name: p.product?.name,
                origin_price: p.product?.price,
                price: 0,
                distributor_id: checkout.items?.[0]?.distributor_id,
              }
            }))
          }
        }
      })
    })
    return products
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View
          style={styles.headerIconContainer}
        >
          <Image
            source={icon_info}
            style={styles.itemIcon}
            resizeMode={'contain'}
          />
        </View>
        <View>
          <Text style={styles.headerText}>Thông tin đơn hàng {idx}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text
              style={styles.label}
            >
              {strings.cartDetail.paymentCheckoutScreen.distributor}
            </Text>
            <Text
              style={styles.distributorName}
            >
              {checkout?.distributor?.name}
            </Text>
          </View>
        </View>

      </View>

      <FlatList
        data={getProductGifts()}
        scrollEnabled={true}
        style={styles.listProduct}
        renderItem={({ item }) => {
          return (<ProductItem product={item} />)
        }}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.itemSeparator} />
          )
        }}
        keyExtractor={(_, idx) => {
          return idx.toString()
        }}
      />

      {
        checkout?.payment_type !== 2 && (
          <>
            <Promotions
              mode={'checkout'}
              navigation={navigation}
              distributorId={checkout?.distributor?.id}
              paymentType={checkout?.payment_type}
              promotionData={checkout.promo_infos ? checkout.promo_infos : []}
              promotionProductIds={checkout.promo_products ? checkout.promo_products : []}
            />
          </>
        )
      }
      <VoucherSection
        voucher={voucher}
        setVoucher={setVoucher}
        voucherNeoMed={voucherNeoMed}
        setVoucherNeoMed={setVoucherNeoMed}
        navigation={navigation}
        checkout={checkout}
        payment_method={changeMethod}
        index={idx}
      />
      <AmountSection
        voucher={voucher}
        voucherNeoMed={voucherNeoMed}
        checkout={checkout}
      />

      <PaymentMethob
        checkout={checkout}
        setChangeMethod={setChangeMethod}
        changeMethod={changeMethod}
        changeNote={getNoteOrder}
        index={idx}
        setCounts={(index) => setCount(index)}
      />

    </View>
  )
}

export default CheckoutItem