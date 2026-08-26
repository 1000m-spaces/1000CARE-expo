import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import { Icon } from '../../common'
import PressScale from '~/design-system/PressScale'

const InputSearch = (props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(props?.textSearch)
  }, [props?.textSearch])

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.iconWrapper}>
          <Icon
            type="feather"
            name={'search'}
            color={'#0B7B8A'}
            size={18}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Bạn đang tìm sản phẩm gì?"
          placeholderTextColor="#A0AEC0"
          onChangeText={(text) => {
            props.onChangeText(text)
            setValue(text)
          }}
          value={value}
          ref={props?.ref_input}
          autoFocus={true}
        />
        {value.length > 0 && (
          <PressScale
            onPress={() => {
              props.onChangeText('')
              setValue('')
            }}
            style={styles.clearButton}
          >
            <Icon
              type="ionicon"
              name={'close-circle'}
              color="#CBD5E0"
              size={20}
            />
          </PressScale>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconWrapper: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#2D3748',
    fontWeight: 'normal',
    paddingRight: 10,
  },
  clearButton: {
    padding: 5,
  },
})

export default InputSearch
