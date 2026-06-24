import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '~/common/Header/index';
import strings from '~/i18n';
import { back } from '~/assets/constants';

import styles from './styles';
import CheckoutItem from './CheckoutItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListItem,
  getPharmacyInfo,
  getRequestCheckoutStatus,
  getUserId,
} from '~/store/selector';
import BottomButon from '~/common/BottomButon/index';
import Status from '~/common/Status/Status';
import { addAddressRequest, checkout, getInfo } from '~/store/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DialogInfo from '~/common/DialogInfo/index';
import { NAVIGATION_CHECKOUT_RESULT_SCREEN, NAVIGATION_VIETQR_PAYMENT } from '~/navigation/routes';
import Address from '../Address/index';
import { brandColors } from '~/design-system/tokens';

const PromotionTypes = {
  3: 'range_prices',
  4: 'discount_order_meta', // Chiết khấu x% khi đơn hàng trên y đồng
  5: 'gift_order_meta', // Tặng quà A khi đơn hàng trên y đồng
  6: 'accumulation_order_meta', // Tích lũy % khi đơn hàng trên y đồng
  7: 'discount_buying_products_meta', // Mua m/n sản phẩm, chiết khấu x% (đơn hàng trên y đồng)
  8: 'gift_buying_products_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  9: 'combo_advance_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  10: 'gift_buying_products_meta',
};

