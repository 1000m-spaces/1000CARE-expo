import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import styles from './styles'
import ItemListNoti from './ItemListNoti'
import { getListNoti, resetListNoti, getCheckReadNoti, requestGetItemHistory } from '~/store/actions'
import { isListNoti, isStatusListNoti, isErrorGetListNoti, isStatusCheckRead } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import Status from '~/common/Status/Status'
import { LoadingView, Text } from '~/common'
import ErrorView from '~/common/ErrorView/index'
import EmptyItem from '~/common/EmptyItem/index'
import {
  // NAVIGATION_TO_HOT_DEAL_SCREEN,
  NAVIGATION_VOUCHER,
  NAVIGATION_TOPUP_SCREEN,
  NAVIGATION_PROMOTION_DETAIL,
  NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN,
  NAVIGATION_ORDER_DETAIL_SCREEN,
  // NAVIGATION_COMBO_PRODUCT_DETAIL,
} from '~/navigation/routes'

const mockNotifications = [
  {
    id: 'mock-campaign-1',
    title: 'Ưu đãi giữa tháng đã sẵn sàng',
    message: 'Nhận voucher freeship và giảm giá 500K cho các đơn hàng đủ điều kiện trong hôm nay.',
    category: 'campaign',
    action: 'campaign_noti',
    is_read: false,
    data: JSON.stringify({
      Id: 1001,
      CampaignType: 3,
      DistributorId: 1,
      StartDate: '2026-06-07',
      StartTime: '09:00',
    }),
  },
  {
    id: 'mock-order-1',
    title: 'Đơn hàng đang chờ xác nhận',
    message: 'Đơn hàng #DH1024 đã được nhà phân phối tiếp nhận. Vui lòng kiểm tra trạng thái xử lý.',
    category: 'order',
    action: 'status_changed',
    is_read: false,
    data: JSON.stringify({
      order_id: 1024,
      StartDate: '2026-06-07',
      StartTime: '10:30',
    }),
  },
  {
    id: 'mock-voucher-1',
    title: 'Voucher mới trong ví của bạn',
    message: 'Một voucher giảm giá mới vừa được thêm vào tài khoản 1000CARE.',
    category: 'voucher',
    action: 'assigned',
    is_read: true,
    data: JSON.stringify({
      StartDate: '2026-06-06',
      StartTime: '15:20',
    }),
  },
  {
    id: 'mock-balance-1',
    title: 'Điểm mua hàng đã được cập nhật',
    message: 'Số dư điểm mua hàng của bạn đã được đồng bộ sau giao dịch gần nhất.',
    category: 'balance',
    action: 'topup',
    is_read: true,
    data: JSON.stringify({
      StartDate: '2026-06-05',
      StartTime: '18:45',
    }),
  },
]

const ListNotiScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const listNoti = useSelector(state => isListNoti(state))
  const statusListNoti = useSelector(state => isStatusListNoti(state))
  const statusCheckRead = useSelector(state => isStatusCheckRead(state))
  const errorGetListNoti = useSelector(state => isErrorGetListNoti(state))

  const [listPage, setListPage] = useState(1)
  const [isRefreshing, setRefreshing] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isLoadNotiAllRead, setLoadNotiAllRead] = useState(false)
  const [isReadAll, setReadAll] = useState(false)
  const hasApiData = Array.isArray(listNoti) && listNoti.length > 0
  const useMockData = statusListNoti === Status.ERROR || !hasApiData
  const displayList = useMockData ? mockNotifications : listNoti

  const loadMore = () => {
    if (useMockData) return
    setListPage(listPage + 1)
    dispatch(getListNoti(10, listPage + 1, true))
  }
  const onRefresh = () => {
    setListPage(1)
    setRefreshing(true)
    dispatch(getListNoti(10, 1, false))
  }
  const reset = useCallback(() => {
    dispatch(resetListNoti())
  })
  const clickNoti = (noti, dataNoti, idNoti, isRead) => {
    console.log('dataNoti', noti)
    if (!isRead) {
      dispatch(getCheckReadNoti(idNoti, 1))
    }

    const action = noti?.action.toLowerCase()
    const category = noti.category.toLowerCase()
    if (action == 'confirm_changes') {
      dispatch(requestGetItemHistory(dataNoti.order_id))
      navigation.navigate(NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN, { orderId: dataNoti.order_id })
    } else if (category === 'voucher' && action === 'assigned') {
      navigation.navigate(NAVIGATION_VOUCHER)
    } else if (category === 'order' && action === 'status_changed') {
      navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN, {
        order: {
          order_id: dataNoti.order_id,
        },
      })
    } else if (category === 'balance' && action === 'topup') {
      //waiting
    } else if (category === 'campaign' && action === 'campaign_noti') {
      if (dataNoti.CampaignType == 2) {
        navigation.navigate(NAVIGATION_TOPUP_SCREEN, { distributor: { id: dataNoti?.DistributorId } })
      }
      else if (dataNoti.CampaignType == 3) {
        navigation.navigate(NAVIGATION_VOUCHER)
      } else {
        navigation.navigate(NAVIGATION_PROMOTION_DETAIL, {
          id_campaign: dataNoti.Id,
        })
      }
    }
  }

  const checkAllNoti = () => {
    dispatch(getCheckReadNoti(0, 0))
    setLoadNotiAllRead(true)
  }

  //get list noti chưa đọc
  useEffect(() => {
    if (statusCheckRead == Status.SUCCESS) {
      dispatch(getListNoti(0, 1, false, 0))
      if (isLoadNotiAllRead) {
        setLoadNotiAllRead(false)
        setReadAll(true)
      }
    }
  }, [statusCheckRead])
  useEffect(() => {
    if (statusListNoti === Status.LOADING) {
      if (!isRefreshing) {
        setLoading(true)
      }
    }
    if (statusListNoti === Status.SUCCESS) {
      setLoading(false)
      setRefreshing(false)
    }
    if (statusListNoti === Status.ERROR) {
      setLoading(false)
      setRefreshing(false)
    }
  }, [statusListNoti])
  useEffect(() => {
    dispatch(getListNoti(10, 1, false))
  }, [])

  const keyExtractor = useCallback((item, index) => index.toString())
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={'Thông báo'}
        leftAction={() => navigation.pop()}
        iconLeft={back}
        navigation={navigation.navigation}
        showRight={true}
        iconRight='checkmark-done-sharp'
        rightAction={checkAllNoti}
      />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>NOTIFICATION CENTER</Text>
        <Text style={styles.heroTitle}>Thông báo</Text>
        <Text style={styles.heroSubtitle}>
          {useMockData
            ? 'API thông báo đang lỗi, dữ liệu mẫu được hiển thị tạm để thiết kế giao diện.'
            : 'Theo dõi voucher, đơn hàng và chiến dịch mới nhất từ 1000CARE.'}
        </Text>
      </View>
      <FlatList
        data={displayList}
        contentContainerStyle={styles.listContent}
        renderItem={(item) => {
          return (
            <ItemListNoti
              item={item.item}
              index={item.index}
              onPress={(dataNoti, idCampaign, isRead) => clickNoti(item.item, dataNoti, idCampaign, isRead)}
              isReadAll={isReadAll}
            />
          )
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyItem
              text={'Hiện tại không có Thông báo'}
            />)
        }}
        onRefresh={() => onRefresh()}
        refreshing={!useMockData && isRefreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadMore()}
        keyExtractor={keyExtractor}
      />
      {isLoading && <LoadingView variant="list" />}
      <ErrorView
        error={errorGetListNoti}
        isOpen={!useMockData && errorGetListNoti ? true : false}
        onClose={reset}
      />
    </SafeAreaView>
  )
}
export default ListNotiScreen
