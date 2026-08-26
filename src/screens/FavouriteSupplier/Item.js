import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from '~/common/index';
import styles from './styles';
import PressScale from '~/design-system/PressScale';

const Item = ({data,index,clickSelectDistri,distriSelect, pharmacyInfo}) => {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if((pharmacyInfo?.favourite_distributor?.id == 0 || pharmacyInfo?.favourite_distributor?.id ==1) && (data?.id == 0 || data?.id == 1) && (distriSelect?.id == 0 || distriSelect?.id == 1)) {
      setHidden(false);
    }
    else if(data?.id == distriSelect?.id){
      setHidden(false);
    } else {
      setHidden(true);
    }
  },[distriSelect])
  
  return(
    <PressScale style={styles.containerItem} onPress={() => clickSelectDistri(data)}>
      <View style={styles.contentDistri}>
        <Image 
          source={{ uri: data.logo }}
          resizeMode={'contain'}
          // heightImage={20}
          // widthImage={20}
          style={styles.image}
        />
      <View>
        <Text numberOfLines={1} style={styles.nameDistri}>{data.name}
          {data?.id == 1 || data?.id == 0
            ?<Text> (Mặc định)</Text>
            :null
          }
        </Text>
      </View>
      </View>
      <View style={styles.viewCircle}>
        {!hidden &&<View style={styles.circleSelect}></View>}
      </View>
    </PressScale>
  );
}
export default Item;
