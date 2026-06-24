import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, StatusBar, TouchableOpacity } from 'react-native'

import styles from './styles'
import strings from '~/i18n'
import EmptyItem from './EmptyItem/index'
import { getAddCartInfoStatus, getCartStatus, getListItem, getUpdateCartStatus } from '~/store/cart/cartSelectors'
import { addOptionInfo, getAddressBooksRequest, getInfo, resetStatusCartInfo, updateCart } from '~/store/actions'

import { getAddressBooks, getAddressRequestStatus } from '~/store/selector'
import { useState } from 'react'
import Status from '~/common/Status/Status'
import Amount from './Amount/index'
import CartItem from './CartItem'
import DialogInfo from '~/common/DialogInfo/index'
import { Button, Icon, Text } from '~/common/index'
import { brandColors } from '~/design-system/tokens'
import AppBackground from '~/design-system/AppBackground'

const mockCartData = {
  shipping_address: null,
  sub_total: { amount: 1720000 },
  grand_total: { amount: 1520000 },
  items: [
    {
      distributor: {
        id: 10001,
        name: '1000CARE Distribution',
        nick_name: '1000CARE',
        order_limit: 500000,
      },
      items: [
        {
          payment_type: 1,
          promo_infos: [],
          promo_products: [],
          items: [
            {
              id: 90001,
              product_id: 90001,
              distributor_id: 10001,
              product_name: 'Vitamin C 1000mg hộp 30 viên',
              qty: 2,
              price: 185000,
              origin_price: 220000,
              payment_type: 1,
              product_status: 1,
              is_promotion: false,
              images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'],
              images_resize: [],
              range_prices: [
                { min_quantity: 5, discount: 5, sale_price: 175000 },
                { min_quantity: 10, discount: 8, sale_price: 168000 },
              ],
            },
            {
              id: 90002,
              product_id: 90002,
              distributor_id: 10001,
              product_name: 'Nước súc miệng kháng khuẩn 500ml',
              qty: 3,
              price: 95000,
              origin_price: 95000,
              payment_type: 1,
              product_status: 1,
              is_promotion: false,
              images: ['https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400'],
              images_resize: [],
              range_prices: [],
            },
          ],
        },
      ],
    },
    {
      distributor: {
        id: 10002,
        name: 'Nhà cung cấp Hàng tiêu dùng An Tâm',
        nick_name: 'An Tâm Store',
        order_limit: 300000,
      },
      items: [
        {
          payment_type: 1,
          promo_infos: [],
          promo_products: [],
          items: [
            {
              id: 90003,
              product_id: 90003,
              distributor_id: 10002,
              product_name: 'Khẩu trang y tế 4 lớp hộp 50 cái',
              qty: 10,
              price: 32000,
              origin_price: 40000,
              payment_type: 1,
              product_status: 1,
              is_promotion: false,
              images: ['https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400'],
              images_resize: [],
              range_prices: [],
            },
          ],
        },
      ],
    },
  ],
}

const shouldUseMockCart = (cartData, statusGetCart) => {
  return statusGetCart === Status.ERROR || !cartData || !Array.isArray(cartData?.items)
}

