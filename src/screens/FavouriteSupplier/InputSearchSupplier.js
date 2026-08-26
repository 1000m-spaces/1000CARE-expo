import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TextInput, StyleSheet } from 'react-native'
import { Icon } from '../../common'
import { getSearchDistributor, resetSearchDistributor } from '~/store/actions'
import _ from 'lodash'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import PressScale from '~/design-system/PressScale'

const InputSearchSupplier = (props) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  console.log('tia saoooooooo:',value == '')
  const searchTextChangeDelay = _.debounce((e)=>{
    console.log('searchTextChangeDelay', e)
    if(e) {
      dispatch(getSearchDistributor(e,80,1,1))
    } else {
      console.log('11111111111')
      dispatch(resetSearchDistributor())
    }
  }, 100) 

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm NCC"
        onChangeText={(text) => {
          setValue(text)
          searchTextChangeDelay(text)
        }}
        value={value}
      />
      <Icon
        style={styles.icon}
        type="feather"
        name={'search'}
        color={'#8C8C8C'}
        size={20}
      />
      <PressScale
        onPress={() => {
          searchTextChangeDelay('')
          setValue('')
        }}
        style={styles.iconCancel}
      >
        <Icon
          type="material"
          name={'cancel'}
          size={20}
          color={'#8C8C8C'}
        />
      </PressScale>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: s(12),
    backgroundColor: brandColors.surface,
  },
  input: {
    width: '100%',
    height: s(48),
    backgroundColor: brandColors.background,
    paddingLeft: s(42),
    borderRadius: s(16),
    color: brandColors.textDark,
    paddingRight: s(48),
    borderWidth: 1,
    borderColor: brandColors.border,
    fontSize: fs(14),
    fontWeight: '600',
  },
  icon: {
    width: s(24),
    height: s(24),
    position: 'absolute',
    left: s(25),
    top: s(24),
  },
  iconCancel: {
    width: s(30),
    height: s(30),
    position: 'absolute',
    right: s(18),
    top: s(21),
  },
})

export default InputSearchSupplier
