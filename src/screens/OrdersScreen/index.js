import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, BackHandler, TextInput, Platform } from 'react-native';
import PressScale from '~/design-system/PressScale';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import EmptyItem from './EmptyItem/index';
import OrderItem from './OrderItem/index';
import { getChangeOrderError, getChangeOrderStatus, getListOrders, getUserConfirmError, getUserConfirmStatus } from '~/store/orders/OrderSelectors';
import { getOrders, paymentOrder, requestChangeOrderStatus, requestUserConfirm, resetChangeOrderStatus } from '~/store/orders/OrderActions';
import { CommonActions } from '@react-navigation/native';
import { NAVIGATION_ORDER_DETAIL_SCREEN, NAVIGATION_TO_MAIN_SCREEN } from '~/navigation/routes';
import strings from '~/i18n';
import { Text } from '~/common/index';
import { getAuthStore } from '~/store/selector';
import LoginRequired from '~/common/LoginRequired/index';
import DialogInfo from '~/common/DialogInfo/index';
import ErrorView from '~/common/ErrorView/index';
import Status from '~/common/Status/Status';
import BottomSheet from '~/common/BottomSheet/index';
import RadioButtonGroup from '~/common/RadioButtonGroup/RadioButtonGroup';
import { KeyboardAvoidingView } from 'react-native';
import { showToast } from '~/utils/toast';
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext';
import AppBackground from '~/design-system/AppBackground';
import GlassFilterChip from '~/design-system/GlassFilterChip';

const OrdersStatus = [
  {
    id: 0,
    title: 'Tất cả',
  },
  {
    id: 1,
    title: 'Đơn mới',
  },
  {
    id: 28,
    title: 'Chờ xác nhận',
  },
  {
    id: 13,
    //id: 2 cùng trạng thái với id = 13
    title: 'Đang xử lý',
  },
  {
    id: 3,
    title: 'Đang giao',
  },
  {
    id: 11,
    title: 'Đã giao',
  },
  {
    id: 12,
    title: 'Hủy đơn',
  },
  {
    id: 16,
    title: 'Hoàn trả',
  },
  {
    id: 4,
    title: 'Hoàn thành',
  },
];

const reasonTypes = [
  'Muốn nhập/thay đổi mã Voucher',
  'Muốn thay đổi sản phẩm trong đơn hàng',
  'Thủ tục thanh toán quá rắc rối',
  'Tìm thấy giá rẻ hơn ở chỗ khác',
  'Đổi ý, không muốn mua nữa',
  'Khác',
];

