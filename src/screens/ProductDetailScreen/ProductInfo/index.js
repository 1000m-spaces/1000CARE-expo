import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { Image, Text } from '~/common/index'

import styles from './styles'
import { heart, heart_red } from '~/assets/constants'
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
          <TouchableOpacity
            onPress={() => favorClick && favorClick()}
            style={styles.iconWhitelistContainer}
          >
            <Image
              style={styles.iconWhitelist}
              resizeMode={'contain'}
              source={safeProduct.is_wishlist ? heart_red : heart}
              tintColor={Colors.errorColor}
            />
          </TouchableOpacity>
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
