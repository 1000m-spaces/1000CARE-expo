import React, { useState } from 'react'
import { View } from 'react-native'
import _ from 'lodash'
import { Icon, Text } from '~/common/index'
import PressScale from '~/design-system/PressScale'

import styles from './styles'
import { NAVIGATION_ALL_FILTER } from '~/navigation/routes'
import { brandColors } from '~/design-system/tokens'
import GlassFilterChip from '~/design-system/GlassFilterChip'

const GroupItem = ({ index, item, clickItem, isSelect }) => {
  const selected = isSelect(index, item)
  return (
    <GlassFilterChip
      selected={selected}
      onPress={() => clickItem && clickItem(index, item)}
      style={styles.groupItemContrainer}
      contentStyle={styles.groupItemGlass}
    >
      <Text
        style={[styles.groupItem, selected ? styles.groupItemSelected : {}]}
        numberOfLines={2}
        ellipsizeMode='tail'
      >{item.nick_name || item.name}</Text>
      {selected && (
        <View style={styles.checkMark}>
          <Icon type="feather" name="check" color={brandColors.surface} size={12} />
        </View>
      )}
    </GlassFilterChip>
  )
}

const Group = ({
  title,
  subTitle,
  data,
  clickItem,
  isSelect,
  showAll = false,
  navigation,
}) => {
  const [fromIdx, setFromIdx] = useState(0)

  return (
    <View
      style={styles.groupContainer}
    >
      {
        title && (
          <Text
            style={styles.groupTitle}
          >{title}</Text>
        )
      }
      {
        subTitle && (
          <Text
            style={styles.groupSubTitle}
          >{subTitle}</Text>
        )
      }
      <View>
        {
          _.chunk(data.filter((_, idx) => showAll || idx >= fromIdx && idx < fromIdx + 10), 2).map((items, index) => {
            const firstIndex = showAll ? data.findIndex((d) => d === items[0]) : fromIdx + index * 2
            const secondIndex = showAll ? data.findIndex((d) => d === items[1]) : firstIndex + 1
            return (
              <View style={styles.groupListItemContainer} key={`${items[0]?.id || items[0]?.category_id || firstIndex}-${index}`}>
                <GroupItem
                  item={items[0]}
                  index={firstIndex}
                  clickItem={clickItem}
                  isSelect={isSelect}
                />
                {
                  items.length > 1 && (
                    <GroupItem
                      item={items[1]}
                      index={secondIndex}
                      clickItem={clickItem}
                      isSelect={isSelect}
                    />
                  )
                }
              </View>
            )
          })
        }
        {
          !showAll && data?.length > 10 && (
            <PressScale
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                navigation.navigate(NAVIGATION_ALL_FILTER, {
                  clickItem: (idx, item) => {
                    if (data.length > 10) {
                      setFromIdx(idx)
                    }
                    clickItem(idx, item)
                  },
                  data,
                  title: title,
                  subTitle: subTitle,
                })
              }}
            >
              <Text style={styles.showMore}>{'Xem thêm lựa chọn'}</Text>
            </PressScale>
          )
        }
      </View>
    </View>
  )
}

export default Group
