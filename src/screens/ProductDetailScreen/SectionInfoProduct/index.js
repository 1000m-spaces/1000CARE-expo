import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Image } from '~/common/index'
import { LinearGradient } from 'expo-linear-gradient'
import { right_arrow } from '~/assets/constants'
import PressScale from '~/design-system/PressScale'

const SectionInfoProduct = ({ title, children, onPress }) => {
  const [showViewMore, setShowViewMore] = useState(false)

  const find_dimesions = (layout) => {
    const { height } = layout
    if (height > 250) {
      setShowViewMore(true)
    }
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={styles.content}
        onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}
      >
        {children}
      </View>
      {
        showViewMore ? 
          (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']}
              style={styles.viewMore}
            >
              <PressScale
                style={styles.flexViewMore}
                onPress={onPress}
              >
                <Text style={styles.textViewMore}>Xem tất cả</Text>
                <Image
                  source={right_arrow}
                  style={styles.iconViewMore}
                  tintColor='#4276FE'
                />
              </PressScale>
            </LinearGradient>
          ) : (<></>)
      }

    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 18,
    position: 'relative',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#595959',
  },
  content: {
    maxHeight: 260,
    marginTop: 12,
    overflow: 'hidden',
    paddingBottom: 36,
  },
  viewMore: {
    width: Dimensions.get('window').width,
    height: 80,
    paddingBottom: 18,

    position: 'absolute',
    bottom: 0,
    left: 0,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  flexViewMore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textViewMore: {
    textAlign: 'center',
    color: '#4276FE',
    fontWeight: '600',
  },
  iconViewMore: {
    width: 12,
    height: 12,
    marginLeft: 2,
  },
})

export default SectionInfoProduct