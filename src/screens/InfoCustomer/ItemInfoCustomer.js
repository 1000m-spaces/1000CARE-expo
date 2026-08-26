import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from '~/common/index'
import pictureEmpty from '~/assets/camera/pictureEmpty.png'
import dimens from '~/constants/dimens'
import PressScale from '~/design-system/PressScale'

const Item = ({ openCamera, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewLabel}>
        <Text>{data.item.name}{data.item.star && <Text style={{ color: 'red' }}>*</Text>}</Text>
      </View>
      <PressScale onPress={() => openCamera(data.index)} style={styles.button}>
        {data.item.url ? <Image style={styles.image} source={{ uri: data.item.url }} />
          : <Image style={styles.image} source={pictureEmpty} />}
      </PressScale>
    </View>
  )
}
export default Item

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  viewLabel: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  button: {
    padding: 5,
  },
  image: {
    width: dimens.common.WINDOW_WIDTH / 4 + 20,
    height: dimens.common.WINDOW_WIDTH / 4 + 20,
  },
})