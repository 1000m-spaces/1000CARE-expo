import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Header from '~/common/Header/index'
import PressScale from '~/design-system/PressScale'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandGradients, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import LoanInfo from './LoanInfo/index'
import LoanStatus from './LoanStatus/index'

const PreCloseLoanSuccess = ({ navigation, route }) => {
  const paidAmount = route?.params?.paidAmount
  const loanId = route?.params?.loanId
  const accountId = route?.params?.accountId

  const goHomeScreen = () => {
    navigation.pop()
  }

  return(
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        showLeft={false}
        title={'Trả nợ thành công'}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.inforContainer}>
          <LoanStatus
            paidAmount={paidAmount}
          />
        </View>
        <View style={styles.inforContainer}>
          <LoanInfo
            loanId={loanId}
            accountId={accountId}
          />
        </View>
      </ScrollView>

      <View style={styles.containerButton}>
        <PressScale style={styles.ctaButton} onPress={() => goHomeScreen()}>
          <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Đóng</Text>
          </LinearGradient>
        </PressScale>
      </View>
    </SafeAreaView>
  )
}
export default PreCloseLoanSuccess

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  inforContainer: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    marginHorizontal: s(16),
    marginTop: s(12),
    padding: s(18),
    ...brandShadow.soft,
  },
  containerButton: {
    justifyContent: 'flex-end',
    paddingHorizontal: s(16),
    paddingVertical: s(16),
  },
  ctaButton: {
    borderRadius: s(16),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  ctaGradient: {
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
})
