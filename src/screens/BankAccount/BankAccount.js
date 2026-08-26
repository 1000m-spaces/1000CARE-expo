import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, FlatList, ScrollView, SafeAreaView } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { Image } from '~/common/index'
import bank from '~/assets/configNeoMed/Wallet/bank.png'
import backgroundWallet from '~/assets/configNeoMed/Wallet/backgroundWallet.png'
import ChevronLeft from '~/assets/configNeoMed/Wallet/ChevronLeft.png'
import Money from '~/assets/configNeoMed/Wallet/Money.png'
import iconHistory from '~/assets/configNeoMed/Wallet/history.png'
import iconCart from '~/assets/configNeoMed/Wallet/cart.png'
import iconLink from '~/assets/configNeoMed/Wallet/link.png'
import imageCircle from '~/assets/configNeoMed/Wallet/imageCircle.png'
import imageCircleSelected from '~/assets/configNeoMed/Wallet/imageCircleSelected.png'
import OrderItem from './OrderItem'
import { getListOrders } from '~/store/orders/OrderSelectors'

import strings from '~/i18n'
import styles from './styles'
import IconWallet from '~/common/IconWallet/IconWallet'
import { Button, CheckBox } from '~/common/index'
import { getInfoWallet, getOrders, getWallet, requestGetLoanInfo, resetOrder } from '~/store/actions'
import { getInfoAccount, getInfoAccountStatus, getLoanInfo, getPaymentAccount, getWalletStatus } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import { NAVIGATION_BANK_LINKS, NAVIGATION_CREATE_LOAN, NAVIGATION_LOAN_REPAYMENT, NAVIGATION_PAYMENT_BY_BANK_SCREEN, NAVIGATION_WALLET } from '~/navigation/routes'
import DialogInfo from '~/common/DialogInfo/index'
import { showToast } from '~/utils/toast'
import { formatMoney } from '~/utils/format'
import Status from '~/common/Status/Status'
import Colors from '~/common/Colors/Colors'
import Header from '~/common/Header/index'
import { Icon } from '~/common'
// import Clipboard from '@react-native-community/clipboard';

const BankAccount = props => {
  const dispatch = useDispatch()
  const [checkBox, setCheckBox] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [isErrorDialog, setIsErrorDialog] = useState(false)
  const [listPaidOrders, setListPaidOrders] = useState([])
  const [hiddenMoney, setHiddenMoney] = useState(true);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={strings.bankAccount.title}
        iconLeft={ChevronLeft}
        leftAction={() => props.navigation.goBack()}
        headerContainerStyles={{
          backgroundColor: Colors.systemColor2,
        }}
        titleStyles={{
          color: Colors.white,
        }}
      />
      <ImageBackground
        style={styles.imageInfo}
        source={bank}
      >
        <ImageBackground
          style={styles.imageInfo}
          source={backgroundWallet}
        >
          <Text style={styles.textMoney}>{infoAccount.customerName ? infoAccount.customerName : ''}</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.number}><Text style={{ fontSize: 16 }}>Tài Khoản: </Text>{infoAccount.accountNumber ? infoAccount.accountNumber : ''}     </Text>
            <PressScale onPress={() => alert(infoAccount.accountNumber)} style={styles.buttonCoppy}>
              <Text style={styles.textCoppy}>Sao chép</Text>
            </PressScale>
          </View>
        </ImageBackground>
      </ImageBackground>

      <View style={styles.viewSpace} />

      <View style={styles.containerProfile}>
        <PressScale
          onPress={() => setAccountActive(false)}
          style={[styles.buttonSelectAccount, { borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }]}
        >
          <View>
            <Text style={[styles.numberAccount, { color: accountActive ? '#CCCCCC' : '#8C8C8C' }]}>{strings.bankAccount.ewalletTitle}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.numberMoney, { color: accountActive ? '#CCCCCC' : Colors.priceColor, marginRight: 15 }]}>
                {hiddenMoney ? "******** " : formatMoney(infoAccount.balanceWallet ? infoAccount.balanceWallet : 0, { unit: '' })}<Text style={styles.textUnit}>{'VNĐ'}</Text>
              </Text>
              <PressScale onPress={() => setHiddenMoney(!hiddenMoney)}>
                <Icon
                  type="entypo"
                  name={!hiddenMoney ? "eye-with-line" : "eye"}
                  color={Colors.colorMain}
                  size={28}
                />
              </PressScale>
            </View>
          </View>
          {accountActive ?
            <View style={styles.viewSelectAccount}>
              <Image
                source={imageCircle}
                style={styles.imageCircle}
              />
            </View>
            : <View style={styles.viewSelectAccount}>
              <Image
                source={imageCircleSelected}
                style={styles.imageCircle}
              />
            </View>
          }
        </PressScale>
        <PressScale
          onPress={() => {
            if (loanInfo?.Status === 'loan.link') {
              setAccountActive(true)
            } else {
              showToast('Bạn chưa liên kết tài khoản thấu chi')
            }
          }}
          style={styles.buttonSelectAccount}
        >
          <View>
            <Text style={[styles.numberAccount, { color: !accountActive ? '#CCCCCC' : '#8C8C8C' }]}>Hạn mức thấu chi còn lại</Text>
            <Text style={[styles.numberMoney, { color: !accountActive ? '#CCCCCC' : Colors.priceColor }]}>{formatMoney((Number(loanInfo?.Info?.limitAmount) || 0) + (Number(loanInfo?.Info?.loanAmount) || 0), { unit: '' })}<Text style={styles.textUnit}>{'VNĐ'}</Text></Text>
          </View>
          {!accountActive ?
            <View style={styles.viewSelectAccount}>
              <Image
                source={imageCircle}
                style={styles.imageCircle}
              />
            </View>
            : <View style={styles.viewSelectAccount}>
              <Image
                source={imageCircleSelected}
                style={styles.imageCircle}
              />
            </View>
          }
        </PressScale>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.viewSelect}>
          <IconWallet
            image={iconHistory}
            textConten={strings.bankAccount.transactionHistory}
          />
          <IconWallet
            image={iconCart}
            textConten={strings.bankAccount.topupNeo}
            onPress={() => props.navigation.navigate(NAVIGATION_WALLET)}
          />
          <IconWallet
            image={Money}
            textConten={!accountActive ? strings.bankAccount.createLoan : 'Truy vấn và trả nợ'}
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
          <IconWallet
            image={Money}
            textConten={strings.bankAccount.topupEWallet}
          />
          <IconWallet
            image={iconLink}
            textConten={strings.bankAccount.bankLink}
            onPress={() => props.navigation.navigate(NAVIGATION_BANK_LINKS, {
              goBack: () => {
                onReload()
              },
            })}
          />

        </View>
        <Text style={styles.textHistory}>{strings.bankAccount.listOrders}</Text>
        <View style={styles.viewPay}>
          <CheckBox
            checked={checkBox}
            title={checkBox ? strings.bankAccount.unChooseAll : strings.bankAccount.chooseAll}
            onPress={() => chooseAllOrder()}
            titleStyle={styles.textCheckBox}
          />
          <Button
            text={strings.bankAccount.paid}
            onPressEvent={() => {
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
            styleButton={styles.buttonPay}
            styleText={styles.textPay}
            styleView={styles.viewButton}
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={listOrders}
          renderItem={({ item }) => {
            return (
              <OrderItem
                order={item}
                textMethod={strings.bankAccount.orderCode}
                checkBoxAll={checkBox}
                onAddOrder={(order) => onAddOrder(order)}
                onRemoveOrder={(order) => onRemoveOrder(order)}
              />
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
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
export default BankAccount