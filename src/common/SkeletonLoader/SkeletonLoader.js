import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { s } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'

const { width } = Dimensions.get('window')
const cardWidth = Math.round((width - s(44)) / 2)

const Skeleton = ({ children }) => (
  <SkeletonPlaceholder backgroundColor="#EAF2F3" highlightColor="#F8FFFF" speed={1200}>
    {children}
  </SkeletonPlaceholder>
)

const HeaderBlock = () => (
  <View style={styles.header}>
    <SkeletonPlaceholder.Item width={s(42)} height={s(42)} borderRadius={s(21)} />
    <SkeletonPlaceholder.Item width={s(170)} height={s(24)} borderRadius={s(8)} />
    <SkeletonPlaceholder.Item width={s(42)} height={s(42)} borderRadius={s(21)} />
  </View>
)

const HeroBlock = () => (
  <View style={styles.hero}>
    <SkeletonPlaceholder.Item width={s(92)} height={s(12)} borderRadius={s(6)} />
    <SkeletonPlaceholder.Item width={s(230)} height={s(28)} borderRadius={s(9)} marginTop={s(10)} />
    <SkeletonPlaceholder.Item width={width - s(96)} height={s(16)} borderRadius={s(8)} marginTop={s(10)} />
  </View>
)

const ListRows = ({ count = 5 }) => (
  <View style={styles.list}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonPlaceholder.Item key={index} width={width - s(32)} height={s(104)} borderRadius={s(22)} marginBottom={s(12)} />
    ))}
  </View>
)

const GridRows = ({ count = 4 }) => (
  <View style={styles.grid}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonPlaceholder.Item key={index} width={cardWidth} height={s(236)} borderRadius={s(20)} marginRight={index % 2 === 0 ? s(12) : 0} marginBottom={s(12)} />
    ))}
  </View>
)

const FormRows = ({ count = 4 }) => (
  <View style={styles.form}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonPlaceholder.Item key={index} marginBottom={s(14)}>
        <SkeletonPlaceholder.Item width={s(96)} height={s(14)} borderRadius={s(7)} marginBottom={s(8)} />
        <SkeletonPlaceholder.Item width={width - s(32)} height={s(56)} borderRadius={s(24)} />
      </SkeletonPlaceholder.Item>
    ))}
  </View>
)

const CheckoutRows = () => (
  <View style={styles.checkout}>
    <SkeletonPlaceholder.Item width={width - s(32)} height={s(142)} borderRadius={s(28)} />
    <SkeletonPlaceholder.Item width={width - s(32)} height={s(118)} borderRadius={s(22)} marginTop={s(14)} />
    <SkeletonPlaceholder.Item width={width - s(32)} height={s(118)} borderRadius={s(22)} marginTop={s(12)} />
    <SkeletonPlaceholder.Item width={width} height={s(132)} borderRadius={s(0)} marginTop={s(20)} />
  </View>
)

const Content = ({ variant }) => {
  if (variant === 'grid') return <GridRows />
  if (variant === 'form') return <FormRows />
  if (variant === 'checkout') return <CheckoutRows />
  if (variant === 'list') return <ListRows />

  return (
    <>
      <HeroBlock />
      <GridRows />
      <ListRows count={3} />
    </>
  )
}

const SkeletonLoader = ({ variant = 'screen', style, withHeader = true }) => (
  <View pointerEvents="none" style={[styles.container, style]}>
    <Skeleton>
      {withHeader ? <HeaderBlock /> : null}
      <Content variant={variant} />
    </Skeleton>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
    paddingTop: s(8),
  },
  header: {
    height: s(64),
    marginHorizontal: s(16),
    marginBottom: s(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hero: {
    marginHorizontal: s(16),
    marginBottom: s(14),
    borderRadius: s(28),
    padding: s(20),
  },
  list: {
    paddingHorizontal: s(16),
    paddingBottom: s(24),
  },
  grid: {
    paddingHorizontal: s(16),
    paddingBottom: s(4),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  form: {
    paddingHorizontal: s(16),
    paddingTop: s(10),
  },
  checkout: {
    paddingHorizontal: s(16),
    paddingTop: s(10),
  },
})

export default SkeletonLoader