const PaymentCheckoutScreen = props => {
  const cartData = useSelector(state => getListItem(state));
  const [openError, setOpenError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const checkoutStatus = useSelector(state => getRequestCheckoutStatus(state));
  const pharmacyInfo = useSelector(state => getPharmacyInfo(state));
  const userId = useSelector(state => getUserId(state));
  const errorMsg = useSelector(state => state.cart.errorMsg);
  const [error, setError] = useState(errorMsg);
  const [isRequest, setIsRequest] = useState(false);
  const [vietqrAppTransId, setVietqrAppTransId] = useState(null);
  const [needsVietqrPayment, setNeedsVietqrPayment] = useState(false);

  const dispatch = useDispatch();

  const getProducts = useCallback(
    cartData => {
      const data = cartData;
      if (!cartData || !cartData.items) {
        return [];
      }
      return data.items;
    },
    [cartData],
  );

  const productInCart = getProducts(cartData);

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    if (!isRequest) {
      return;
    }
    switch (checkoutStatus) {
      case Status.LOADING:
        break;
      case Status.SUCCESS:
        setShowLoading(false);
        setIsRequest(false);
        props.navigation.navigate(NAVIGATION_CHECKOUT_RESULT_SCREEN);
        break;
      case Status.ERROR:
        setIsRequest(false);
        setOpenError(true);
        break;
    }
  }, [checkoutStatus]);

  const checkValid = () => {
    let result = true;
    let hasVietQr = false;
    let vietQrDistributor = null;
    let vietQrAmount = 0;

    productInCart.forEach(itemDistributor => {
      itemDistributor?.items.forEach(itemPaymentMethob => {
        console.log('checkValid called', itemPaymentMethob);
        if (!itemPaymentMethob?.payment_method) {
          hasVietQr = true;
          vietQrDistributor = itemDistributor.distributor;
          vietQrAmount = itemPaymentMethob?.total || 0;
          result = false;
          return;
        }
        // Check if VietQR payment method is selected
        if (itemPaymentMethob?.payment_method?.code === 'VQR') {
          hasVietQr = true;
          vietQrDistributor = itemDistributor.distributor;
          vietQrAmount = itemPaymentMethob?.total || 0;
        }
      });
    });
    console.log('hasVietQr', hasVietQr);
    console.log('vietQrDistributor', vietQrDistributor);
    console.log('vietQrAmount', vietQrAmount);

    // Return both validation result and VietQR payment info
    const vietqrPaymentInfo = (hasVietQr && vietQrDistributor) ? {
      distributor_id: vietQrDistributor.id,
      order_amount: vietQrAmount,
    } : null;

    return { isValid: result, vietqrPaymentInfo };
  };

  const onCheckout = () => {
    const { isValid, vietqrPaymentInfo } = checkValid();

    if (isValid) {
      setOpenError(false);

      // If VietQR payment is selected, navigate to VietQR payment screen first
      if (vietqrPaymentInfo) {
        console.log('vietqrPaymentInfo', vietqrPaymentInfo);
        props.navigation.navigate(NAVIGATION_VIETQR_PAYMENT, {
          distributor_id: vietqrPaymentInfo.distributor_id,
          order_amount: vietqrPaymentInfo.order_amount,
          onPaymentSuccess: (appTransId) => {
            console.log('VietQR Payment Success, app_trans_id:', appTransId);
            setVietqrAppTransId(appTransId);
            // After VietQR payment success, proceed with checkout
            setIsRequest(true);
            dispatch(checkout(appTransId));
          },
          onPaymentCancel: () => {
            console.log('VietQR Payment Cancelled');
            setShowLoading(false);
          },
        });
      } else {
        // Normal checkout without VietQR
        setIsRequest(true);
        dispatch(checkout());
      }
    } else {
      setError(
        strings.cartDetail.paymentCheckoutScreen.choosePaymentMethodWarning
      );
      setOpenError(true);
    }
    setShowLoading(true);
  };

  const checkChooseGift = () => {
    let isChoosed = true;
    productInCart.forEach(p => {
      p.items?.forEach(item => {
        let totalGift = 0;
        item.promo_infos?.forEach(promo => {
          if (!promo.is_order_valid) {
            return;
          }
          const data = promo[PromotionTypes[promo?.campaign_type]];
          if (!data.is_gift_selection) {
            return;
          }
          data.items.forEach(i => {
            if (!i.is_order_valid) {
              return;
            }
            totalGift += i.gift_selection_limit;
          });
        });
        if (isChoosed) {
          let addedGift = 0;
          item.promo_products?.forEach(promo => {
            console.log('promo', promo);
            addedGift += promo?.product_ids?.length || 0;
          });
          console.log('addedGift', addedGift, totalGift);
          isChoosed = totalGift === addedGift;
        }
      });
    });
    return isChoosed;
  };

  const checkValidAddress = () => {
    const { province, district, ward } = cartData?.shipping_address;
    if (!province?.id || !district?.id || !ward?.id) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    // console.log('PAYMENT CHECKOUT SCREEN----- pharmacyInfo::', pharmacyInfo)
    if (!cartData.shipping_address) {
      dispatch(
        addAddressRequest({
          full_name: pharmacyInfo?.owner_full_name,
          country_id: 'vn',
          customer_id: userId,
          telephone: pharmacyInfo?.owner_phone,
          street: pharmacyInfo?.invoice_info?.address,
          province_id:
            pharmacyInfo?.invoice_info?.address_invoice?.province?.id,
          district_id:
            pharmacyInfo?.invoice_info?.address_invoice?.district?.id,
          ward_id: pharmacyInfo?.invoice_info?.address_invoice?.ward?.id,
          is_default: true,
        }),
      );
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: brandColors.background }}>
      <View style={styles.mainContainer}>
        <Header
          title={strings.cartDetail.paymentCheckoutScreen.title}
          leftAction={() => {
            dispatch(getInfo());
            props.navigation.pop();
          }}
          iconLeft={back}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          style={styles.listCheckoutContainer}>
          <FlatList
            data={productInCart}
            scrollEnabled={true}
            ListHeaderComponent={() => {
              return <Address navigation={props.navigation} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <FlatList
                  data={item.items}
                  scrollEnabled={true}
                  style={styles.mt12}
                  renderItem={({ item: item2, index: index2 }) => {
                    return (
                      <CheckoutItem
                        next={props.route.params.next}
                        navigation={props.navigation}
                        checkout={{
                          ...item2,
                          distributor: item.distributor,
                        }}
                        idx={index + index2 + 1}
                      />
                    );
                  }}
                  ItemSeparatorComponent={() => {
                    return <View style={styles.itemSeparator} />;
                  }}
                  keyExtractor={(_, idx) => {
                    return idx.toString();
                  }}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.itemSeparator} />;
            }}
            keyExtractor={(_, idx) => {
              return idx.toString();
            }}
          />
        </KeyboardAwareScrollView>
        <BottomButon
          label={strings.cartDetail.paymentCheckoutScreen.checkout}
          onPress={() => {
            if (checkValidAddress() && checkChooseGift()) {
              onCheckout();
            } else if (!checkValidAddress()) {
              setError('Vui lòng chọn địa chỉ nhận hàng');
              setOpenError(true);
              setShowLoading(true);
            } else {
              setError('Vui lòng chọn sản phẩm khuyến mãi');
              setOpenError(true);
              setShowLoading(true);
            }
          }}
        />
      </View>
      <DialogInfo
        isOpen={showLoading}
        isError={openError}
        isOrder={false}
        isLoading={true}
        message={error}
        closeModal={() => setShowLoading(false)}
      />
    </SafeAreaView>
  );
};

export default PaymentCheckoutScreen;
