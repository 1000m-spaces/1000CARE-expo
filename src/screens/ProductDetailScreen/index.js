import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { getErrorProductDetails, getProductDetails, getStatusProductDetail } from '~/store/products/productsSelector'
import { requestGetProductDetails } from '~/store/products/productsActions'

import Text from '~/common/Text/index'
import styles from './styles'
import Header from './Header'
import { Button, Icon, Image } from '~/common/index'
import strings from '~/i18n'
import { formatMoney } from '~/utils/index'
import { getListItem as getProductInCart } from '~/store/cart/cartSelectors'
import { addToCart, requestAddProductWishList, requestRemoveProductWishList, updateCart, resetStatusAddCart } from '~/store/actions'
import Colors from '~/common/Colors/Colors'
import { getAuthStore, getWishListStatus, getAddItemStatus } from '~/store/selector'
import { showToast } from '~/utils/toast'
import Status from '~/common/Status/Status'
import AmountInput from './AmountInput/index'
import { requestGetCampaignByDistributorIdByProduct, requestGetCampaignOfDistributorIdByProduct } from '~/store/campaigns/campaignActions'
import ErrorView from '~/common/ErrorView/index'
import { box_empty, check_info } from '~/assets/constants'
import ProductDescription from './ProductDescription/index'
import ProductPromotion from './ProductPromotion/index'
import ProductInfo from './ProductInfo/index'
import ImageViewer from 'react-native-image-zoom-viewer'
import SimilarProduct from './SimilarProduct/index'
import TopProduct from './TopProduct/index'
import RecommendProduct from './RecommendProduct/index'
import Voucher from './Voucher/index'
import AppScreen from '~/design-system/AppScreen'
import AppSection from '~/design-system/AppSection'
import { brandColors } from '~/design-system/tokens'

