import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native'

import ProductChangeItem from './ProductChangeItem'
import Section from './Section'
import SummarySection from './SummarySection'
import InfoDetailOrder from './InfoDetailOrder'
import BottomButon from '~/common/BottomButon/index'
import Header from '~/common/Header/index'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetItemHistory, requestUserConfirm, resetOrder } from '~/store/actions'
import { getOrderItemHistory, getUserConfirmError, getUserConfirmStatus } from '~/store/selector'
import { formatMoney } from '~/utils/format'
import ErrorView from '~/common/ErrorView/index'
import Status from '~/common/Status/Status'
import { showToast } from '~/utils/toast'

const ConfirmOrderProducts = ({ navigation, route }) => {
  const { orderId } = route.params
  const dispatch = useDispatch()
  const userConfirmStatus = useSelector((state) => getUserConfirmStatus(state))
  const userConfirmError = useSelector((state) => getUserConfirmError(state))
  const [showError, setShowError] = useState(false)

  const itemHistory = useSelector(state => getOrderItemHistory(state))

  useEffect(() => {
    return () => {
      dispatch(resetOrder())
    }
  }, [])

  useEffect(() => {
    dispatch(requestGetItemHistory(orderId))
  }, [orderId])

  const getTotal = (key) => {
    let numItem = 0
    let totalMoney = 0
    itemHistory?.forEach(item => {
      const idx = key === 'from' ? (item.items.length - 1) : 0
      numItem += item.items[idx][key].qty
      totalMoney += item.items[idx][key].qty * item.items[idx][key].price
    })
    return [numItem, totalMoney]
  }

  useEffect(() => {
    if (userConfirmStatus === Status.ERROR) {
      setShowError(true)
    } else if (userConfirmStatus === Status.SUCCESS) {
      setShowError(false)
      showToast('Xác nhận thành công')
      navigation.goBack()
    } else {
      setShowError(false)
    }
  }, [userConfirmStatus])

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header
        title={'Chi tiết sửa đổi'}
        leftAction={() => navigation.goBack()}
      />
      <Section title="Sản phẩm thay đổi">
        {itemHistory?.length != 0 &&
        <ScrollView
          style={styles.wrapProducts}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          { 
            itemHistory?.map((item, idx) => (
              <ProductChangeItem
                key={idx}
                item={item}
              />
            ))
          }
        </ScrollView>}
      </Section>
      <SummarySection>
        <InfoDetailOrder
          label={`Tổng số lượng (${getTotal('from')[0]}):`}
          value={formatMoney(getTotal('from')[1])}
          styleValue={{
            color: '#CCCCCC',
            fontSize: 12,
            fontFamily: 'Roboto',
            textDecorationLine: 'line-through',
          }}
          styleLabel={{ textDecorationLine: 'line-through' }}
        />
        <InfoDetailOrder
          label={`Tổng số lượng (${getTotal('to')[0]}):`}
          value={formatMoney(getTotal('to')[1])}
          styleValue={{
            color: '#FF9900',
            fontSize: 14,
            fontFamily: 'Roboto',
          }}
        />
      </SummarySection>
      <BottomButon 
        label={'Xác nhận'}
        onPress={()=>{ 
          dispatch(requestUserConfirm(orderId))
        }}
      />
      <ErrorView 
        isOpen={showError}
        onClose={() => setShowError(false)}
        error={userConfirmError}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapProducts: {
    width: '100%',
    height: Dimensions.get('window').height - 212 - 64,

    marginTop: 12,
  },
})

export default ConfirmOrderProducts
