import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import PressScale from '~/design-system/PressScale'
import { Image } from '~/common/index'
import ChevronLeft from '~/assets/configNeoMed/Wallet/ChevronLeft.png'
import Money from '~/assets/configNeoMed/Wallet/Money.png'
import iconHistory from '~/assets/configNeoMed/Wallet/history.png'
import iconCart from '~/assets/configNeoMed/Wallet/cart.png'
import iconLink from '~/assets/configNeoMed/Wallet/link.png'
import OrderItem from './OrderItem'
import { getListOrders } from '~/store/orders/OrderSelectors'

import strings from '~/i18n'
import styles from './styles'
import { getInfoWallet, getOrders, getWallet, requestGetLoanInfo, resetOrder } from '~/store/actions'
import { getInfoAccount, getInfoAccountStatus, getLoanInfo, getPaymentAccount, getWalletStatus } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import { NAVIGATION_BANK_LINKS, NAVIGATION_CREATE_LOAN, NAVIGATION_LOAN_REPAYMENT, NAVIGATION_PAYMENT_BY_BANK_SCREEN, NAVIGATION_WALLET } from '~/navigation/routes'
import DialogInfo from '~/common/DialogInfo/index'
import { showToast } from '~/utils/toast'
import { formatMoney } from '~/utils/format'
import Status from '~/common/Status/Status'
import Header from '~/common/Header/index'
import { brandColors, brandGradients } from '~/design-system/tokens'
import BackgroundWash from '~/design-system/BackgroundWash'

