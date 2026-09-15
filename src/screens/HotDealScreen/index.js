import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'

import HotDealItem from './HotDealItem'
import { useDispatch, useSelector } from 'react-redux'
import { getListBanner, getBannerStatus, getAuthStore, getErrorGetAllListBanner, getListDistributorsHotDeal } from '~/store/selector'
import { resetBanners, getBanners, getDistributorsActive } from '~/store/actions'
import { LoadingView } from '~/common'
import Status from '~/common/Status/Status'
import { NAVIGATION_COMBO_PRODUCT_DETAIL, NAVIGATION_TOPUP_SCREEN, NAVIGATION_VOUCHER, NAVIGATION_PROMOTION_DETAIL } from '~/navigation/routes'
import strings from '~/i18n'
import ErrorView from '~/common/ErrorView/index'
import ItemDistributorTab from '~/common/ItemDistributorTab'
import { box_empty, check_info } from '~/assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext'
import AppBackground from '~/design-system/AppBackground'

const screenHeight = Dimensions.get('window').height
const headerHeight = 58
const distributorHeight = 0
const bottomTabHeight = 45
const HERO_MAX_HEIGHT = s(182)
const HERO_MIN_HEIGHT = s(58)
const HERO_SCROLL_DISTANCE = s(124)
const BANNER_PAGE_SIZE = 10

