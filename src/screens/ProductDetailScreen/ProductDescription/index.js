import React, { useState } from 'react'
import { View } from 'react-native'
import PressScale from '~/design-system/PressScale'
import HTML from 'react-native-render-html'
import Colors from '~/common/Colors/Colors'
import { Text } from '~/common/index'
import { SVG } from '~/common'

import ProductInfoItem from '../ProductInfoItem/index'
import styles from './styles'

const ProductDescription = ({ product }) => {
  const [currentTab, setCurrentTab] = useState(1)
  const [expand, setExpand] = useState(true)

  const getProductInfoData = () => {
    return (
      <>
        <ProductInfoItem
          title={'Thương hiệu:'}
          value={product.trademark?.name}
          focus
        />
        <ProductInfoItem
          title={'Thành phần chính:'}
          value={product.main_ingredient}
        />
        <ProductInfoItem
          title={'Đặc tính:'}
          value={product.medicinal_props}
          focus
        />
        <ProductInfoItem
          title={'Dạng sản phẩm:'}
          value={product.dosage_forms}
        />
        <ProductInfoItem
          title={'Số đăng ký:'}
          value={product.registered_code}
          focus
        />
        <ProductInfoItem
          title={'Đơn vị sản xuất:'}
          value={product.manufacture}
        />
        <ProductInfoItem
          title={'Đơn vị phân phối:'}
          value={product.distribution_unit}
          focus
        />
        <ProductInfoItem
          title={'Xuất xứ:'}
          value={product.origin}
        />
      </>
    )
  }

  const getProductDescription = () => {
    return (
      <>
        {
          product.description ? (
            <HTML
              tagsStyles={{ p: { color: 'black', lineHeight: 18 } }}
              source={{ html: product?.description }}
            />
          ) : (
            <Text>Không có thông tin</Text>
          )
        }
      </>
    )
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.white,
        paddingVertical: 12,
        minHeight: expand ? 500 : 0,
      }}
    >
      <PressScale
        onPress={() => setExpand(!expand)}
      >
        <Text
          style={styles.infoSectionTitle}
        >
          {'Thông tin sản phẩm'}
        </Text>
        <SVG
          width={24}
          height={24}
          name={expand ? 'chevron_up_outlined' : 'chevron_down_outlined'}
          style={styles.chevronIcon}
        />
      </PressScale>
      {
        expand && (
          <View
            style={styles.tabContainer}
          >
            <PressScale
              style={currentTab === 1 ? [styles.tabTitle, styles.tabSelected] : styles.tabTitle}
              onPress={() => setCurrentTab(1)}
            >
              <Text
                style={currentTab === 1 ? [styles.tabText, styles.tabSelected] : styles.tabText}
              >Giới thiệu</Text>
            </PressScale>
            <PressScale
              onPress={() => setCurrentTab(2)}
              style={currentTab === 2 ? [styles.tabTitle, styles.tabSelected] : styles.tabTitle}
            >
              <Text
                style={currentTab === 2 ? [styles.tabText, styles.tabSelected] : styles.tabText}
              >Chi tiết</Text>
            </PressScale>
          </View>
        )
      }
      {
        expand && (
          <View
            style={{
              marginBottom: 18,
            }}
          >
            {
              currentTab === 1 ?
                getProductInfoData()
                :
                (
                  <View
                    style={{
                      marginHorizontal: 18,
                    }}
                  >
                    {
                      getProductDescription()
                    }
                  </View>
                )
            }
          </View>
        )
      }

    </View>
  )
}

export default ProductDescription