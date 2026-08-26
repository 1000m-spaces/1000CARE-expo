import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {Image} from '~/common/index';
import {log_mb_bank_landscape} from '~/assets/constants';
import PressScale from '~/design-system/PressScale';
const fullWith = Dimensions.get('window').width;

const ItemBank = ({data}) => {
  const numberAccount = account => {
    if (typeof account === 'string' && account.length > 0) {
      const length = account.length;
      const number = account.slice(Math.max(0, length - 3), length);
      const format = '*'.repeat(Math.max(0, length - 3)) + number;
      return format.toString().replace(/(\*)(?=(.{4})+(?!.))/g, '$1 ');
    }
    return '';
  };
  return (
    <PressScale style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          resizeMode={'contain'}
          style={styles.logoBank}
          // source={{
          //   uri: 'https://scontent.smarttourism.vn/resources/portal/Images/NBH/superadminportal.nbh/TienIch/mb.jpg_636624879772743405.jpg',
          // }}
          source={log_mb_bank_landscape}
        />
      </View>
      <View style={styles.viewNameBank}>
        <Text style={styles.name}>Ngân hàng Quân Đội {data.bank_code}</Text>
        {/* <Text style={styles.fullName}>Ngân hàng Quân Đội</Text> */}
        {/* <Text style={styles.fullName}>BankCode: {data.bank_code}</Text> */}
        <Text style={styles.fullName}>
          Stk: {numberAccount(data?.account_number)}
        </Text>
      </View>
    </PressScale>
  );
};
export default ItemBank;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  viewImage: {
    width: fullWith * 0.3 - 10,
  },
  viewNameBank: {
    width: fullWith * 0.55,
    paddingLeft: 15,
    marginBottom: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    color: '#595959',
  },
  fullName: {
    color: '#8C8C8C',
  },
  buttonChevron: {
    width: fullWith * 0.15 - 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoBank: {
    width: fullWith * 0.3 - 10,
    height: 60,
  },
});
