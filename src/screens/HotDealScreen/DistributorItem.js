import React from 'react'

import { StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import PressScale from '~/design-system/PressScale'
import { brandColors } from '~/design-system/tokens'

const DistributorItem = ({ data, selected, changeDistrinutor }) => {
  return (
    <PressScale
      style={[styles.wrapper, { borderColor: selected ? brandColors.tealPrimary : '#FFF' }]}
      onPress={() => changeDistrinutor(data.id)}
    >
      <Image
        style={styles.image}
        source={data.urlImage}
      />
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 100,
    height: 66,
    backgroundColor: '#FFF',

    paddingHorizontal: 8,
    paddingVertical: 8,

    borderBottomWidth: 4,
    borderStyle: 'solid',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})

export default DistributorItem
