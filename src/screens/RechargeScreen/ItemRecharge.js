import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {Image} from '~/common/index';
import Chevron from '~/assets/configNeoMed/bank/Chevron_Right.png';
import PressScale from '~/design-system/PressScale';
const fullWith = Dimensions.get('window').width;

const ItemRecharge = props => {
  const data = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Image
          resizeMode={'contain'}
          style={styles.logoBank}
          source={data.image}
        />
      </View>
      <View style={styles.viewNameBank}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.fullName}>{data.fullName}</Text>
      </View>
      <PressScale style={styles.buttonChevron}>
        <Image style={styles.chevron} source={Chevron} />
      </PressScale>
    </View>
  );
};
export default ItemRecharge;

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
});