const OrdersScreen = props => {
  console.log('SSSSSSSSSS:', props);
  const { handleScroll } = useTabBarVisibility();
  const goHome = props.route.params?.goHome;
  const listOrders = useSelector((state) => getListOrders(state));
  const [refreshing, setRefreshing] = useState(false);
  const [changing, setChanging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(OrdersStatus[0].id);
  const [showLoading, setShowLoading] = useState(true);
  const { isLoggedIn } = useSelector(state => getAuthStore(state));
  const [snap, setSnap] = useState(0);
  const [reasonType, setReasonType] = useState(-1);
  const [reason, setReason] = useState('');
  const [enableCancelOrder, setEnableCancelOrder] = useState(false);
  const [orderIdSelected, setOrderIdSelected] = useState(false);

  const changeOrderStatusError = useSelector(state => getChangeOrderError(state));
  const changeOrderStatus = useSelector(state => getChangeOrderStatus(state));
  const [showError, setShowError] = useState(false);
  const userConfirmStatus = useSelector((state) => getUserConfirmStatus(state));
  const userConfirmError = useSelector((state) => getUserConfirmError(state));
  const dispatch = useDispatch();

  const listReason = useMemo(() => {
    return reasonTypes.map((value, idx) => {
      return {
        value: idx,
        title: value,
      };
    });
  }, []);

  const onBack = () => {
    if (goHome) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: NAVIGATION_TO_MAIN_SCREEN },
          ],
        }),
      );
    } else {
      props.navigation.pop();
    }
  };

  useFocusEffect(useCallback(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []));

  useEffect(() => {
    setShowLoading(false);
    setRefreshing(false);
  }, [listOrders]);

  useEffect(() => {
    console.log('trang thaiiiiiiiiiiiiii:', currentStatus);
    setShowLoading(true);
    setCurrentPage(1);
    if (currentStatus === 0) {
      dispatch(getOrders(20, false));
    } else {
      dispatch(getOrders(20, false, currentStatus));
    }

  }, [currentStatus]);

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(getOrders(20, currentPage > 1, currentStatus));
    }
  }, [currentPage]);

  const onPayment = (order) => {
    dispatch(paymentOrder(order.order_id));
  };

  const onRefresh = () => {
    setCurrentPage(1);
    setRefreshing(true);
    dispatch(getOrders(20, false, currentStatus));
  };

  const loadMore = () => {
    if (listOrders.length >= 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onCancelOrder = (orderId) => {
    setOrderIdSelected(orderId);
    onOpenBottomSheet();
  };

  const onCancelOrderConfirmed = () => {
    dispatch(requestChangeOrderStatus(orderIdSelected, reason));
    onCloseBottomSheet();
    setChanging(true);
  };

  useEffect(() => {
    if (changing && changeOrderStatus === Status.SUCCESS) {
      onRefresh();
    }
  }, [changeOrderStatus, changing]);

  useEffect(() => {
    if (reason) {
      setEnableCancelOrder(true);
    } else {
      setEnableCancelOrder(false);
    }
  }, [reason]);

  const onOpenBottomSheet = () => {
    setSnap(1);
  };

  const onCloseBottomSheet = () => {
    setReasonType(-1);
    setSnap(0);
  };

  const handleBuyAgain = order => {
    if (!order) {return;}
    props.navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN, {
      order: {
        ...order,
        address: JSON.parse(order.address),
        items: JSON.parse(order.items),
      },
      isBuyAgain: true,
    });
  };

  const handleConfirmOrder = (orderId) => {
    dispatch(requestUserConfirm(orderId));

  };
  useEffect(() => {
    if (userConfirmStatus === Status.ERROR) {
      setShowError(true);
    } else if (userConfirmStatus === Status.SUCCESS) {
      setShowError(false);
      showToast('Xác nhận thành công');
      setTimeout(() => {
        setCurrentStatus(13);
      }, 300);
    } else {
      setShowError(false);
    }
  }, [userConfirmStatus]);
  return (
    <AppBackground>
      <View style={styles.mainContainer}>
          <View style={styles.ordersHero}>
            <Text style={styles.heroEyebrow}>ORDER DESK</Text>
            <Text style={styles.heroTitle}>{strings.orders.title}</Text>
            <Text style={styles.heroSubtitle}>Theo dõi trạng thái, thanh toán và mua lại đơn hàng trong một màn hình.</Text>
          </View>

          <View style={styles.listProductContainer}>
            {
              isLoggedIn ? (
                <>
                  <FlatList
                    style={styles.listStatus}
                    data={OrdersStatus}
                    contentContainerStyle={styles.contentListStatus}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={({ item }) => {
                      return (
                        <GlassFilterChip
                          label={item.title}
                          selected={item.id === currentStatus}
                          onPress={() => setCurrentStatus(item.id)}
                          style={styles.statusLabelContainer}
                        />
                      );
                    }}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
                  <FlatList
                    style={{
                      flex: 1,
                    }}
                    data={listOrders}
                    scrollEnabled={true}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    onRefresh={() => onRefresh()}
                    refreshing={refreshing}
                    onEndReached={() => loadMore()}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item }) => {
                      return (
                        <OrderItem
                          order={item}
                          onPayment={() => onPayment(item)}
                          goBack={() => onRefresh()}
                          onCancelOrder={(orderId) => onCancelOrder(orderId)}
                          navigation={props.navigation}
                          buyAgain={() => handleBuyAgain(item)}
                          confirmOrder={() => handleConfirmOrder(item?.order_id)}
                        />
                      );
                    }}
                    ItemSeparatorComponent={() => {
                      return (
                        <View style={styles.itemSeparator} />
                      );
                    }}
                    ListEmptyComponent={EmptyItem}
                    keyExtractor={(item, index) => {
                      return index.toString();
                    }}
                  />
                </>
              ) :
                (
                  <LoginRequired />
                )
            }
          </View>
          <DialogInfo
            isOpen={showLoading}
            isError={false}
            isOrder={false}
            isLoading={true}
            message={''}
            closeModal={() => setShowLoading(false)}
          />
          <ErrorView
            error={changeOrderStatusError}
            isOpen={changing && changeOrderStatusError && changeOrderStatus === Status.ERROR}
            onClose={() => {
              setChanging(false);
              dispatch(resetChangeOrderStatus());
            }}
          />
          <ErrorView
            isOpen={showError}
            onClose={() => setShowError(false)}
            error={userConfirmError}
          />
      </View>
        {/* <BottomSheet
          title={
            <Text style={styles.title}>
              {'Chọn Lý Do Huỷ'}
            </Text>
          }
          snap={snap}
          snapPoints={[0, '65%']}
          onCloseEnd={() => {
            setSnap(0);
            setReasonType(-1);
            setReason('');
            setOrderIdSelected('');
          }}
          onClose={onCloseBottomSheet}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View
              style={styles.bottomSheetContainer}
            >
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                  {'Vui lòng chọn lí do huỷ đơn hàng. Lưu ý: Thao tác này sẽ huỷ tất cả các sản phẩm có trong đơn hàng và không thể hoàn tác.'}
                </Text>
              </View>
              <RadioButtonGroup
                containerStyles={styles.radioButtonContainer}
                itemContainerStyles={styles.radioButtonItem}
                value={reasonType}
                data={listReason}
                onDataChange={(item) => {
                  setReasonType(item.value);
                  if (item.value === listReason.length - 1) {
                    setReason('');
                  } else {
                    setReason(reasonTypes[item.value]);
                  }
                }}
              />
              {
                reasonType === listReason.length - 1 && (
                  <TextInput
                    value={reason}
                    onChangeText={(value) => {
                      setReason(value);
                    }}
                    containerStyle={styles.searchInput}
                    editable={true}
                    placeholder={'Nhập lý do'}
                  />
                )
              }
            </View>
            <View
              style={styles.bottomSheetActionContainer}
            >
              <PressScale
                style={[styles.btnContainer, enableCancelOrder ? {} : styles.btnContainerDisable]}
                onPress={enableCancelOrder ? onCancelOrderConfirmed : null}
              >
                <Text
                  style={styles.btnText}
                >{'Đồng ý'}</Text>
              </PressScale>
            </View>
          </KeyboardAvoidingView>
        </BottomSheet> */}
    </AppBackground>
  );
};
export default OrdersScreen;