const CartScreen = props => {
  const cartData = useSelector((state) => getListItem(state))
  const addressData = useSelector(state => getAddressBooks(state))
  const [isRequestChangeAddress, setIsRequestChangeAddress] = useState(false)
  const [isDialogError, setIsDialogError] = useState(false)
  const [message, setMessage] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteProduct, setDeleteProduct] = useState(null)
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false)
  const [orderLimit, setOrderLimit] = useState([])
  const [listSelectedIds, setListSelectedIds] = useState([])
  const [fullSelectedIds, setFullSelectedIds] = useState([])
  const [countFirst, setCountFirst] = useState(0)
  const statusGetAddress = useSelector(state => getAddressRequestStatus(state))
  const statusGetCart = useSelector(state => getCartStatus(state))
  const [chooseAll, setChooseAll] = useState(true)
  // console.log('alkfjlaksjks::::::::::::::::::', listSelectedIds, fullSelectedIds)
  const addCartInfoStatus = useSelector(state => getAddCartInfoStatus(state))
  const statusUpdateCart = useSelector(state => getUpdateCartStatus(state))

  const dispatch = useDispatch()
  const effectiveCartData = shouldUseMockCart(cartData, statusGetCart) ? mockCartData : cartData

  useEffect(() => {
    dispatch(getInfo())
  }, [])

  useEffect(() => {
    if (statusUpdateCart === Status.SUCCESS) {
      setOrderLimit([])
    }
  }, [statusUpdateCart])

  const getProducts = useCallback(() => {
    if (effectiveCartData && effectiveCartData?.items) {
      const data = effectiveCartData
      if (!effectiveCartData || !effectiveCartData.items)
        return []
      return data.items
    }
    return []
  }, [effectiveCartData])

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAddressBooksRequest())
    }, 100)
  }, [])

  useEffect(() => {
    if (statusGetCart === Status.ERROR && statusGetAddress === Status.SUCCESS) {
      setTimeout(() => {
        dispatch(getInfo())
      }, 100)
    }
  }, [statusGetCart])

  useEffect(() => {
    setOpenDialog(false)
    if (shouldUseMockCart(cartData, statusGetCart) || !cartData || !cartData.items || cartData?.shipping_address)
      return
    if (addressData && addressData.length > 0) {
      for (let i = 0; i < addressData.length; i++) {
        if (addressData[i].is_default) {
          setIsRequestChangeAddress(true)
          dispatch(addOptionInfo(addressData[i].id, 1))
          break
        }
      }
    }
  }, [cartData, addressData, statusGetCart])
  useEffect(() => {
    if (chooseAll) {
      const allIds = []
      if (productInCart && productInCart.length > 0) {
        productInCart.forEach(item => {
          item?.items.forEach(item1 => {
            item1?.items.forEach(item2 => {
              allIds.push(item2.id)
            })
          })
        })
        setListSelectedIds(allIds)
      }
    } else {
      setListSelectedIds([])
    }
  }, [chooseAll])

  const onDeleteProduct = () => {
    dispatch(updateCart(deleteProduct.product_id, deleteProduct.distributorId, 0))
  }

  useEffect(() => {
    if (!isRequestChangeAddress)
      return
    switch (addCartInfoStatus) {
      case Status.LOADING:
        break
      case Status.SUCCESS:
        setIsRequestChangeAddress(false)
        dispatch(resetStatusCartInfo())
        if (cartData?.shipping_address) {
          dispatch(getInfo())
        }
        break
      case Status.ERROR:
        setIsRequestChangeAddress(false)
        break
    }
  }, [isRequestChangeAddress, addCartInfoStatus])

  const productInCart = getProducts()

  useEffect(() => {
    if (listSelectedIds && listSelectedIds.length > 0 && countFirst === 0) {
      setFullSelectedIds(listSelectedIds.length)
      setCountFirst(1)
    }
    // if(countFirst === 1 && listSelectedIds && listSelectedIds.length === fullSelectedIds) {
    //   setChooseAll(true)
    // }
  }, [listSelectedIds])

  return (
    <AppBackground>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.checkoutHero}>
        <TouchableOpacity
          activeOpacity={0.82}
          style={styles.backButton}
          onPress={() => {
            dispatch(resetStatusCartInfo())
            props.navigation.pop()
          }}
        >
          <Icon type="feather" name="arrow-left" size={20} color={brandColors.tealPrimary} />
        </TouchableOpacity>
        <View style={styles.checkoutCopy}>
          <Text style={styles.checkoutEyebrow}>CHECKOUT</Text>
          <Text style={styles.checkoutTitle}>{strings.cartDetail.title}</Text>
          <Text style={styles.checkoutSubtitle}>Rà soát sản phẩm, địa chỉ và giới hạn đặt hàng trước khi thanh toán.</Text>
        </View>
      </View>
      <View style={styles.listProductContainer}>
        <FlatList
        data={productInCart}
          scrollEnabled={true}
          renderItem={({ item, index }) => {
            return (
              <FlatList
                data={item.items}
                scrollEnabled={true}
                renderItem={({ item: item2 }) => {
                  return (
                    <CartItem
                      setOpenDialogWaiting={(value) => {
                        if (isDialogError) {
                          setIsDialogError(false)
                        }
                        if (isOpenDeleteDialog) {
                          setIsOpenDeleteDialog(false)
                        }
                        setOpenDialog(value)
                      }}
                      navigation={props.navigation}
                      distributor={item.distributor}
                      item={item2}
                      index={index}
                      cartData={effectiveCartData}
                      listSelectedIds={listSelectedIds}
                      setSelection={(product, action, force, products) => {
                        console.log('productItem', product)
                        if (force) {
                          if (action === 'add') {
                            setListSelectedIds([...listSelectedIds, ...products.map(p => p.id).filter(id => !listSelectedIds.includes(id))])
                          } else {
                            setListSelectedIds([...listSelectedIds.filter(id => !products.map(p => p.id).includes(id))])
                          }
                        } else {
                          if (listSelectedIds.includes(product.id)) {
                            setListSelectedIds([...listSelectedIds.filter(id => id !== product.id)])
                          } else {
                            setListSelectedIds([...listSelectedIds, product.id])
                          }
                        }
                      }}
                      onDeleteProduct={(product) => {
                        setDeleteProduct(product)
                        setIsOpenDeleteDialog(true)
                        if (isDialogError) {
                          setIsDialogError(false)
                        }
                        setOpenDialog(true)
                      }}
                      pushArrayLimit={(distributors) => {
                        const newOrderLimit = orderLimit
                        newOrderLimit.push(distributors)
                        setOrderLimit(newOrderLimit)
                      }}
                      deleteArrayLimit={(distributors) => {
                        const newOrderLimit = orderLimit
                        if (newOrderLimit && newOrderLimit.length > 0 && newOrderLimit.findIndex(d => d.id === distributors.id) >= 0) {
                          newOrderLimit.splice(newOrderLimit.findIndex(d => d.id === distributors.id), 1)
                          setOrderLimit(newOrderLimit)
                        }
                      }}
                    />
                  )
                }}
                keyExtractor={(_, index) => {
                  return index.toString()
                }}
              />
            )
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.itemSeparator} />
            )
          }}
          ListEmptyComponent={EmptyItem}
          keyExtractor={(item, index) => {
            return index.toString()
          }}
        />
      </View>

      <View
        style={styles.bottomContainer}
      >
        <Amount
          openMessage={(msg) => {
            setMessage(msg)
            if (isOpenDeleteDialog) {
              setIsOpenDeleteDialog(false)
            }
            setIsDialogError(true)
            setOpenDialog(true)
          }}
          navigation={props.navigation}
          arrayOrderLimit={orderLimit}
          listSelectedIds={listSelectedIds}
          chooseAll={chooseAll}
          setChooseAll={(isCheckBox) => setChooseAll(isCheckBox)}
          fullSelectedIds={fullSelectedIds}
          cartDataOverride={effectiveCartData}
        />
      </View>
      <DialogInfo
        isOpen={openDialog}
        isError={isDialogError}
        isOrder={false}
        isLoading={true}
        message={message}
        custom={isOpenDeleteDialog}
        closeModal={() => {
          setOpenDialog(false)
        }}
      >
        <View style={styles.dialogDeleteContainer}>
          <Text
            style={styles.messageDeleteProduct}
          >
            Quyết định xoá sản phẩm sẽ ảnh hưởng tới điều kiện nhận khuyến mại. Quý khách có chắc chắn muốn xoá sản phẩm này không
          </Text>
          <View
            style={styles.dialogButtonContainer}
          >
            <Button
              onPressEvent={() => {
                setOpenDialog(false)
              }}
              text={'Hủy'}
            />
            <Button
              styleButton={{
                backgroundColor: 'red',
              }}
              onPressEvent={() => {
                setIsOpenDeleteDialog(false)
                if (deleteProduct) {
                  onDeleteProduct()
                }
              }}
              text={'Xóa'}
            />
          </View>
        </View>
      </DialogInfo>
    </AppBackground>
  )
}
export default CartScreen
