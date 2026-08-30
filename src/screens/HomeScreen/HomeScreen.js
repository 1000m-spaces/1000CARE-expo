import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, FlatList, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  resetStatusAddCart, getDistributorsActive, requestGetTrademarksAdvertisement, requestGetProductBestSeller, requestGetProductsHotDeal, getInfo,
  requestGetListAdsBannerHomeNeomedByDistributor, loadNccFavorite, setSelectedDistri, requestGetProductPriceSock, openAppTheFirst, getCheckOnlinePharmacy, requestGetPharmacyInfo,
} from '~/store/actions';
import { getAuthStore, getAddItemStatus, getSelectedDistri, getPharmacyInfo, getIsLoadNccFavorite, getVersionNew, getForceUpdate, getUpdate, getOpenAppTheFirst, getListProductPriceSockHome } from '~/store/selector';
import { getListItem } from '~/store/cart/cartSelectors';
import ItemDistributorTab from '~/common/ItemDistributorTab';
import ListDistributor from './ListDistributor';
import styles from './styles';
import DistributorData from './DistributorData/index';
import { NAVIGATION_BANK_ACCOUNT, NAVIGATION_TO_CART_SCREEN, NAVIGATION_TO_SEARCH } from '~/navigation/routes';
import strings from '~/i18n';
import Status from '~/common/Status/Status';
import ListAllProduct from './ListAllProduct/ListAllProduct';
import ErrorView from '~/common/ErrorView/index';
import { check_info } from '~/assets/constants';
import { Icon, Text } from '~/common/index';
import { Platform } from 'react-native';
import { asyncStorage } from '~/store/index';
import packageJson from '../../../package.json';
import PremiumCard from '~/design-system/PremiumCard';
import PremiumButton from '~/design-system/PremiumButton';
import { brandColors } from '~/design-system/tokens';
import { showToast } from '~/utils/toast';
import LiquidGlassView from '~/design-system/LiquidGlassView';
import BackgroundWash from '~/design-system/BackgroundWash';
import PressScale from '~/design-system/PressScale';
import { s } from '~/utils/responsive';
// import { NetworkContext } from '../../network/NetworkProvider'

const HOME_HEADER_SCROLL_INSET = s(78);

const HomeCartButton = ({ navigation }) => {
  const dispatch = useDispatch();
  const listItem = useSelector(state => getListItem(state));
  const { isLoggedIn } = useSelector(state => getAuthStore(state));

  useEffect(() => {
    if (listItem === null && isLoggedIn) {
      dispatch(getInfo());
    }
  }, [dispatch, listItem, isLoggedIn]);

  const count = (listItem?.items || []).reduce((total, distributor) => {
    return total + (distributor?.items || []).reduce((sum, group) => {
      return sum + (group?.items?.length || 0);
    }, 0);
  }, 0);

  const onPress = () => {
    if (!isLoggedIn) {
      showToast(strings.common.requireLogin);
      return;
    }
    navigation.navigate(NAVIGATION_TO_CART_SCREEN);
  };

  return (
    <PressScale style={styles.cartTouch} onPress={onPress}>
      <LiquidGlassView intensity="regular" style={styles.cartPill}>
        <Icon type="feather" name="shopping-cart" color={brandColors.tealDark} size={24} />
      </LiquidGlassView>
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{count}</Text>
      </View>
    </PressScale>
  );
};

