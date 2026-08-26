import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from '~/common/index'
import PressScale from '~/design-system/PressScale'

import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getListVoucher } from '~/store/selector'
import { requestGetListVoucherByCustomer } from '~/store/actions'
import { SVG } from '~/common'
import BottomSheet from '~/common/BottomSheet/index'
import VoucherItem from './VoucherItem/index'
import { formatMoneyString2 } from '~/utils/format'

const Voucher = ({ navigation, product, distributorId }) => {
  const listVoucher = useSelector(state => getListVoucher(state))
  const safeListVoucher = Array.isArray(listVoucher) ? listVoucher : []
  const [snap, setSnap] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (product) {
      //Api call bị lỗi null khi thoát ra vào lại 2 lần nên tạm thời comment lại cần nghiêm cứu lại
      // dispatch(requestGetListVoucherByCustomer(distributorId, 'assigned', 1, 100, false))
    }
  }, [product, distributorId])

  const onOpenBottomSheet = () => {
    setSnap(1)
  }

  const onCloseBottomSheet = () => {
    setSnap(0)
  }

  if (safeListVoucher.length === 0) {
    return null
  }

  return (
    <View
      style={styles.mainContainer}
    >
      <PressScale
        onPress={onOpenBottomSheet}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 24,
        }}
      >
        <Text
          style={styles.title}
        >
          {'Voucher của Shop'}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {
            safeListVoucher.slice().sort(function(a, b){return (b?.discount || 0) - (a?.discount || 0)}).filter((_, idx) => idx < 2).map((voucher, idx) => {
              return (
                <View key={voucher?.id ?? idx} style={styles.saleOff}>
                  <Text style={styles.textSaleOff}>{`Giảm ${formatMoneyString2(voucher?.discount)}`}</Text>
                </View>
              )
            })
          }
        </View>
        
        <SVG
          width={24}
          height={24}
          name={'chevron_right_outlined'}
          style={styles.chevronIcon}
        />
      </PressScale>
      <BottomSheet
        title={
          <Text style={styles.title}>
            {'Voucher của Shop'}
          </Text>
        }
        snap={snap}
        snapPoints={[0, '65%']}
        onCloseEnd={() => {
          setSnap(0)
        }}
        onClose={onCloseBottomSheet}
      >
        <FlatList 
          style={styles.bottomSheetContainer}
          data={safeListVoucher}
          scrollEnabled={true}
          keyExtractor={(_, index) => {
            return index.toString()
          }}
          renderItem={({ item }) => {
            return (
              <VoucherItem
                type={item.status}
                data={item}
                listVoucherExpired={[]}
                orgDistributorId={distributorId}
              />
            )
          }}
        />
            
      </BottomSheet>
    </View>
  )
}

export default Voucher