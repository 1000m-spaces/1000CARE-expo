import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { right_arrow } from '~/assets/constants';
import { Image } from '~/common/index';
import CustomHeader from '~/common/CustomHeader/index';
import { NAVIGATION_PRODUCT_PROMOTION_LIST_SCREEN } from '~/navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, getAuthStore, getUserId } from '~/store/selector';
import { useEffect } from 'react';
import { getBalance } from '~/store/actions';
import { formatMoney, formatNumber } from '~/utils/format';
import LoginRequired from '~/common/LoginRequired/index';
import PressScale from '~/design-system/PressScale';
import BackgroundWash from '~/design-system/BackgroundWash';

// Dòng "điểm tích luỹ theo NCC" theo tinh thần card sản phẩm/thẻ trong
// spec (nền trắng, viền borderSoft, shadow teal mềm), logo NCC trong khung
// bo tròn tealLight, số điểm nhấn màu vàng — thay hàng phẳng nền trắng cũ.
const RewardItem = ({ logo, title, amount, onClick }) => {
  return (
    <PressScale style={styles.itemContainer} onPress={onClick}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={styles.logoItemContainer}>
          <Image style={styles.logoItem} resizeMode={'contain'} source={logo} />
        </View>
        <View>
          <Text style={styles.titleItem}>{title}</Text>
          <Text style={styles.amount}>{amount} điểm</Text>
        </View>
      </View>

      <Image style={styles.iconChoose} source={right_arrow} />
    </PressScale>
  );
};

const RewardRedemption = props => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => getAccounts(state));
  const userId = useSelector(state => getUserId(state));
  const { isLoggedIn } = useSelector(state => getAuthStore(state));

  useEffect(() => {
    dispatch(getBalance(userId));
  }, []);

  const onClick = pa => {
    props.navigation.navigate(NAVIGATION_PRODUCT_PROMOTION_LIST_SCREEN, {
      distributorId: pa.id,
    });
  };

  const getBalanceDisplay = (distributor, type) => {
    if (type === 'ASSETS') {
      const account = distributor.accounts.find(
        ac => ac.accountType === 'ASSETS',
      );
      if (account) {
        return formatMoney(account.balance);
      }
    } else if (type === 'PROMOTION') {
      const account = distributor.accounts.find(
        ac => ac.accountType === 'PROMOTION',
      );
      if (account) {
        return formatNumber(account.balance);
      }
    }

    return '0';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <BackgroundWash />
        <CustomHeader
          navigation={props.navigation}
          title={'Điểm tích lũy'}
          search={false}
        />
        <ScrollView>
          <View style={[styles.paymentAccountContainer, styles.mt1]}>
            {isLoggedIn ? (
              accounts && accounts.length > 0 ? (
                accounts.map((pa, idx) => {
                  return (
                    <RewardItem
                      key={idx}
                      title={'Điểm tích luỹ'}
                      logo={{
                        uri: pa.logo,
                      }}
                      amount={getBalanceDisplay(pa, 'PROMOTION')}
                      onClick={() => onClick(pa)}
                    />
                  );
                })
              ) : null
            ) : (
              <LoginRequired />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RewardRedemption;
