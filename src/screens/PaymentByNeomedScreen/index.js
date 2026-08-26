import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Header from '~/common/Header/index';
import PressScale from '~/design-system/PressScale';
import styles from './styles';
import { back } from '~/assets/constants';
import strings from '~/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from '~/utils/index';
import {
  getBalance,
  paymentOrder,
  requestGetPaymentMethob,
} from '~/store/actions';
import { getUserId, getAccounts, getPaymentMethob } from '~/store/selector';
import { Image } from '~/common/index';
import { getOrderRequestStatus } from '~/store/orders/OrderSelectors';
import DialogInfo from '~/common/DialogInfo/index';
import Status from '~/common/Status/Status';
// import { NAVIGATION_ORDERS_SCREEN } from '~/navigation/routes'

const ACCOUNT_TYPE = {
  ASSETS: 'ASSETS',
  PROMOTION: 'PROMOTION',
};

const BankItem = ({ logo, title, amount, onClick, key }) => {
  return (
    <PressScale style={styles.itemContainer} onPress={onClick} key={key}>
      <View style={styles.logoItemContainer}>
        <Image style={styles.logoItem} resizeMode={'contain'} source={logo} />
      </View>
      <View>
        <Text style={styles.titleItem}>{title}</Text>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </PressScale>
  );
};

const PaymentByNeomedScreen = props => {
  const { order, onReload } = props.route.params;
  const userId = useSelector(state => getUserId(state));
  const paymentAccount = useSelector(state => getAccounts(state));
  const paymentStatus = useSelector(state => getOrderRequestStatus(state));
  const [isRequest, setIsRequest] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isDialogError, setIsDialogError] = useState(false);
  const paymentMethods = useSelector(state => getPaymentMethob(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBalance(userId));
    dispatch(requestGetPaymentMethob(order?.distributor?.id));
  }, []);

  useEffect(() => {
    if (!isRequest) {
      return;
    }
    switch (paymentStatus) {
      case Status.LOADING:
        setIsOpenDialog(true);
        setIsDialogError(false);
        break;
      case Status.SUCCESS:
        setIsOpenDialog(false);
        setIsRequest(false);
        if (onReload) {
          onReload();
        }
        props.navigation.pop();
        break;
      case Status.ERROR:
        setIsRequest(false);
        setIsDialogError(true);
        break;
    }
  }, [isRequest, paymentStatus]);

  let totalMoney = 0;
  order?.items.forEach(i => {
    totalMoney += i.price * i.quantity;
  });

  const onPayment = pm => {
    setIsRequest(true);
    dispatch(paymentOrder(order.order_id, pm?.code));
  };

  const getWallet = () => {
    for (let i = 0; i < paymentMethods?.length; i++) {
      const pm = paymentMethods[i];
      console.log('pm', pm);
      if (pm?.code !== 'NEOW') {
        continue;
      }
      for (let j = 0; j < paymentAccount?.length; j++) {
        const pa = paymentAccount[j];
        for (let k = 0; k < pa?.accounts?.length; k++) {
          const ac = pa?.accounts[k];
          if (Number(ac?.refId) !== order?.distributor?.id) {
            continue;
          }
          return (
            <BankItem
              key={ac.accountId}
              title={pm?.name}
              logo={{ uri: order?.distributor?.logo }}
              amount={
                ac.accountType === ACCOUNT_TYPE.ASSETS
                  ? formatMoney(ac.balance)
                  : ac.balance
              }
              type={ac.accountType}
              onClick={() => onPayment(pm)}
            />
          );
        }
      }
    }
    return <></>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Header
          title={strings.paymentMethod.title}
          leftAction={() => props.navigation.pop()}
          iconLeft={back}
        />
        <View style={styles.checkoutInfoContainer}>
          <Text style={styles.titleInfo}>
            {`Tổng tiền thanh toán đơn hàng ${order?.order_id} của ${order?.distributor?.name}`}
          </Text>
          <Text style={styles.totalPrice}>{formatMoney(totalMoney)}</Text>
        </View>
        <ScrollView>
          <View style={[styles.paymentAccountContainer, styles.mt1]}>
            <Text style={styles.paymentAccountTitle}>
              {`Tài khoản 1000M tại ${order?.distributor?.name}`}
            </Text>
            {getWallet()}
          </View>
        </ScrollView>
        <DialogInfo
          isOpen={isOpenDialog}
          isError={isDialogError}
          isLoading={!isDialogError}
          isOrder={true}
          closeModal={() => setIsOpenDialog(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentByNeomedScreen;