const ProductDetailScreen = (props) => {
  const { product: orgProduct, distributorId: orgDistributorId, combo: isProductCombo, goBack } = props.route?.params || {}
  const product = useSelector((state) => getProductDetails(state))
  const safeProduct = product || orgProduct || {}
  const productId = safeProduct?.product_id || orgProduct?.product_id || orgProduct?.id
  const [distributorId, setDistributorId] = useState(orgDistributorId)
  const cartData = useSelector((state) => getProductInCart(state))
  const requestStatus = useSelector(state => getWishListStatus(state))
  const statusAddCart = useSelector(state => getAddItemStatus(state))
  const { isLoggedIn } = useSelector(state => getAuthStore(state))
  const errorProductDetails = useSelector(state => getErrorProductDetails(state))
  const statusProductDetails = useSelector(state => getStatusProductDetail(state))

  const [isRequest, setIsRequest] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích')
  const [image, setImage] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [showViewPermission, setShowViewPermission] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const nextProductId = orgProduct?.product_id || orgProduct?.id
    if (nextProductId) {
      dispatch(requestGetProductDetails(nextProductId))
      if (orgDistributorId) {
        dispatch(requestGetCampaignByDistributorIdByProduct(orgDistributorId, nextProductId))
        dispatch(requestGetCampaignOfDistributorIdByProduct(orgDistributorId, nextProductId))
      }
    }
    scrollToTop()
  }, [orgProduct])

  useEffect(() => {
    if (product && product?.distributor_id) {
      setDistributorId(product?.distributor_id)
    }
  }, [product])

  const getProducts = useCallback(() => {
    const data = []
    if (!cartData || !cartData.items)
      return []
    cartData.items.forEach(cd => {
      if (!cd.items)
        return
      cd.items.forEach(item => {
        data.push({
          ...item,
          distributor_id: cd.distributor.id,
        })
      })
    })
    return data
  }, [cartData])
  const productInCart = getProducts()

  const addProduct = useCallback(
    (qty) => {
      if (!safeProduct?.product_id || !distributorId) {
        return
      }
      setIsRequest(true)
      const index = inList(safeProduct.product_id, productInCart)
      if (index < 0) {
        dispatch(addToCart(safeProduct.product_id, distributorId, qty))
      } else {
        dispatch(updateCart(safeProduct.product_id, distributorId, productInCart[index].qty + qty))
      }
    },
    [safeProduct, productInCart, distributorId],
  )

  const addProd = (qty) => {
    if (Number(quantity) < 10000000) {
      setQuantity(quantity + qty)
    } else {
      setQuantity(10000000)
      setMessage(`Không được quá ${formatMoney(10000000, { unit: '' })} sản phẩm`)
      setOpenMessage(true)
      setTimeout(() => {
        setOpenMessage(false)
      }, 1000)
    }
  }

  const subProd = (qty) => {
    setQuantity(quantity - qty < 0 ? 0 : quantity - qty)
  }

  const addProductToCart = () => {
    if (!isLoggedIn) {
      showToast(strings.common.requireLogin)
      return
    }
    if (quantity <= 0) {
      return
    }
    addProduct(quantity)
    setQuantity(1)
  }

  const inList = (productId, list = []) => {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].product_id === productId && list[i].distributor_id === distributorId) {
        return i
      }
    }
    return -1
  }

  const favorClick = () => {
    if (!safeProduct?.product_id) {
      return
    }
    setIsRequest(true)
    if (safeProduct.is_wishlist) {
      dispatch(requestRemoveProductWishList(safeProduct.product_id))
      setMessage('Đã xóa sản phẩm yêu thích')
    } else {
      dispatch(requestAddProductWishList(safeProduct.product_id))
      setMessage('Đã thêm sản phẩm yêu thích')
    }
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 1000)
  }

  useEffect(() => {
    if (!isRequest)
      return
    switch (requestStatus) {
      case Status.ERROR:
        showToast('Set wishlist error')
        break
      case Status.SUCCESS:
        if (productId) {
          dispatch(requestGetProductDetails(productId))
        }
        break
      default:
        break
    }
  }, [requestStatus, productId])

  useEffect(() => {
    if (isRequest && statusAddCart === Status.SUCCESS) {
      setIsRequest(false)
      setMessage('Thêm sản phẩm thành công')
      setOpenMessage(true)
      setTimeout(() => {
        setOpenMessage(false)
      }, 1000)
      dispatch(resetStatusAddCart())
    }
  }, [statusAddCart])

  const openImage = (urlImage) => {
    setImage(urlImage)
    setOpenModal(!openModal)
  }

  const scrollRef = useRef()

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    })
  }

  useEffect(() => {
    if (errorProductDetails && errorProductDetails.length && errorProductDetails.includes('Tài khoản của bạn chưa được kiểm duyệt') && statusProductDetails === Status.ERROR) {
      setShowViewPermission(true)
    }
    if (statusProductDetails === Status.SUCCESS) {
      setShowViewPermission(false)
    }

  }, [errorProductDetails, statusProductDetails])

  const hasDiscount = Number(safeProduct?.price) > 0
    && Number(safeProduct?.sale_price) > 0
    && Number(safeProduct?.price) !== Number(safeProduct?.sale_price)

  // console.log('EMPTYYYYYYYYYYYYYYY:', errorProductDetails, errorProductDetails.includes('Tài khoản của bạn chưa được kiểm duyệt'))
  return (
    <AppScreen>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={brandColors.background}
        />
        <View style={styles.mainContainer}>
          <Header
            navigation={props.navigation}
            goBack={goBack}
          />
          {showViewPermission ?
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Image
                resizeMode={'contain'}
                source={box_empty}
                style={{ height: 250, width: 275, marginTop: -100 }}
              />
              <Text
                style={{
                  color: Colors.textColor3,
                  fontSize: 16,
                  textAlign: 'center', paddingHorizontal: 10, lineHeight: 25
                }}
              >
                {/* {'Bạn chưa thể xem sản phẩm này.\n Vui lòng đăng ký tài khoản cửa hàng hoặc liên hệ CSKH.'} */}
                {'Bạn chưa thể xem sản phẩm này.\n Vui lòng Liên hệ CSKH 1000M.'}
              </Text>
            </View> :
            <ScrollView
              style={{ flex: 1 }}
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.productContainer}>
                <ProductInfo
                  product={safeProduct}
                  favorClick={favorClick}
                  openImage={(urlImage) => openImage(urlImage)}
                />
              </View>
              <View style={styles.purchasePanel}>
                <View style={styles.purchaseHeader}>
                  <View style={styles.priceBlock}>
                    <Text style={styles.metaLabel}>Giá bán</Text>
                    <Text
                      style={styles.productPrice}
                      numberOfLines={1}
                    >
                      {formatMoney(safeProduct?.sale_price ? safeProduct?.sale_price : null)}
                    </Text>
                  </View>
                  {!isProductCombo && (
                    <View style={styles.amountBlock}>
                      <AmountInput
                        value={quantity.toString()}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          if (!isNaN(text)) {
                            if (Number(text) <= 10000000) {
                              setQuantity(Number(text))
                            } else {
                              setQuantity(10000000)
                              setMessage(`Không được quá ${formatMoney(10000000, { unit: '' })} sản phẩm`)
                              setOpenMessage(true)
                              setTimeout(() => {
                                setOpenMessage(false)
                              }, 1000)
                            }
                          }
                        }}
                        onEndEditing={() => {
                          const qty = Number(quantity)
                          if (qty > 0) {
                            const productQty = safeProduct.qty || 0
                            if (qty - productQty > 0) {
                              addProd(qty - productQty)
                            } else if (qty - productQty < 0) {
                              subProd(productQty - qty)
                            }
                          } else {
                            setQuantity(safeProduct.qty || 1)
                          }
                        }}
                        onMinus={() => subProd(1)}
                        onPlus={() => addProd(1)}
                      />
                    </View>
                  )}
                </View>
                {hasDiscount
                  ? <View style={styles.discountRow}>
                    <Text style={styles.discount}>{formatMoney(safeProduct?.price, { unit: 'đ', space: false })}</Text>
                    <Text style={styles.discountPercent}>-{(100 - (Number(safeProduct?.sale_price) / Number(safeProduct?.price)) * 100).toFixed(1)}%</Text>
                  </View>
                  : null}
                {!isProductCombo && (
                  <Button
                    styleView={styles.btnAddContainer}
                    styleButton={styles.btnAdd}
                    styleText={styles.btnAddText}
                    onPressEvent={() => addProductToCart()}
                    text={strings.productDetailScreen.addToCart}
                  />
                )}
              </View>
              <AppSection title="Ưu đãi đang áp dụng">
                <ProductPromotion
                  addProduct={addProduct}
                  distributorId={distributorId}
                  navigation={props.navigation}
                  product={safeProduct}
                />
                <Voucher
                  navigation={props.navigation}
                  distributorId={distributorId}
                  product={safeProduct}
                />
              </AppSection>
              <AppSection title="Sản phẩm liên quan">
                <SimilarProduct
                  scrollToTop={scrollToTop}
                  distributorId={distributorId}
                  navigation={props.navigation}
                  product={safeProduct}
                />
                <TopProduct
                  scrollToTop={scrollToTop}
                  distributorId={distributorId}
                  navigation={props.navigation}
                  product={safeProduct}
                />
              </AppSection>
              <AppSection title="Thông tin sản phẩm">
                <ProductDescription product={safeProduct} />
              </AppSection>
              <AppSection title="Gợi ý cho bạn">
                <RecommendProduct
                  scrollToTop={scrollToTop}
                  distributorId={distributorId}
                  navigation={props.navigation}
                  product={safeProduct}
                />
              </AppSection>
            </ScrollView>}
        </View>
      </View>
      <Modal
        visible={openModal}
        transparent={true}
        onRequestClose={() => setOpenModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ImageViewer imageUrls={image} />
          <PressScale
            style={styles.buttonClose}
            onPress={() => setOpenModal(false)}
          >
            <Icon
              type="ionicon"
              name={'chevron-back-outline'}
              color={'white'}
              size={30}
            />
          </PressScale>
        </SafeAreaView>
      </Modal>
      <ErrorView
        error={message}
        icon={check_info}
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />
    </AppScreen>
  )
}

export default ProductDetailScreen
