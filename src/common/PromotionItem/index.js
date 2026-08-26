import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import PressScale from '~/design-system/PressScale'
import { Image, Text } from '~/common/index'
import placeholder from '~/assets/images/placeholder.png'
import { discount_icon } from '~/assets/constants'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import { DIMENS } from '~/constants/index'
import { NAVIGATION_CHOOSE_GIFT_PROMOTION } from '~/navigation/routes'

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

const RangePrices = ({ onBuy, text, textAction = 'Mua ngay' }) => {
  return (
    <View
      style={[styles.container, {
        marginHorizontal: 0,
      }]}
    >
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={discount_icon}
        />
      </View>
      <View
        style={styles.promotionContainer}
      >
        <Text
          style={[
            styles.promotion,
            {
              width: DIMENS.common.WINDOW_WIDTH - 200,
            },
          ]}
          numberOfLines={2}
          ellipsizeMode='tail'
        >{text}</Text>
        <PressScale
          onPress={() => onBuy()}
        >
          <Text
            style={styles.buyNow}
          >{textAction}</Text>
        </PressScale>
      </View>
    </View>
  )
}

export const DiscountOrder = ({ data }) => {
  return (
    <Text
      style={styles.promotionType}
    >
      {`Giảm giá: ${data?.discount_rate || 0}% ( ${formatMoney(data?.amount || 0, { unit: 'đ' })})`}
    </Text>
  )
}

export const AccumulationOnOrder = ({ data }) => {
  return (
    <View
      style={styles.column}
    >
      <Text
        style={styles.promotionType}
      >
        {`Tích luỹ: ${data?.accumulation_rate || 0}% ( ${formatMoney(data?.amount || 0, { unit: 'điểm' })})`}
      </Text>
      {
        !data.dontShowNote && (
          <Text
            style={styles.promotionNote}
            numberOfLines={2}
            ellipsizeMode='tail'
          >Ghi chú: Điểm thưởng sẽ được tích luỹ sau khi đơn hàng hoàn thành</Text>
        )
      }
    </View>
  )
}

export const DiscountBuyingProducts = ({ data }) => {
  return (
    <View
      style={styles.column}
    >
      <Text
        style={styles.promotionType}
      >
        {`Giảm giá: ${data?.discount_rate || 0}% ( ${formatMoney(data?.amount || 0, { unit: 'đ' })})`}
      </Text>
    </View>
  )
}

const ProductItem = ({ product, gift }) => {
  return (
    <View
      style={styles.productContainer}
    >
      <Image
        style={styles.productImage}
        source={getProductImage(product, 'lg', placeholder)}
      />
      <View
        style={styles.productInfo}
      >
        <Text
          style={styles.productName}
          numberOfLines={2}
          ellipsizeMode='tail'
        >{product?.name}</Text>
        <Text style={styles.productQuantity}>{`Số lượng: ${gift?.quantity || 0}`}</Text>
      </View>
    </View>
  )
}

