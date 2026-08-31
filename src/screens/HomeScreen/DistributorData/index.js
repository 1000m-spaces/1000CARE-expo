import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import PressScale from '~/design-system/PressScale'

import ListCategories from '../ListCategories/index'
import ListSuppiler from '../ListSuppiler/index'
import { banner_1 } from '~/assets/constants'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getListAdsBanner } from '~/store/selector'
import { requestGetListAdsBannerByDistributor } from '~/store/actions'
import SliderBox from '~/common/SliderBox/index'
import Colors from '~/common/Colors/Colors'
import { NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'

const DistributorData = ({ selectedDistri, navigation }) => {
  console.log('ddddddddddddd:',selectedDistri)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const listAdsBanner = useSelector(state => getListAdsBanner(state))
  const dispatch = useDispatch()

  useEffect(() => {
    setSelectedSupplier(null)
    if (selectedDistri && selectedDistri?.id >= 0) {
      dispatch(requestGetListAdsBannerByDistributor(selectedDistri?.id, 2, 1, -1, 1000, 1))
    }
  }, [selectedDistri])

  return (
    <>
      {
        selectedDistri?.type ? (
          <>
            <ListSuppiler
              selectedDistri={selectedDistri}
              selectedSupplier={selectedSupplier}
              setSelectedSupplier={setSelectedSupplier}
            />
            <ListCategories
              selectedSupplier={selectedSupplier}
              navigation={navigation}
              selectedDistri={selectedDistri}
              type={selectedDistri?.type}
            />
          </>
        ) : (
          <>
            <View
              style={styles.titleSupplierContainer}
            >
              <View style={styles.viewTitleSupplier}>
                <Text style={styles.titleSupplier} >
                  Danh mục
                </Text>
              </View>
              <View style={styles.viewNameSupplier}>
                <Text
                  numberOfLines={1}
                  style={styles.nameSupplier}
                >
                  {selectedSupplier?.name ? selectedSupplier.name : ''}
                </Text>
              </View>
              {
                  selectedSupplier?.id === -1 && (
                  <PressScale
                    style={styles.seeAllBtn}
                    onPress={() => navigation.navigate(NAVIGATION_PRODUCT_LIST, {
                      distributorId: selectedDistri?.id,
                      title: 'Tất cả sản phẩm',
                      type: 'product_by_distributor',
                    })}
                  >
                    <Text style={styles.textButton} numberOfLines={1}>{'Xem tất cả'}</Text>
                  </PressScale>
                )
              }
            </View>
            <View
              style={styles.listSupplierColumnContainer}
            >
              <ListSuppiler
                selectedDistri={selectedDistri}
                selectedSupplier={selectedSupplier}
                setSelectedSupplier={setSelectedSupplier}
              />
              <View
                style={styles.listCategoriesContainer}
              >
                <View
                  style={styles.swiper}
                >
                  <SliderBox
                    containerStyle={styles.swiper}
                    resizeMode="stretch"
                    dotColor={Colors.white}
                    dotStyle={styles.dot}
                    dotContainerStyle={styles.dotContainer}
                    paginationBoxStyle={styles.paginationBox}
                    inactiveDotColor={Colors.disabledText}
                    autoplay={true}
                    circleLoop
                    items={(Array.isArray(listAdsBanner) && listAdsBanner.length > 0 ? listAdsBanner : [{ images: banner_1 }]).map(i => ({ image: i?.images }))}
                    openImage={() => {}}
                    onCurrentItemPressed={() => { }}
                    ImageComponentStyle={styles.swiperItem}
                  />
                </View>
                <ListCategories
                  navigation={navigation}
                  selectedDistri={selectedDistri}
                  selectedSupplier={selectedSupplier}
                  type={selectedDistri?.type}
                />
              </View>
            </View>
          </>
        )
      }
    </>
  )
}

export default DistributorData