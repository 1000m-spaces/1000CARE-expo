import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, SafeAreaView, FlatList } from 'react-native'
import PressScale from '~/design-system/PressScale'
import Colors from '~/common/Colors/Colors'
import { requestTopup, resetConfirmTopup, resetReqTopup, getBalance } from '~/store/actions'
import { getReqTopupErr, getReqTopupStatus, getConfirmTopupStatus, getUserId } from '~/store/selector'
import Status from '~/common/Status/Status'
import Header from '~/common/Header/index'
import { NAVIGATION_CONFIRM, NAVIGATION_PROMOTION_DETAIL } from '~/navigation/routes'
import DialogInfo from '~/common/DialogInfo/index'
import TopupItem from './TopupItem/index'
import { back } from '~/assets/constants'
import { Button, Image, Text, TextInput } from '~/common/index'
import { clearNumberFormat, formatMoney } from '~/utils/format'
import strings from '~/i18n'
import { getCampaignDetail } from '~/store/campaigns/campaignSelectors'
import { requestGetCampaignTopupByDistributorId } from '~/store/campaigns/campaignActions'
import styles from './styles'
import { close } from '~/assets/constants'

const TopupScreen = (props) => {
  const dispatch = useDispatch()
  const { distributor, bankInfo, goBack } = props.route.params
  const currentCampaign = useSelector(state => getCampaignDetail(state))

  const [seletedItem, setSeletedItem] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [customAmount, setCustomAmount] = useState(false)
  const [amount, setAmount] = useState(false)
  const [isErrorDialog, setIsErrorDialog] = useState(false)

  const topupStatus = useSelector(state => getReqTopupStatus(state))
  const confirmStatus = useSelector(state => getConfirmTopupStatus(state))
  const userId = useSelector(state => getUserId(state))
  const reqTopUpErr = useSelector(state => getReqTopupErr(state))
  const [message, setMessage] = useState('')

  useEffect(() => {
    // clean status when component unmount
    return () => {
      dispatch(resetConfirmTopup())
      dispatch(resetReqTopup())
      dispatch(getBalance(userId))
    }
  }, [])

  useEffect(() => {
    if (topupStatus === Status.SUCCESS) {
      props.navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'TOPUP',
      })
      dispatch(resetReqTopup())
      setShowDialog(false)
      setIsErrorDialog(false)
      setCustomAmount(false)
    } else if (topupStatus === Status.LOADING) {
      setIsErrorDialog(false)
      setCustomAmount(false)
      setShowDialog(true)
    } else if (topupStatus === Status.ERROR) {
      setMessage(reqTopUpErr)
      setCustomAmount(false)
      setIsErrorDialog(true)
    } else {
      setShowDialog(false)
    }
  }, [topupStatus])

  useEffect(() => {
    if (confirmStatus === Status.SUCCESS) {
      props.navigation.goBack()
      if (goBack) {
        goBack()
      }
    }
  }, [confirmStatus])

  useEffect(() => {
    dispatch(requestGetCampaignTopupByDistributorId(distributor?.id))
  }, [distributor])

  const onPress = (item) => {
    if (item.id === 'custom') {
      setCustomAmount(true)
      setShowDialog(true)
    } else {
      setSeletedItem(item)
    }
  }

  const onTopup = () => {
    if (distributor && seletedItem && seletedItem.amount > 0) {
      setIsErrorDialog(false)
      setShowDialog(true)
      const am = parseInt(seletedItem.amount, 10)
      dispatch(requestTopup(distributor.id, am, bankInfo ? bankInfo.paymentCode : 'MBW'))
    } else {
      setMessage('Vui lòng chọn số tiền cần nạp')
      setIsErrorDialog(true)
      setShowDialog(true)
    }
  }

  const reset = () => {
    dispatch(resetReqTopup())
  }

  const getPoint = (amount) => {
    let point = 0
    const topUpMeta = currentCampaign?.top_up_meta?.items || []
    if (topUpMeta?.length > 0) {
      for (let idx = topUpMeta?.length - 1; idx >= 0; idx--) {
        if (amount >= topUpMeta[idx].amount_limit) {
          let pointTmp = amount * topUpMeta[idx]?.promo_rate / 100
          if (pointTmp > topUpMeta[idx]?.promo_limit) {
            pointTmp = topUpMeta[idx]?.promo_limit
          }
          if (pointTmp > point) {
            point = pointTmp
          }
        }
      }
    }
    return point
  }

  const getData = () => {
    const data = []
    for (let i = 1; i <= 80; i++) {
      const amount = i * 1000000
      if (i == 1 || i == 2 || i == 5 || i == 8 || i == 10 || i == 15 || i == 20 || i == 30 || i == 40 || i == 50 || i == 80) {
        data.push({
          amount,
          point: getPoint(amount),
        })
      }
    }
    // data.push({
    //   id: 'custom',
    //   amount: 'Số khác',
    // })
    return data
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          title={'Nạp điểm mua hàng'}
          iconLeft={back}
          leftAction={() => props.navigation.goBack()}
        />
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>TOPUP CENTER</Text>
          <Text style={styles.heroTitle}>Nạp điểm mua hàng</Text>
          <Text style={styles.heroSubtitle}>Chọn mệnh giá phù hợp và xem điểm thưởng trước khi xác nhận.</Text>
        </View>
        <View style={styles.viewMoney}>
          <FlatList
            style={{ flex: 1 }}
            data={getData()}
            numColumns={2}
            ListHeaderComponent={() => {
              return (
                <>
                  {
                    bankInfo && (
                      <>
                        <View
                          style={styles.bankInfoContainer}
                        >
                          <Text
                            style={styles.bankTitle}
                          >
                            {bankInfo.title}
                          </Text>
                          <Text
                            style={styles.bankBalance}
                          >
                            {formatMoney(bankInfo.balance, { unit: 'VNĐ' })}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 6,
                            backgroundColor: Colors.backgroundColor,
                          }}
                        />
                      </>
                    )
                  }
                  <Text
                    style={styles.title}
                  >
                    Chọn giá trị nạp
                  </Text>
                </>
              )
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TopupItem
                  data={item}
                  seleted={item?.amount === seletedItem?.amount}
                  onClick={onPress}
                />
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={styles.bottomContainer}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.totalText}>{'Số điểm mua hàng nạp'}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{formatMoney(seletedItem?.amount || 0, { unit: strings.currency.unit })}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.totalText}>{'Tặng điểm tích lũy'}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.point}>{formatMoney(seletedItem?.point || 0, { unit: 'điểm' })}</Text>
            </View>
          </View>
          <PressScale
            style={styles.priceContainer}
            onPress={() => {
              if (currentCampaign !== null && currentCampaign !== undefined) {
                props.navigation.navigate(NAVIGATION_PROMOTION_DETAIL, {
                  id_campaign: currentCampaign?.id,
                })
              }
            }}
          >
            <Text
              style={styles.messageCampaign}
            >
              {currentCampaign !== null && currentCampaign !== undefined ? `* Đang áp dụng chương trình khuyến mãi ${currentCampaign?.name}` : '* Hiện không áp dụng chương trình khuyến mãi nạp tiền nào.'}
              {
                currentCampaign !== null && currentCampaign !== undefined && (
                  <Text
                    style={styles.moreDetail}
                  >
                    {' Xem chi tiết'}
                  </Text>
                )
              }
            </Text>
          </PressScale>
          <Button
            styleView={styles.nextStepBtnContainer}
            styleButton={styles.nextStepBtn}
            styleText={styles.buyBtnText}
            onPressEvent={() => onTopup()}
            text={'Nạp điểm mua hàng'}
          />
        </View>
        <DialogInfo
          isOpen={showDialog}
          isError={isErrorDialog}
          isOrder={false}
          isLoading={true}
          custom={customAmount}
          message={message}
          closeModal={() => {
            setShowDialog(false)
            reset()
          }}
        >
          <View
            style={styles.dialogContainer}
          >
            <PressScale
              style={styles.closeBtnContainer}
              onPress={() => {
                setShowDialog(false)
                reset()
              }}
            >
              <Image
                style={styles.closeBtn}
                resizeMode={'contain'}
                source={close}
              />
            </PressScale>
            <TextInput
              containerStyle={styles.inputAmountContainer}
              labelStyle={{
                color: Colors.textColor1,
              }}
              value={amount}
              keyboardType='numeric'
              onChangeText={(value) => {
                setAmount(formatMoney(clearNumberFormat(value), { unit: '' }).trim())
              }}
              label={'Số tiền'}
              underlineColorAndroid='transparent'
            />
            <View
              style={styles.buttonInputContainer}
            >
              <Button
                styleView={{
                  marginTop: 12,
                }}
                styleButton={styles.inputAmountBtn}
                onPressEvent={() => {
                  setShowDialog(false)
                  setSeletedItem({
                    amount: clearNumberFormat(amount),
                    point: getPoint(clearNumberFormat(amount)),
                  })
                  setAmount(0)
                }}
                text={'Nhập'}
              />
            </View>
          </View>
        </DialogInfo>
      </View>
    </SafeAreaView>
  )
}

export default TopupScreen
