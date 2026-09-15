import React from 'react'
import { View } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { Text, Icon } from '~/common/index'
import PressScale from '~/design-system/PressScale'

import styles from './styles'
import SliderBox from '~/common/SliderBox/index'
import placeholder from '~/assets/images/placeholder.png'
import { getProductImages } from '~/utils/image'
import dimension from '~/constants/dimens'
import { s } from '~/utils/responsive'

const DETAIL_IMAGE_WIDTH = dimension.common.WINDOW_WIDTH - s(32)

const ProductInfo = ({ product, favorClick, openImage }) => {
  const safeProduct = product || {}
  const productImages = getProductImages(safeProduct, 'xl')
  const images = productImages.length > 0 ? productImages : [placeholder]
  return (
    <>
      <View
        style={styles.swiperConatainer}
      >
        <SliderBox
          resizeMode="contain"
          dotColor={Colors.white}
          dotStyle={styles.dot}
          dotContainerStyle={styles.dotContainer}
          paginationBoxStyle={styles.paginationBox}
          inactiveDotColor={Colors.disabledText}
          autoplay={true}
          circleLoop
          parentWidth={DETAIL_IMAGE_WIDTH}
          items={images.map(i => ({ image: i }))}
          onCurrentItemPressed={() => { }}
          ImageComponentStyle={styles.swiperItem}
          openImage={openImage}
          imageZoom={images.map(i => ({ url: i }))}
        />
      </View>
      <View style={styles.productInfoContainer}>
        <View
          style={styles.productNameContainer}
        >
          <Text
            numberOfLines={6}
            style={[styles.title, { flex: 9 }]}
          >
            {safeProduct.name || null}
          </Text>
          <PressScale
            onPress={() => favorClick && favorClick()}
            style={styles.iconWhitelistContainer}
          >
            {/* Icon vector (không phải PNG tint 2 asset) — tô đặc thật sự
                khi đã thích, không chỉ đổi tint 1 màu lên 2 ảnh gần giống
                nhau khiến người dùng khó nhận ra đã bấm hay chưa. */}
            <Icon
              type="ionicon"
              name={safeProduct.is_wishlist ? 'heart' : 'heart-outline'}
              color={Colors.errorColor}
              size={20}
            />
          </PressScale>
        </View>
        <Text
          numberOfLines={1}
          style={styles.pack}
        >
          {`${safeProduct.unit ? safeProduct.unit : ''} ${safeProduct.packing_specs ? safeProduct.packing_specs : ''}`}
        </Text>
      </View>
    </>
  )
}

export default ProductInfo