export const GiftOrder = ({ navigation, data, distributorId, paymentType, promotionProductIds, promotion, mode, isGiftSelection = false }) => {
  if (!data.gifts || data.gifts.length === 0)
    return null
  const isSelectedPromotion = () => {
    const promoList = promotionProductIds || []
    return data.gifts.filter(g => promoList.find(p => p.campaign_id === promotion?.id)?.product_ids?.includes(g.product.product_id)).length === data.gift_selection_limit
  }

  return (
    <View
      style={styles.column}
    >
      {
        !isGiftSelection ?
          (
            <>
              {
                !data.dontShowNote && (
                  <Text
                    style={styles.promotionType}
                  >
                    {'Quà tặng'}
                  </Text>
                )
              }
              {
                data.gifts.map((gift, idx) => {
                  const product = gift.product
                  return (
                    <ProductItem
                      key={idx}
                      product={product}
                      gift={gift}
                    />
                  )
                })
              }
            </>
          )
          : (
            isSelectedPromotion() ? (
              <>
                {
                  !data.dontShowNote && (
                    <Text
                      style={styles.promotionType}
                    >
                      {'Quà tặng'}
                    </Text>
                  )
                }
                {
                  data.gifts.filter(g => (promotionProductIds || []).find(p => p.campaign_id === promotion?.id)?.product_ids?.includes(g.product.product_id)).map((gift, idx) => {
                    const product = gift.product
                    return (
                      <ProductItem
                        key={idx}
                        product={product}
                        gift={gift}
                      />
                    )
                  })
                }
                {
                  mode !== 'order' && (
                    <PressScale
                      onPress={() => {
                        navigation.navigate(NAVIGATION_CHOOSE_GIFT_PROMOTION, {
                          promotion: { ...data, campaign_id: promotion?.id },
                          distributorId,
                          paymentType,
                        })
                      }}
                    >
                      <Text
                        style={[styles.promotionType, {
                          marginTop: 5,
                        }]}
                      >Đổi quà tặng</Text>
                    </PressScale>
                  )
                }
              </>
            ) : (
              <>
                {
                  mode !== 'order' && (
                    <PressScale
                      onPress={() => {
                        navigation.navigate(NAVIGATION_CHOOSE_GIFT_PROMOTION, {
                          promotion: { ...data, campaign_id: promotion?.id },
                          distributorId,
                          paymentType,
                        })
                      }}
                    >
                      <Text
                        style={[styles.promotionType, {
                          marginTop: 5,
                        }]}
                      >Chọn quà tặng</Text>
                    </PressScale>
                  )
                }
              </>
            )
          )
      }
    </View>
  )
}

const PromotionItem = ({
  type, promotion, onClick,
  onBuy, text, textAction,
  navigation, distributorId,
  paymentType, promotionProductIds,
  mode,
}) => {
  if (type === 3) {
    return (
      <RangePrices
        onBuy={onBuy}
        text={text}
        textAction={textAction}
      />
    )
  }
  console.log('promotionnnnnnnnnnn:', promotion)

  const data = promotion ? (promotion[PromotionTypes[promotion?.campaign_type]] || {}) : {}

  const getPromotionInfo = (item) => {
    if (!item)
      return null
    switch (promotion?.campaign_type) {
      case 4:
        return (
          <DiscountOrder
            data={item}
          />
        )
      case 5:
        return (
          <GiftOrder
            type={5}
            mode={mode}
            data={item}
            promotion={promotion}
            navigation={navigation}
            distributorId={distributorId}
            paymentType={paymentType}
            promotionProductIds={promotionProductIds}
            isGiftSelection={data?.is_gift_selection}
          />
        )
      case 6:
        return (
          <AccumulationOnOrder
            data={item}
          />
        )
      case 7:
        return (
          <DiscountBuyingProducts
            data={item}
          />
        )
      case 8:
        return (
          <GiftOrder
            type={8}
            data={item}
            mode={mode}
            promotion={promotion}
            navigation={navigation}
            distributorId={distributorId}
            paymentType={paymentType}
            isGiftSelection={data?.is_gift_selection}
            promotionProductIds={promotionProductIds}
          />
        )
      case 9:
        return (
          <GiftOrder
            type={9}
            data={item}
            mode={mode}
            promotion={promotion}
            navigation={navigation}
            distributorId={distributorId}
            paymentType={paymentType}
            promotionProductIds={promotionProductIds}
            isGiftSelection={data?.is_gift_selection}
          />
        )
      case 10:
        return (
          <GiftOrder
            type={9}
            data={item}
            mode={mode}
            promotion={promotion}
            navigation={navigation}
            distributorId={distributorId}
            paymentType={paymentType}
            promotionProductIds={promotionProductIds}
            isGiftSelection={data?.is_gift_selection}
          />
        )
    }
  }

  return (
    <PressScale
      onPress={onClick}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={discount_icon}
        />
      </View>
      <View
        style={styles.promotionInfoContainer}
      >
        <Text
          style={styles.promotion}
          numberOfLines={5}
          ellipsizeMode='tail'
        >
          {promotion?.name}
        </Text>
        {
          getPromotionInfo((data?.items || []).find(item => item.is_order_valid))
        }
      </View>
    </PressScale>
  )
}
export default PromotionItem
