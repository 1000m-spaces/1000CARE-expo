import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { NAVIGATION_LIST_DISTRIBUTOR_TRADEMARK } from '~/navigation/routes'
import { getListDistributors } from '~/store/selector'
import Swiper from 'react-native-swiper'
import { DIMENS } from '~/constants/index'
import ItemDistributor from '~/common/ItemDistributor/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import PressScale from '~/design-system/PressScale'

const Distributors = ({ navigation, onItemPress }) => {
  const listDistributors = useSelector(state => getListDistributors(state))
  const hasDistributors = Array.isArray(listDistributors) && listDistributors.length > 0

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAccent} />
          <Text style={styles.headerTitle}>NHÀ CUNG CẤP</Text>
        </View>
        <PressScale
          style={styles.seeAllBtn}
          onPress={() => {
            navigation.navigate(NAVIGATION_LIST_DISTRIBUTOR_TRADEMARK, {
              type: 'distributor',
              onItemPress: (item) => onItemPress(item),
              title: 'Nhà cung cấp',
            })
          }}
        >
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </PressScale>
      </View>

      {hasDistributors ? (
        <Swiper
          showsButtons
          style={styles.swiper}
          showsPagination={false}
          autoplay={false}
          loadMinimal={true}
          loadMinimalSize={1}
          nextButton={<Text />}
          prevButton={<Text />}
        >
          {Array.from({ length: Math.ceil(listDistributors.length / itemsPerPage) }, (_, i) => i + 1).map((value, idx) => (
            <View key={`page_${idx}`} style={styles.swiperPage}>
              <View style={styles.row}>
                {listDistributors.filter((_, id) => (value - 1) * itemsPerPage <= id && id < (value - 1) * itemsPerPage + itemsPerRow).map((item, index) => (
                  <ItemDistributor
                    key={`dist_top_${item.id || item.Id || index}`}
                    onItemPress={() => onItemPress(item)}
                    data={item}
                    itemWidth={itemWidth}
                  />
                ))}
              </View>
              <View style={styles.row}>
                {listDistributors.filter((_, id) => (value - 1) * itemsPerPage + itemsPerRow <= id && id < value * itemsPerPage).map((item, index) => (
                  <ItemDistributor
                    key={`dist_bot_${item.id || item.Id || index}`}
                    onItemPress={() => onItemPress(item)}
                    data={item}
                    itemWidth={itemWidth}
                  />
                ))}
              </View>
            </View>
          ))}
        </Swiper>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Đang tải nhà cung cấp</Text>
          <Text style={styles.emptySubtitle}>Danh sách sẽ hiển thị sau khi dữ liệu sẵn sàng</Text>
        </View>
      )}
    </View>
  )
}

const itemsPerRow = 2
const itemsPerPage = 4
const pageHorizontalPadding = s(16)
const itemGap = s(14)
const itemWidth = Math.floor((DIMENS.common.WINDOW_WIDTH - pageHorizontalPadding * 2 - itemGap) / itemsPerRow)
const swiperHeight = 2 * (itemWidth * 0.92 + s(8)) + s(10)

const styles = StyleSheet.create({
  container: {
    marginBottom: s(8),
    paddingVertical: s(4),
  },
  swiper: {
    height: swiperHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(16),
    marginBottom: s(10),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  headerAccent: {
    width: s(4),
    height: s(18),
    backgroundColor: brandColors.tealPrimary,
    borderRadius: s(2),
  },
  headerTitle: {
    fontSize: fs(13),
    fontWeight: '600',
    color: brandColors.textDark,
    letterSpacing: 0.5,
    marginLeft: s(8),
  },
  seeAllBtn: {
    backgroundColor: 'rgba(255,255,255,0.54)',
    paddingHorizontal: s(12),
    paddingVertical: s(6),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: 'rgba(2, 158, 157,0.16)',
  },
  seeAllText: {
    color: brandColors.tealPrimary,
    fontSize: fs(12),
    fontWeight: '600',
  },
  swiperPage: {
    paddingHorizontal: pageHorizontalPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: itemGap,
  },
  emptyState: {
    minHeight: s(118),
    marginHorizontal: s(16),
    borderRadius: s(26),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(18),
    ...liquidGlass.shadow,
  },
  emptyTitle: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '600',
  },
  emptySubtitle: {
    marginTop: s(4),
    color: brandColors.muted,
    fontSize: fs(12),
    textAlign: 'center',
  },
})

export default Distributors
