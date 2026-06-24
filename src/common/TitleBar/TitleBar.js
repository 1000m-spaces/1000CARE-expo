import React, { useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Colors from '../Colors/Colors'
import { Rectangle } from '../../assets/constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const withDevices = Dimensions.get('window').width
const TitleBar = props => {
  const [width,setWidth] = useState(0)
  return (
    <View style={styles.container}>
      <ImageBackground
        style={props.isShowBtn ? styles.background2 : styles.background}
        source={Rectangle}
      >
        {props.isShowBtn && (                                       
          <Icon
            onPress={props.onBtnCloseClicked}
            color="#fff"
            name="arrow-left"
            size={35}
          />
        )}
        <Text
          onLayout={(event)=> {
            var{ x,y,width,height } = event.nativeEvent.layout
            setWidth(width)
            return
          }}
          style={props.isShowBtn ? [styles.title2,{ marginLeft:(withDevices - 40 - width)/2 }] : styles.title}
        >{props.title}</Text>                
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%', height: 50 },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    width: '100%',
    height: 50,
  },
  background2: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // flex: 1,
    width: '100%',
    height: 50,
  },
  touch_click: {
    marginLeft: '1.5%',
    // flex: 1,
    width: 50,
    height: 50,
    marginTop: '4%',
  },
  image_back: {
    // flex: 1,
    width: 30,
  },
  title: {
    // marginLeft: "35%",
    // marginBottom: "0%",
    color: Colors.title,
    fontSize: 18,
    fontWeight: '600',
  },
  title2:{
    marginTop: 7,
    color: Colors.title,
    fontSize: 18,
    fontWeight: '600',
  },
})

export default TitleBar