const MarketplaceHeader = ({ navigation, selectedDistri }) => {
  return (
    <View style={styles.marketHeader}>
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(238,252,253,1)', 'rgba(238,252,253,0.9)', 'rgba(238,252,253,0)']}
        locations={[0, 0.72, 1]}
        style={styles.marketHeaderScrim}
      />
      <View style={styles.marketHeaderTop}>
        <PressScale
          style={styles.searchTouch}
          onPress={() => navigation.navigate(NAVIGATION_TO_SEARCH)}
        >
          <View style={styles.searchDock}>
            <View style={styles.searchIconBubble}>
              <Icon type="feather" name="search" color={brandColors.tealDark} size={20} />
            </View>
            <View style={styles.searchTextWrap}>
              <Text style={styles.searchText}>Tìm sản phẩm</Text>
            </View>
          </View>
        </PressScale>
        <HomeCartButton navigation={navigation} />
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  // const { isConnected } = useContext(NetworkContext)
  // *** Distributors ***
  const [listDistributorsDisplay, setListDistributorsDisplay] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích');
  const [isSkip, setSkip] = useState('');

  const pharmacyInfo = useSelector(state => getPharmacyInfo(state));
  const isLoadNccFavorite = useSelector(state => getIsLoadNccFavorite(state));
  const currentDistri = useSelector(state => getSelectedDistri(state));
  const versionNew = useSelector(state => getVersionNew(state));
  const forceUpdate = useSelector(state => getForceUpdate(state));
  const isUpdate = useSelector(state => getUpdate(state));
  const isOpenAppTheFirst = useSelector(state => getOpenAppTheFirst(state));
  const priceSockHome = useSelector(state => getListProductPriceSockHome(state));

  const [selectedDistri, setSelectDistri] = useState(currentDistri);
  const versionApp = packageJson.version;
  const skipForceUpdate = async () => {
    const a = await asyncStorage.getSkipForceUpdate();
    setSkip(a);
  };

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => getAuthStore(state));
  const statusAddCart = useSelector(state => getAddItemStatus(state));
  // console.log('VERSIONNNNNN:', 'Hiện tại:' + versionApp + ', ver mới:' + versionNew + ', bắt update:' + forceUpdate + ', không bắt buộc update:' + isUpdate + ', bỏ qua skip:' + isSkip);

  // first get all distributors
  useEffect(() => {
    dispatch(requestGetPharmacyInfo());
    dispatch(requestGetListAdsBannerHomeNeomedByDistributor(1, 1, 1, 100, 1));
    dispatch(getDistributorsActive(0, 1, 200, false));
    dispatch(requestGetTrademarksAdvertisement(0, 1, 1, 200, false));
    dispatch(requestGetProductBestSeller(0, 1, 20, false));
    dispatch(requestGetProductsHotDeal(0, 1, 20, false));
    dispatch(requestGetProductPriceSock(null, 20, 1, false, 'home'));
    skipForceUpdate();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!Array.isArray(priceSockHome) || priceSockHome.length === 0) {
        dispatch(requestGetProductPriceSock(null, 20, 1, false, 'home'));
      }
    }, [dispatch, priceSockHome]),
  );

  useEffect(() => {
    if (isOpenAppTheFirst == 0) {
      dispatch(getCheckOnlinePharmacy());
      dispatch(openAppTheFirst());
    }
  }, [isOpenAppTheFirst]);

  useEffect(() => {
    if (pharmacyInfo) {
      // console.log('pharmacyInfo', pharmacyInfo, currentDistrsi)
      if (isLoadNccFavorite && pharmacyInfo?.favourite_distributor?.id !== 0
        && pharmacyInfo?.favourite_distributor?.id !== 1 && pharmacyInfo?.favourite_distributor?.id !== null
        && pharmacyInfo?.favourite_distributor?.status === 1) {
        dispatch(loadNccFavorite(false));
        setSelectDistri(pharmacyInfo?.favourite_distributor);
        return;
      }
    }
    if (currentDistri && currentDistri.status === 1) {
      setSelectDistri(currentDistri);
    } else {
      setSelectDistri({
        id: -1,
        logo: null,
        name: 'Neomed',
        currentScreen: 'home',
      });
    }
  }, [currentDistri, pharmacyInfo]);

  useEffect(() => {
    if (selectedDistri && selectedDistri.id > -1) {
      const newList = [{
        id: -1,
        logo: null,
        name: 'Neomed',
        currentScreen: 'home',
      },
        // selectedDistri,
        // {
        //   id: -2,
        //   logo: null,
        //   name: 'MBBank',
        //   currentScreen: 'mbbank',
        // },
      ];
      setListDistributorsDisplay(newList);
    } else {
    }
  }, [selectedDistri]);

  useEffect(() => {
    if (statusAddCart === Status.SUCCESS) {
      dispatch(resetStatusAddCart());
    }
  }, [statusAddCart]);

  const keyExtractorDistri = useCallback((item) => {
    return item.id.toString();
  });

  const onTabPress = (item) => {
    console.log('hhhhhhhhhhhhhhhhhh:', item);
    if (item.id === -2) {
      // Chỉ chặn đăng nhập khi vào tài khoản ngân hàng
      if (!isLoggedIn) {
        onShowMessage(strings.common.requireLogin);
        return;
      }
      navigation.navigate(NAVIGATION_BANK_ACCOUNT);
    } else {
      // Cho phép xem nhà cung cấp và sản phẩm mà không cần đăng nhập
      setSelectDistri(item);
      dispatch(setSelectedDistri(item));
    }
  };

  useEffect(() => {
    skipForceUpdate();
    if (pharmacyInfo?.favourite_distributor?.id && pharmacyInfo?.favourite_distributor?.id != 0 && pharmacyInfo?.favourite_distributor?.id != 1) {
      dispatch(setSelectedDistri(pharmacyInfo?.favourite_distributor));
    }
  }, [pharmacyInfo]);

  const onShowMessage = (msg) => {
    setMessage(msg);
    setOpenMessage(true);
    setTimeout(() => {
      setOpenMessage(false);
    }, 2000);
  };

  // useEffect(() => {
  //   internetCheck()
  // }, [isConnected])

  // const internetCheck = () => {
  //   console.log('NETWORKKKKKKKKKKKK:::::::::::::::', isConnected)
  //   if (!isConnected) {
  //     Alert.alert(
  //       strings.errors.noInternetTitle'),
  //       strings.splashScreen.noInternetMessage'),
  //       [
  //         {
  //           text: strings.common.cancel'),
  //           onPress: () => BackHandler.exitApp(),
  //           style: 'cancel',
  //         },
  //         { text: strings.common.ok'), onPress: () => internetCheck() },
  //       ],
  //       { cancelable: false },
  //     )
  //   } else {
  //     setIsReady(true)
  //   }
  // }

  return (
    <View style={styles.backgroundImage}>
      <BackgroundWash />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          <View style={[styles.contentLayer, selectedDistri?.id !== -1 && styles.supplierContentLayer]}>
            {
              selectedDistri?.id !== -1 && (
                <>
                  <FlatList
                    style={styles.listDistributors}
                    contentContainerStyle={styles.distributors}
                    data={listDistributorsDisplay}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <ItemDistributorTab
                          onItemPress={async () => onTabPress(item)}
                          selected={item?.id === selectedDistri?.id}
                          data={item}
                        />
                      );
                    }}
                    keyExtractor={keyExtractorDistri}
                  />
                  <View style={{ paddingHorizontal: 20 }}>
                    <PremiumCard
                      title="Mua sắm cùng 1000CARE"
                      subtitle="Đặt hàng nhanh chóng, hỗ trợ 24/7"
                      onPress={() => console.log('Premium Card Pressed')}
                    />
                  </View>
                  {
                    selectedDistri?.product_display_type === 1 ? (
                      <ListAllProduct
                        navigation={navigation}
                        distributorId={selectedDistri?.id}
                        onMessage={(msg) => onShowMessage(msg)}
                        onFavorClick={(isAdd) => {
                          if (isAdd) {
                            setMessage('Đã thêm sản phẩm yêu thích');
                          } else {
                            setMessage('Đã xóa sản phẩm yêu thích');
                          }
                          setOpenMessage(true);
                          setTimeout(() => {
                            setOpenMessage(false);
                          }, 1000);
                        }}
                        onAddProduct={() => {
                          setMessage('Thêm sản phẩm thành công');
                          setOpenMessage(true);
                          setTimeout(() => {
                            setOpenMessage(false);
                          }, 1000);
                        }}
                      />
                    ) : (
                      <DistributorData
                        selectedDistri={selectedDistri}
                        navigation={navigation}
                      />
                    )
                  }
                </>
              )
            }
            {
              selectedDistri?.id === -1 && (
                <>
                  <ListDistributor
                    navigation={navigation}
                    topInset={HOME_HEADER_SCROLL_INSET}
                    onItemPress={(item) => {
                      onTabPress(item);
                    }}
                    selectedDistri={selectedDistri}
                    onMessage={(msg) => onShowMessage(msg)}
                    onFavorClick={(isAdd) => {
                      if (isAdd) {
                        setMessage('Đã thêm sản phẩm yêu thích');
                      } else {
                        setMessage('Đã xóa sản phẩm yêu thích');
                      }
                      setOpenMessage(true);
                      setTimeout(() => {
                        setOpenMessage(false);
                      }, 1000);
                    }}
                    onAddProduct={() => {
                      setMessage('Thêm sản phẩm thành công');
                      setOpenMessage(true);
                      setTimeout(() => {
                        setOpenMessage(false);
                      }, 1000);
                    }}
                  />
                </>
              )
            }
          </View>
          <MarketplaceHeader navigation={navigation} selectedDistri={selectedDistri} />
        </View>
        <ErrorView
          error={message}
          isOpen={openMessage}
          icon={check_info}
          onClose={() => setOpenMessage(false)}
        />
        <Modal
          onBackdropPress={() => { }}
          transparent={true}
          isVisible={(isUpdate == true && isSkip == 'false') || (isUpdate == true && forceUpdate == true)}
        >
          <View style={styles.viewContent}>
            {/* <TouchableOpacity style={styles.buttonUpdate}>
              <Text style={styles.textUpdate}>Update Version</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.buttonUpdate}>
              <Text style={styles.textUpdate}>Bỏ qua</Text>
            </TouchableOpacity> */}
            <View>
              <Image
                style={styles.image}
                source={require('~/assets/configNeoMed/logoNeoMed.png')}
              />
              <Text style={styles.textVerApp}>Version: {versionApp}</Text>
            </View>
            {forceUpdate == true ?
              <PremiumButton
                text={`Cập nhật phiên bản ${versionNew}`}
                onPress={() => {
                  asyncStorage.setSkipForceUpdate('false');
                }}
              />
              : <View style={{ flexDirection: 'column', width: '100%' }}>
                <PremiumButton
                  text={`Cập nhật ngay (${versionNew})`}
                  onPress={() => {
                    asyncStorage.setSkipForceUpdate('false');
                    if (Platform.OS === 'android') {
                      Linking.openURL('https://play.google.com/store/apps/details?id=com.ciaolink.neomed');
                    } else {
                      Linking.openURL('https://apps.apple.com/vn/app/neo-med/id1540253107');
                    }
                  }}
                />
                <PressScale
                  onPress={() => {
                    asyncStorage.setSkipForceUpdate('true');
                    setSkip(true);
                  }}
                  style={{ marginTop: 10, alignItems: 'center' }}
                >
                  <Text style={{ color: brandColors.muted }}>Để sau</Text>
                </PressScale>
              </View>
            }
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
