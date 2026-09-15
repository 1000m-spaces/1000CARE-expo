import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../theme';
import {
  SplashScreen,
  LoginPhone,
  PhoneVerify,
  RegisterScreen,
  AccountPendingApproval,
  KycSubmit,
  PharmacyRegistration,
  MarketerLinks,
  OrdersV2,
  OrderDetailV2,
  NotificationsV2,
  StoresV2,
  StoreCatalogV2,
  StoreCartV2,
  ChatListV2,
  ChatThreadV2,
  RechargeOnline,
  ProfileScreen,
  AccountStatement,
  AuthenticationTutorial,
  CartScreen,
  InformationOrder,
  ProductDetailScreen,
  OrderDetailScreen,
  MainScreen,
  Wallet,
  BankLinks,
  BankLinkConfirm,
  TopupScreen,
  OrderProducts,
  OrderDetailDelivery,
  OrderDetailPayment,
  PaymentCheckoutScreen,
  Confirm,
  Search,
  ProductListScreen,
  AddAddressScreen,
  CheckoutResult,
  UpdateProfile,
  WalletDetail,
  BankAccount,
  TransactionHistory,
  PaymentByBank,
  ProductPromotionList,
  ConfirmOrderProducts,
  AddressUpdate,
  ComboProductDetail,
  CreateLoan,
  LoanRepayment,
  LoanPayment,
  ListBankAccount,
  ReferralScreen,
  InfoCustomer,
  Voucher,
  PreCloseLoanSuccess,
  ListPromotions,
  ListNotiScreen,
  PayOrder,
  AuthoritySupplier,
  FavouriteSupplier,
  FilterProduct,
  AllFilter,
} from '../screens';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_SPLASH_SCREEN,
  NAVIGATION_TO_REGISTER_SCREEN,
  NAVIGATION_PHONE_VERIFY,
  NAVIGATION_TO_MAIN_SCREEN,
  NAVIGATION_TO_RECHARGE_ONLINE,
  NAVIGATION_TO_PROFILE_SCREEN,
  NAVIGATION_ACCOUNT_STATEMENT,
  NAVIGATION_AUTHENTICATION_TUTORIAL,
  NAVIGATION_TO_CART_SCREEN,
  NAVIGATION_TO_INFORMATION_ORDER,
  NAVIGATION_PRODUCT_DETAIL_SCREEN,
  NAVIGATION_PRODUCT_LIST,
  NAVIGATION_ORDER_DETAIL_SCREEN,
  NAVIGATION_PAYMENT_BY_NEOMED_SCREEN,
  NAVIGATION_ADDRESS_CHOOSE_SCREEN,
  NAVIGATION_WALLET,
  NAVIGATION_BANK_LINKS,
  NAVIGATION_BANK_LINKS_CONFIRM,
  NAVIGATION_TOPUP_SCREEN,
  NAVIGATION_PAYMENT_CHECKOUT_SCREEN,
  NAVIGATION_ORDER_PRODUCTS,
  NAVIGATION_ORDER_DETAIL_DELIVERY,
  NAVIGATION_DETAIL_PAYMENT_ORDER,
  NAVIGATION_CONFIRM,
  NAVIGATION_TO_SEARCH,
  NAVIGATION_ADD_ADDRESS_SCREEN,
  NAVIGATION_CHECKOUT_RESULT_SCREEN,
  NAVIGATION_UPDATE_PROFILE,
  NAVIGATION_WALLET_DETAIL,
  NAVIGATION_BANK_ACCOUNT,
  NAVIGATION_TRANSACTION_HISTORY,
  NAVIGATION_PAYMENT_BY_BANK_SCREEN,
  NAVIGATION_PRODUCT_PROMOTION_LIST_SCREEN,
  NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN,
  NAVIGATION_ADDRESS_UPDATE,
  NAVIGATION_COMBO_PRODUCT_DETAIL,
  NAVIGATION_CREATE_LOAN,
  NAVIGATION_LOAN_REPAYMENT,
  NAVIGATION_LOAN_PAYMENT,
  NAVIGATION_LOAN_INFO,
  NAVIGATION_LIST_BANK_ACCOUNT,
  NAVIGATION_REFERRAL_SCREEN,
  NAVIGATION_INFO_CUSTOMER,
  NAVIGATION_VOUCHER,
  NAVIGATION_PRE_CLOSE_LOAN_SUCCESS,
  NAVIGATION_FAVOURITE_PRODUCT_SCREEN,
  NAVIGATION_LIST_PROMOTIONS,
  NAVIGATION_LIST_DISTRIBUTOR_TRADEMARK,
  NAVIGATION_PROMOTION_DETAIL,
  NAVIGATION_LIST_NOTI_SCREEN,
  NAVIGATION_CHOOSE_GIFT_PROMOTION,
  NAVIGATION_PAY_ORDER,
  NAVIGATION_FAVOURITE_SUPPLIER,
  NAVIGATION_FILTER_PRODUCT,
  NAVIGATION_ALL_FILTER,
  NAVIGATION_AUTHORITY,
  NAVIGATION_VIETQR_PAYMENT,
  NAVIGATION_ACCOUNT_PENDING_APPROVAL,
  NAVIGATION_KYC_SUBMIT,
  NAVIGATION_PHARMACY_REGISTRATION,
  NAVIGATION_MARKETER_LINKS,
  NAVIGATION_ORDERS_V2,
  NAVIGATION_ORDER_DETAIL_V2,
  NAVIGATION_NOTIFICATIONS_V2,
  NAVIGATION_STORES_V2,
  NAVIGATION_STORE_CATALOG_V2,
  NAVIGATION_STORE_CART_V2,
  NAVIGATION_CHAT_LIST_V2,
  NAVIGATION_CHAT_THREAD_V2,
} from './routes';
import PaymentByNeomedScreen from '~/screens/PaymentByNeomedScreen/index';
import AddressChooseScreen from '~/screens/AddressChooseScreen/index';
import VietQrPaymentScreen from '~/screens/VietQrPaymentScreen/index';
import {
  FavouriteProductScreen,
  ListDistributorTrademark,
  LoanInfo,
  PromotionDetail,
} from '~/screens/index';
import ChooseGiftPromotion from '~/screens/CartScreen/ChooseGiftPromotion/index';
import { brandColors } from '~/design-system/tokens';

