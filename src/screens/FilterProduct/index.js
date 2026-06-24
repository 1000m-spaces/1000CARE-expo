import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import { Button, Text } from '~/common/index'
import { getCategories, getListDistributorAll, getListSuppliers } from '~/store/selector'
import { getAllDistributors, getCateBySup, getSupplierByDistributor, resetCateBySup } from '~/store/actions'
import AppBackground from '~/design-system/AppBackground'
import { brandColors } from '~/design-system/tokens'

import styles from './styles'
import Group from './Group'

const FilterProduct = ({ navigation, route }) => {
  const { onLoad, query, distributorId, mode = 'supplier' } = route.params
  const dispatch = useDispatch()
  const [supplierSelected, setSupplierSelected] = useState(null)
  const [cateSelected, setCateSelected] = useState(null)
  const [distributorSelected, setDistributorSelected] = useState(null)

  const listDistributor = useSelector(state => getListDistributorAll(state))
  const listSupplier = useSelector(state => getListSuppliers(state))
  const listCategories = useSelector(state => getCategories(state))

  useEffect(() => {
    dispatch(getAllDistributors(1,80,1,false))
  }, [])

  useEffect(() => {
    if (distributorId) {
      setDistributorSelected({ id: distributorId })
    }
  }, [distributorId])

  useEffect(()=>{
    if (distributorSelected) {
      dispatch(resetCateBySup())
      dispatch(getSupplierByDistributor(distributorSelected?.id, 1, 100, false))
    }
  }, [distributorSelected])

  useEffect(() => {
    if (query) {
      if (query.distributorSelected) {
        setDistributorSelected(query.distributorSelected)
      }
      setSupplierSelected(query.supplierSelected)
      setCateSelected(query.cateSelected)
    }
  }, [query])

  useEffect(()=>{
    if (listSupplier && listSupplier.length > 0) {
      dispatch(getCateBySup(listSupplier[0].id, 1, 100, false))
    }
  }, [listSupplier])

  useEffect(() => {
    if (supplierSelected) {
      dispatch(getCateBySup(supplierSelected.id, 1, 100, false))
    }
  }, [supplierSelected])

  const onSelectCate = (_, item) => {
    setCateSelected(cateSelected?.category_id === item?.category_id ? null : item)
  }

  const cleanUp = () => {
    setDistributorSelected(null)
    setSupplierSelected(null)
    setCateSelected(null)
  }

  return (
    <AppBackground>
      <Header
        leftAction={() => navigation.pop()}
        iconLeft={back}
        title={'Bộ lọc'}
        navigation={navigation}
        cart={false}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>FILTER</Text>
          <Text style={styles.heroTitle}>Tinh chỉnh danh sách</Text>
          <Text style={styles.heroSubtitle}>Chọn một tiêu chí để danh sách sản phẩm trả về đúng hơn.</Text>
        </View>
        <View style={styles.filterCard}>
          {mode !== 'supplier' && (
            <Group
              title={'Nhà cung cấp'}
              subTitle={distributorSelected ? `Đang lọc: ${distributorSelected.nick_name || distributorSelected.name || 'Nhà cung cấp đã chọn'}` : 'Chọn tối đa 1 nhà cung cấp'}
              data={listDistributor}
              isSelect={(idx, item) => {
                return item?.id === distributorSelected?.id
              }}
              clickItem={(idx, item) => {
                setCateSelected(null)
                setSupplierSelected(null)
                setDistributorSelected(item?.id === distributorSelected?.id ? null : item)
              }}
              navigation={navigation}
            />
          )}
          {mode === 'supplier' && (
            <>
              <Group 
                title={'Nhóm sản phẩm'}
                subTitle={supplierSelected ? `Đang lọc: ${supplierSelected.name}` : 'Chọn tối đa 1 nhóm sản phẩm'}
                data={listSupplier}
                isSelect={(idx, item) => {
                  return item?.id === supplierSelected?.id
                }}
                clickItem={(idx, item) => {
                  setCateSelected(null)
                  setSupplierSelected(item?.id === supplierSelected?.id ? null : item)
                }}
                navigation={navigation}
              />
              <Group 
                title={'Nhóm bệnh'}
                subTitle={cateSelected ? `Đang lọc: ${cateSelected.name}` : 'Chọn tối đa 1 nhóm bệnh'}
                data={listCategories}
                isSelect={(idx, item) => {
                  return item?.category_id === cateSelected?.category_id
                }}
                clickItem={(idx, item) => onSelectCate(idx, item)}
                navigation={navigation}
              />
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          text={'Thiết lập lại'}
          styleButton={styles.resetButton}
          styleText={styles.resetButtonText}
          styleView={styles.buttonConfirm}
          onPressEvent={cleanUp}
        />
        <Button 
          text={'Áp dụng'}
          styleButton={styles.applyButton}
          styleText={{ fontWeight:'600', color: brandColors.surface }}
          styleView={styles.buttonConfirm}
          onPressEvent={() => {
            if (onLoad) {
              onLoad(supplierSelected, cateSelected, distributorSelected)
            }
            navigation.pop()
          }}
        />
      </View>
    </AppBackground>
  )
}

export default FilterProduct
