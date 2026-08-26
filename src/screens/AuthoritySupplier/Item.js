import React from 'react'
import { View } from 'react-native'
import { Image, Text } from '~/common/index'
import styles from './styles'
import { CheckBox } from '~/common/index'
import PressScale from '~/design-system/PressScale'
const Item = ({ data,index,clickSelectDistri, pharmacyInfo }) => {
  return(
    <PressScale
      style={styles.containerItem}
      onPress={() => clickSelectDistri(data)}
    >
      <View style={styles.contentDistri}>
        <Image 
          source={{ uri: data.logo }}
          resizeMode={'contain'}
          // heightImage={20}
          // widthImage={20}
          style={styles.image}
        />
        <View>
          <Text
            numberOfLines={1}
            style={styles.nameDistri}
          >{data.name}
            {data?.id === 1 || data?.id === 0
              ?<Text> (Mặc định)</Text>
              :null
            }
          </Text>
        </View>
      </View>
      {/* <View style={styles.viewCircle}>
        {data?.isChecked &&<View style={styles.circleSelect} />}
      </View> */}
      { 
        <View style={styles.viewCircle}>
          <CheckBox
            checked={data?.isChecked}
            onPress={() => clickSelectDistri(data)}
            titleStyle={styles.textCheckBox}
          />
        </View>
      }
    </PressScale>
  )
}
export default Item