// Màn "Tài khoản ngân hàng" viết lại theo spec: card ví gradient teal + card
// hạn mức thấu chi trắng (2 card này vẫn giữ được bấm chọn để đổi phương
// thức thanh toán — logic cũ), lưới 5 nút truy cập nhanh, danh sách đơn
// hàng chờ thanh toán dạng checklist, nút CTA gradient cố định dưới cùng.
const BankAccount = props => {
  const dispatch = useDispatch()
  const [checkBox, setCheckBox] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [isErrorDialog, setIsErrorDialog] = useState(false)
  const [listPaidOrders, setListPaidOrders] = useState([])
  const [hiddenMoney, setHiddenMoney] = useState(true)

  const [accountActive, setAccountActive] = useState(false)
  const infoAccount = useSelector(state => getInfoAccount(state))
  const infoAccountStatus = useSelector(state => getInfoAccountStatus(state))
  const listOrders = useSelector((state) => getListOrders(state))
  const paymentAccount = useSelector(state => getPaymentAccount(state))
  const walletStatus = useSelector(state => getWalletStatus(state))

  const loanInfo = useSelector(state => getLoanInfo(state))

  const numberAccount = (account) => {
    if (typeof account === 'string' && account.length > 0) {
      const length = account.length
      const number = account.slice(length - 3, length)
      const format = '*'.repeat(Math.max(0, length - 3)) + number
      return format.toString().replace(/(\*)(?=(.{4})+(?!.))/g, '$1 ')
    }
    return ''
  }

  useEffect(() => {
    if (infoAccountStatus === Status.LOADING) {
      setIsErrorDialog(false)
      setShowDialog(true)
    } else if (infoAccountStatus === Status.ERROR) {
      setIsErrorDialog(true)
    } else if (infoAccountStatus === Status.SUCCESS) {
      setShowDialog(false)
      if (!infoAccount.mobile) {
        props.navigation.navigate(NAVIGATION_BANK_LINKS, {
          goHome: true,
        })
      }
    } else {
      setShowDialog(false)
    }
  }, [infoAccountStatus])

  useEffect(() => {
    if (walletStatus === Status.LOADING) {
      // setShowDialog(true)
    } else if (walletStatus === Status.ERROR) {
      setShowDialog(false)
      props.navigation.navigate(NAVIGATION_BANK_LINKS, {
        goHome: true,
      })
    } else if (walletStatus === Status.SUCCESS) {
      setShowDialog(false)
      if (!paymentAccount || paymentAccount.length === 0) {
        props.navigation.navigate(NAVIGATION_BANK_LINKS, {
          goHome: true,
        })
      } else {
        dispatch(getInfoWallet())
      }
    }
  }, [walletStatus])

  useEffect(() => {
    dispatch(getWallet(1, 500))
    dispatch(getOrders(20, false, -1, 'COD', 25))
    dispatch(requestGetLoanInfo())
    return () => {
      dispatch(resetOrder())
    }
  }, [])

  const chooseAllOrder = () => {
    setCheckBox(!checkBox)
    if (checkBox) {
      setListPaidOrders([])
    } else {
      setListPaidOrders(listOrders)
    }
  }

  const onAddOrder = (order) => {
    const list = [...listPaidOrders]
    if (!list.find(o => o.order_id === order.order_id)) {
      list.push(order)
      setListPaidOrders(list)
    }
  }

  const onRemoveOrder = (order) => {
    const list = listPaidOrders.filter(o => order.order_id !== o.order_id)
    setListPaidOrders(list)
    setCheckBox(false)
  }

  const onReload = () => {
    dispatch(getInfoWallet())
    setListPaidOrders([])
    dispatch(getOrders(20, false, -1, 'COD', 25))
    dispatch(requestGetLoanInfo())
  }

  const overdraftTotal = (Number(loanInfo?.Info?.limitAmount) || 0) + (Number(loanInfo?.Info?.loanAmount) || 0)

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        title={strings.bankAccount.title}
        iconLeft={ChevronLeft}
        leftAction={() => props.navigation.goBack()}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={brandGradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.walletCard, !accountActive && styles.cardSelected]}
        >
          <PressScale style={styles.walletCardInner} onPress={() => setAccountActive(false)}>
            <Text style={styles.walletEyebrow} numberOfLines={1}>
              {infoAccount.customerName ? `Ví · ${infoAccount.customerName}` : strings.bankAccount.ewalletTitle}
            </Text>
            <View style={styles.walletBalanceRow}>
              <Text style={styles.walletBalance}>
                {hiddenMoney ? '********' : formatMoney(infoAccount.balanceWallet ? infoAccount.balanceWallet : 0, { unit: '' })}
                <Text style={styles.walletUnit}> đ</Text>
              </Text>
              <PressScale onPress={() => setHiddenMoney(!hiddenMoney)} style={styles.eyeButton}>
                <Text style={styles.eyeText}>{hiddenMoney ? '👁' : '🙈'}</Text>
              </PressScale>
            </View>
            <Text style={styles.walletAccount}>
              Số TK: {numberAccount(infoAccount.accountNumber ? infoAccount.accountNumber : '')}
            </Text>
          </PressScale>
        </LinearGradient>

        <PressScale
          style={[styles.overdraftCard, accountActive && styles.cardSelected]}
          onPress={() => {
            if (loanInfo?.Status === 'loan.link') {
              setAccountActive(true)
            } else {
              showToast('Bạn chưa liên kết tài khoản thấu chi')
            }
          }}
        >
          <Text style={styles.overdraftLabel}>Hạn mức thấu chi còn lại</Text>
          <Text style={styles.overdraftValue}>
            {formatMoney(overdraftTotal, { unit: '' })}
            <Text style={styles.overdraftUnit}> đ</Text>
          </Text>
        </PressScale>

        <View style={styles.actionGrid}>
          <ActionItem
            icon={iconHistory}
            label={strings.bankAccount.transactionHistory}
          />
          <ActionItem
            icon={iconCart}
            label={strings.bankAccount.topupNeo}
            onPress={() => props.navigation.navigate(NAVIGATION_WALLET)}
          />
          <ActionItem
            icon={Money}
            label={!accountActive ? strings.bankAccount.createLoan : 'Truy vấn và trả nợ'}
            onPress={() => {
              if (!accountActive) {
                props.navigation.navigate(NAVIGATION_CREATE_LOAN)
              } else {
                props.navigation.navigate(NAVIGATION_LOAN_REPAYMENT, {
                  onGoBack: () => {
                    onReload()
                  },
                })
              }
            }}
          />
          <ActionItem
            icon={Money}
            label={strings.bankAccount.topupEWallet}
          />
          <ActionItem
            icon={iconLink}
            label={strings.bankAccount.bankLink}
            onPress={() => props.navigation.navigate(NAVIGATION_BANK_LINKS, {
              goBack: () => {
                onReload()
              },
            })}
          />
        </View>

        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>{strings.bankAccount.listOrders}</Text>
          <PressScale onPress={() => chooseAllOrder()} style={styles.selectAllRow}>
            <View style={[styles.checkbox, checkBox && styles.checkboxChecked]}>
              {checkBox && <Text style={styles.checkboxMark}>✓</Text>}
            </View>
            <Text style={styles.selectAllText}>
              {checkBox ? strings.bankAccount.unChooseAll : strings.bankAccount.chooseAll}
            </Text>
          </PressScale>
        </View>

        <FlatList
          scrollEnabled={false}
          data={listOrders}
          renderItem={({ item }) => (
            <OrderItem
              order={item}
              textMethod={strings.bankAccount.orderCode}
              checkBoxAll={checkBox}
              onAddOrder={(order) => onAddOrder(order)}
              onRemoveOrder={(order) => onRemoveOrder(order)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      <View style={styles.ctaWrap}>
        <PressScale
          style={styles.ctaButton}
          onPress={() => {
            if (listPaidOrders && listPaidOrders.length > 0) {
              props.navigation.navigate(NAVIGATION_PAYMENT_BY_BANK_SCREEN, {
                listOrders: listPaidOrders,
                paymentCode: accountActive ? 'MBL' : 'MBW',
                maxAmount: !accountActive ? infoAccount.balanceWallet : loanInfo?.Info?.limitAmount,
                onGoBack: () => {
                  onReload()
                },
              })
            } else {
              showToast('Chọn đơn hàng cần thanh toán')
            }
          }}
        >
          <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>{strings.bankAccount.paid}</Text>
          </LinearGradient>
        </PressScale>
      </View>

      <DialogInfo
        isOpen={showDialog}
        isError={isErrorDialog}
        isOrder={false}
        isLoading={true}
        message={'Có lỗi xảy ra.\nVui lòng liên hệ CSKH.'}
        closeModal={() => {
          setShowDialog(false)
        }}
      />
    </SafeAreaView>
  )
}

const ActionItem = ({ icon, label, onPress }) => (
  <PressScale style={styles.actionItem} onPress={onPress}>
    <View style={styles.actionIconWrap}>
      <Image source={icon} style={styles.actionIcon} tintColor={brandColors.tealPrimary} resizeMode="contain" />
    </View>
    <Text style={styles.actionLabel} numberOfLines={2}>{label}</Text>
  </PressScale>
)

export default BankAccount
