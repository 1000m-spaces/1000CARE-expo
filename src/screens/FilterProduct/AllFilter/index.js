import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { back } from '~/assets/constants'
import _ from 'lodash'
import Header from '~/common/Header/index'
import Group from '../Group'
import InputSearch from './InputSearch'
import { Button, Text } from '~/common/index'
import styles from './styles'
import AppBackground from '~/design-system/AppBackground'
import { brandColors } from '~/design-system/tokens'

const AllFilter = ({ navigation, route }) => {
  const { clickItem, data, title = 'Nhà cung cấp', subTitle } = route.params
  const [listData, setListData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState({
    idx: -1, 
    item: null,
  })

  const ref_input = useRef()

  useEffect(() => {
    if (data) {
      console.log(data)
      setListData([...data])
    }
  }, [data])

  useEffect(() => {
    if (data) {
      if (!searchQuery || searchQuery ==='') {
        setListData([...data])
      } else {
        setListData([...data].filter((d) => 
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         d.nick_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         d.name_en?.toLowerCase().includes(searchQuery.toLowerCase())))
      }
    }
  }, [searchQuery])

  const searchTextChangeDelay = _.debounce((e)=>{
    console.log('searchTextChangeDelay', e)
    setSearchQuery(e)
  }, 10)

  return (
    <AppBackground>
      <Header
        leftAction={() => navigation.pop()}
        iconLeft={back}
        title={'Tất cả ' + title}
        navigation={navigation}
        cart={false}
      />
      <InputSearch
        ref_input={ref_input}
        onChangeText={searchTextChangeDelay}
        textSearch={searchQuery}
        placeholder={'Nhập tên ' + title}
      />
      <View style={styles.actionBar}>
        <Text
          style={styles.subTitle}
        >{subTitle}</Text>
        <Button
          text={'Áp dụng'}
          styleButton={{ 
            borderRadius: 16,
            paddingVertical: 8,
            backgroundColor: brandColors.tealPrimary,
          }}
          styleText={{ 
            fontSize: 14,
            fontWeight:'600',
            color: brandColors.surface,
          }}
          styleView={{
            paddingHorizontal: 0,
          }}
          onPressEvent={() => {
            if (clickItem) {
              console.log('selectedItem', selectedItem)
              clickItem(selectedItem.idx, selectedItem.item)
            }
            navigation.pop()
          }}
        />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Group
          data={listData || []}
          showAll={true}
          isSelect={(idx, item) => {
            return selectedItem?.item === item
          }}
          clickItem={(idx, item) => {
            setSelectedItem({
              idx: data.findIndex((d) => d === item), 
              item,
            })
          }}
        />
      </ScrollView>
    </AppBackground>
  )
  
}

export default AllFilter