const HotDealScreen = ({ navigation, route }) => {
  const distributorId = route?.params?.distributorId
  const { handleScroll } = useTabBarVisibility()
  const scrollY = useRef(new Animated.Value(0)).current
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => getAuthStore(state))
  const [isLoading, setLoading] = useState(false)
  const [isRefreshing, setRefreshing] = useState(false)
  const [currentTabInfo, setCurrentTabInfo] = useState(null)
  const [bannerPage, setBannerPage] = useState(1)
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('')

  const listBannerByDistri = useSelector(state => getListBanner(state))
  const statusBannerByDistri = useSelector(state => getBannerStatus(state))
  const errorGetAllListBanner = useSelector(state => getErrorGetAllListBanner(state))
  const listDistributors = useSelector(state => getListDistributorsHotDeal(state))

  const keyExtractorDistri = useCallback((item) => {
    return item.id.toString()
  })

  const onClick = (banner) => {
    console.log('itemmmmmmmmmmmmmm:', banner)
    if (!isLoggedIn) {
      onShowMessage(strings.common.requireLogin)
      return
    }
    else if (banner.banner_type === 1) {
      navigation.navigate(NAVIGATION_COMBO_PRODUCT_DETAIL, {
        banner: banner,
        distributorId: currentTabInfo?.id,
      })
    }
    else if (banner.banner_type === 2) {
      navigation.navigate(NAVIGATION_TOPUP_SCREEN, { distributor: { id: currentTabInfo?.id } })
    }
    else if (banner.banner_type === 3) {
      navigation.navigate(NAVIGATION_VOUCHER)
    } else {
      navigation.navigate(NAVIGATION_PROMOTION_DETAIL, {
        id_campaign: banner.campaign.id,
      })
    }
  }
  const reset = useCallback(() => {
    dispatch(resetBanners())
  })
  const onRefresh = () => {
    if (!currentTabInfo?.id) return
    setBannerPage(1)
    setRefreshing(true)
    dispatch(getBanners(currentTabInfo?.id, BANNER_PAGE_SIZE, 1, false))
  }
  const loadMore = () => {
    if (!currentTabInfo?.id) return
    if (isLoading || isRefreshing || statusBannerByDistri === Status.LOADING) return
    if (!Array.isArray(listBannerByDistri) || listBannerByDistri.length < BANNER_PAGE_SIZE * bannerPage) return
    setBannerPage(bannerPage + 1)
    dispatch(getBanners(currentTabInfo?.id, BANNER_PAGE_SIZE, bannerPage + 1, true))
  }

  useEffect(() => {
    if (statusBannerByDistri === Status.LOADING) {
      if (!isRefreshing) {
        setLoading(true)
      }
    }
    if (statusBannerByDistri === Status.SUCCESS) {
      setLoading(false)
      setRefreshing(false)
    }
    if (statusBannerByDistri === Status.ERROR) {
      setLoading(false)
      setRefreshing(false)
    }
  }, [statusBannerByDistri])

  useEffect(() => {
    if (currentTabInfo) {
      setBannerPage(1)
      setRefreshing(false)
      dispatch(resetBanners())
      dispatch(getBanners(currentTabInfo?.id, BANNER_PAGE_SIZE, 1, false))
    }
  }, [currentTabInfo])

  useEffect(() => {
    dispatch(getDistributorsActive(1, 1, 0))
  }, [])

  const compare = () => {
    listDistributors.map((element, index) => {
      if (element.id == distributorId) {
        setCurrentTabInfo(listDistributors[index])
        return
      }
    })
  }
  useEffect(() => {
    if (listDistributors != null && listDistributors.length > 0 && !currentTabInfo) {
      if (distributorId) {
        compare()
      } else {
        setCurrentTabInfo(listDistributors[0])
      }
    }
  }, [listDistributors])

  const onTabPress = (item) => {
    setCurrentTabInfo(item)
  }

  const onShowMessage = (msg) => {
    setMessage(msg)
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 2000)
  }

  const heroHeight = scrollY.interpolate({
    inputRange: [0, HERO_SCROLL_DISTANCE],
    outputRange: [HERO_MAX_HEIGHT, HERO_MIN_HEIGHT],
    extrapolate: 'clamp',
  })
  const heroRadius = scrollY.interpolate({
    inputRange: [0, HERO_SCROLL_DISTANCE],
    outputRange: [s(28), s(20)],
    extrapolate: 'clamp',
  })
  const heroTitleSize = scrollY.interpolate({
    inputRange: [0, HERO_SCROLL_DISTANCE],
    outputRange: [fs(26), fs(15)],
    extrapolate: 'clamp',
  })
  const heroTitleLine = scrollY.interpolate({
    inputRange: [0, HERO_SCROLL_DISTANCE],
    outputRange: [fs(32), fs(20)],
    extrapolate: 'clamp',
  })
  const heroDetailOpacity = scrollY.interpolate({
    inputRange: [0, s(54), HERO_SCROLL_DISTANCE],
    outputRange: [1, 0.18, 0],
    extrapolate: 'clamp',
  })
  const heroTitleTop = scrollY.interpolate({
    inputRange: [0, HERO_SCROLL_DISTANCE],
    outputRange: [s(6), 0],
    extrapolate: 'clamp',
  })

  return (
    <AppBackground>
      <Animated.View style={[styles.dealHero, { height: heroHeight, borderRadius: heroRadius }]}>
        <Animated.Text style={[styles.heroEyebrow, { opacity: heroDetailOpacity }]}>PROMOTION HUB</Animated.Text>
        <Animated.Text
          style={[
            styles.heroTitle,
            {
              marginTop: heroTitleTop,
              fontSize: heroTitleSize,
              lineHeight: heroTitleLine,
            },
          ]}
          numberOfLines={1}
        >
          Ưu đãi mua sắm
        </Animated.Text>
        <Animated.Text style={[styles.heroSubtitle, { opacity: heroDetailOpacity }]} numberOfLines={2}>
          Chọn nhà phân phối để xem combo, voucher và chương trình nạp tiền đang mở.
        </Animated.Text>
      </Animated.View>
      <FlatList
        style={styles.listDistributors}
        contentContainerStyle={styles.distributors}
        data={listDistributors}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ItemDistributorTab
              onItemPress={onTabPress.bind(this, item)}
              selected={item.id === currentTabInfo?.id}
              showLabel
              selectedScale={1.08}
              data={item}
            />
          )
        }}
        keyExtractor={keyExtractorDistri}
      />
      <View style={styles.contentHotDeal}>
        <Animated.FlatList
          data={listBannerByDistri}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: false,
              listener: handleScroll,
            },
          )}
          scrollEventThrottle={16}
          ListHeaderComponent={() => {
            return (
              <>
                <Text style={styles.titleHotDeal}>Chiến dịch hiện có</Text>
                <Text style={styles.subTitleHotDeal}>
                  Vui lòng kiểm tra điều kiện áp dụng trước khi sử dụng ưu đãi.
                </Text>
              </>
            )
          }}
          ListEmptyComponent={() => (
            statusBannerByDistri !== Status.LOADING && (
              <View style={styles.emptyState}>
                <Image source={box_empty} style={styles.emptyImage} resizeMode="contain" />
                <Text style={styles.emptyTitle}>Nhà phân phối hiện chưa có ưu đãi mới.</Text>
                <Text style={styles.emptySubtitle}>Quay lại sau bạn nhé!</Text>
              </View>
            )
          )}
          renderItem={({ item }) => {
            return (
              <HotDealItem
                onClick={(banner_type) => onClick(banner_type)}
                data={{
                  ...item,
                  distributor: currentTabInfo,
                }}
              />
            )
          }}
          onRefresh={() => onRefresh()}
          refreshing={isRefreshing}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          keyExtractor={(item, index) => String(item?.id || item?.banner_id || item?.campaign?.id || index)}
        />
      </View>
      {isLoading && Array.isArray(listBannerByDistri) && listBannerByDistri.length > 0 && <LoadingView variant="grid" />}
      <ErrorView
        error={errorGetAllListBanner}
        isOpen={errorGetAllListBanner ? true : false}
        onClose={reset}
      />
      <ErrorView
        error={message}
        isOpen={openMessage}
        icon={check_info}
        onClose={() => setOpenMessage(false)}
      />
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  wrapDistributors: {
    width: '100%',
    backgroundColor: '#FFF',

    borderTopColor: '#F5F5F5',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  contentHotDeal: {
    width: '100%',
    height:
      screenHeight - headerHeight - distributorHeight - bottomTabHeight - 26,
    backgroundColor: 'transparent',

    marginTop: s(4),
    paddingHorizontal: s(16),
    paddingTop: s(8),
    flex: 1,
  },
  dealHero: {
    marginHorizontal: s(16),
    marginTop: s(10),
    marginBottom: s(12),
    borderRadius: s(28),
    paddingHorizontal: s(20),
    paddingVertical: s(14),
    backgroundColor: brandColors.tealPrimary,
    ...brandShadow.teal,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.6,
    color: 'rgba(255,255,255,0.68)',
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(26),
    lineHeight: fs(32),
    fontWeight: '600',
    color: brandColors.surface,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(13),
    lineHeight: fs(20),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.76)',
  },
  titleHotDeal: {
    fontSize: fs(18),
    color: brandColors.textDark,
    fontWeight: '600',

  },
  subTitleHotDeal: {
    marginTop: s(6),
    marginBottom: s(20),
    fontSize: fs(12),
    color: brandColors.muted,

    lineHeight: fs(20),
  },
  distributors: {
    minHeight: s(98),
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: s(16),
    paddingTop: s(8),
    paddingBottom: s(10),
  },
  listDistributors: {
    flexGrow: 0,
    backgroundColor: 'transparent',
  },
  emptyState: {
    minHeight: s(310),
    marginTop: s(18),
    marginHorizontal: s(4),
    borderRadius: s(28),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(24),
    paddingVertical: s(28),
    ...brandShadow.soft,
  },
  emptyImage: {
    width: s(118),
    height: s(118),
    marginBottom: s(14),
  },
  emptyTitle: {
    color: brandColors.textDark,
    fontSize: fs(15),
    lineHeight: fs(21),
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: s(6),
    color: brandColors.muted,
    fontSize: fs(13),
    lineHeight: fs(19),
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default HotDealScreen