const Stack = createNativeStackNavigator();

const defaultProps = {};

const StackNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION_TO_SPLASH_SCREEN}
      screenOptions={{
        headerTintColor: theme.appbar.tintColor,
        headerStyle: {
          backgroundColor: theme.appbar.backgroundColor,
        },
        contentStyle: {
          backgroundColor: brandColors.background,
        },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={NAVIGATION_TO_SPLASH_SCREEN}
        component={SplashScreen}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        component={MainScreen}
        name={NAVIGATION_TO_MAIN_SCREEN}
      />

      <Stack.Screen
        name={NAVIGATION_LIST_NOTI_SCREEN}
        component={ListNotiScreen}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_FAVOURITE_SUPPLIER}
        component={FavouriteSupplier}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_AUTHORITY}
        component={AuthoritySupplier}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_INFO_CUSTOMER}
        component={InfoCustomer}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ADDRESS_UPDATE}
        component={AddressUpdate}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_BANK_ACCOUNT}
        component={BankAccount}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_WALLET_DETAIL}
        component={WalletDetail}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_TRANSACTION_HISTORY}
        component={TransactionHistory}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_WALLET}
        component={Wallet}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_CONFIRM}
        component={Confirm}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_SEARCH}
        component={Search}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_BANK_LINKS}
        component={BankLinks}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_BANK_LINKS_CONFIRM}
        component={BankLinkConfirm}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TOPUP_SCREEN}
        component={TopupScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ORDER_DETAIL_SCREEN}
        component={OrderDetailScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_AUTHENTICATION_TUTORIAL}
        component={AuthenticationTutorial}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_INFORMATION_ORDER}
        component={InformationOrder}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ACCOUNT_STATEMENT}
        component={AccountStatement}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_LOGIN_SCREEN}
        component={LoginPhone}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_REGISTER_SCREEN}
        component={RegisterScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ACCOUNT_PENDING_APPROVAL}
        component={AccountPendingApproval}
        options={{
          header: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_KYC_SUBMIT}
        component={KycSubmit}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_PHARMACY_REGISTRATION}
        component={PharmacyRegistration}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_MARKETER_LINKS}
        component={MarketerLinks}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ORDERS_V2}
        component={OrdersV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ORDER_DETAIL_V2}
        component={OrderDetailV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_NOTIFICATIONS_V2}
        component={NotificationsV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_STORES_V2}
        component={StoresV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_STORE_CATALOG_V2}
        component={StoreCatalogV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_STORE_CART_V2}
        component={StoreCartV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_CHAT_LIST_V2}
        component={ChatListV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_CHAT_THREAD_V2}
        component={ChatThreadV2}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_PHONE_VERIFY}
        component={PhoneVerify}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_TO_RECHARGE_ONLINE}
        component={RechargeOnline}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_TO_CART_SCREEN}
        component={CartScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_CHECKOUT_RESULT_SCREEN}
        component={CheckoutResult}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_PAYMENT_CHECKOUT_SCREEN}
        component={PaymentCheckoutScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_PRODUCT_DETAIL_SCREEN}
        component={ProductDetailScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_PRODUCT_LIST}
        component={ProductListScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_PAYMENT_BY_NEOMED_SCREEN}
        component={PaymentByNeomedScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ADDRESS_CHOOSE_SCREEN}
        component={AddressChooseScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ADD_ADDRESS_SCREEN}
        component={AddAddressScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ORDER_PRODUCTS}
        component={OrderProducts}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ORDER_DETAIL_DELIVERY}
        component={OrderDetailDelivery}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_DETAIL_PAYMENT_ORDER}
        component={OrderDetailPayment}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN}
        component={ConfirmOrderProducts}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_PAYMENT_BY_BANK_SCREEN}
        component={PaymentByBank}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_UPDATE_PROFILE}
        component={UpdateProfile}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_PRODUCT_PROMOTION_LIST_SCREEN}
        component={ProductPromotionList}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_COMBO_PRODUCT_DETAIL}
        component={ComboProductDetail}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_CREATE_LOAN}
        component={CreateLoan}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_LOAN_REPAYMENT}
        component={LoanRepayment}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_LOAN_PAYMENT}
        component={LoanPayment}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_LOAN_INFO}
        component={LoanInfo}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_LIST_BANK_ACCOUNT}
        component={ListBankAccount}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_REFERRAL_SCREEN}
        component={ReferralScreen}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_VOUCHER}
        component={Voucher}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_PRE_CLOSE_LOAN_SUCCESS}
        component={PreCloseLoanSuccess}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_FAVOURITE_PRODUCT_SCREEN}
        component={FavouriteProductScreen}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_LIST_PROMOTIONS}
        component={ListPromotions}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_LIST_DISTRIBUTOR_TRADEMARK}
        component={ListDistributorTrademark}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_PROMOTION_DETAIL}
        component={PromotionDetail}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_CHOOSE_GIFT_PROMOTION}
        component={ChooseGiftPromotion}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_PAY_ORDER}
        component={PayOrder}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_FILTER_PRODUCT}
        component={FilterProduct}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_ALL_FILTER}
        component={AllFilter}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name={NAVIGATION_VIETQR_PAYMENT}
        component={VietQrPaymentScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

StackNavigator.defaultProps = defaultProps;

export default StackNavigator;
