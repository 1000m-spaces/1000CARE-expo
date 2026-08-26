import React, {useCallback} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import dimens from '~/constants/dimens';
import ProductItem from '~/common/ProductItem/ProductItem';
import {NAVIGATION_PRODUCT_LIST} from '~/navigation/routes';
import Colors from '~/common/Colors/Colors';
import PressScale from '~/design-system/PressScale';

const numColumns = 2;
const LAYOUTPADDING = 18;
const ITEMPADDING = 8;
const PRODUCT_WIDTH = dimens.common.WINDOW_WIDTH / numColumns - ITEMPADDING * 2;
const PRODUCT_HEIGHT = PRODUCT_WIDTH * 1.03;
const IMAGE_CONTAINER_HEIGHT = (PRODUCT_WIDTH * 1.28 * 53) / 100;
const IMAGE_WIDTH = (PRODUCT_WIDTH * 6) / 10;
const IMAGE_HEIGHT = (IMAGE_CONTAINER_HEIGHT * 68) / 100;

const HomeCategory = ({navigation, data, distributorId, type}) => {
  const openProductList = () => {
    navigation.navigate(NAVIGATION_PRODUCT_LIST, {
      distributorId: distributorId,
      categoryId: data.category_id,
      title: data.name,
    });
  };

  const keyExtractorProduct = useCallback(item => {
    return item.product_id.toString();
  });
  if (!data.products || data.products.length === 0) {
    return null;
  }

  let products = data.products;
  if (products.length > 6) {
    products = products.slice(0, 6);
  }

  const renderProduct = useCallback(
    item => {
      return (
        <ProductItem
          navigation={navigation}
          data={item}
          distributorId={distributorId}
          type={type}
        />
      );
    },
    [navigation, distributorId, type],
  );

  if (type) {
    return (
      <View
        style={[
          styles.container,
          {
            padding: LAYOUTPADDING,
          },
        ]}>
        <View style={styles.header}>
          <Text
            style={[
              styles.textHeader,
              {
                flex: 2,
              },
            ]}>
            {data.name}
          </Text>
          <PressScale
            style={[
              {
                flex: 1,
              },
            ]}
            onPress={openProductList}>
            <Text style={styles.textButton}>{'Tất cả'}</Text>
          </PressScale>
        </View>

        <FlatList
          contentContainerStyle={styles.listProductsContainer}
          data={products}
          keyExtractor={keyExtractorProduct}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderProduct(item)}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: 6,
        },
      ]}>
      <View style={[styles.header, styles.headerDAP]}>
        <Text style={[styles.textHeader, styles.textHeaderDAP]}>
          {data.name}
        </Text>
        <PressScale style={[{flex: 1}]} onPress={openProductList}>
          <Text
            style={[
              styles.textButton,
              {paddingHorizontal: 5, textAlign: 'right'},
            ]}>
            {'Tất cả'}
          </Text>
        </PressScale>
      </View>

      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listProductsDAPContainer}
        data={products}
        keyExtractor={keyExtractorProduct}
        horizontal={false}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderProduct(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 4,
    paddingVertical: 12,
    paddingHorizontal: 9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    color: Colors.textColor2,
  },
  headerDAP: {
    flex: 1,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
  },
  textHeaderDAP: {
    fontSize: 14,
    lineHeight: 20,
    // color: Colors.textColor2,
    color: 'black',
    fontWeight: '600',
    flex: 3,
  },
  buttonAll: {
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.systemColor2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    color: Colors.systemColor2,
  },
  listProductsContainer: {
    marginTop: 10,
    marginLeft: -5,
  },
  listProductsDAPContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnWrapper: {
    flex: 1,
  },
  productContainer: {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    flexDirection: 'column',
  },
  imageContainer: {
    height: IMAGE_CONTAINER_HEIGHT,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
  },
  productInfoContainer: {
    padding: 8,
  },
  productName: {
    fontSize: 12,
    color: '#595959',
    lineHeight: 15,
  },
  priceContainer: {
    marginTop: 1,
    flexDirection: 'row',
  },
  price: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.priceColor,
    lineHeight: 20,
  },
  discount: {
    marginLeft: 2,
    fontSize: 12,
    color: '#FF6347',
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 9,
  },
  circleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBtn: {
    width: 66,
    height: 32,
    borderRadius: 28,
    marginHorizontal: 4,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signText: {
    color: '#595959',
    fontSize: 14,
  },
  quatityInput: {
    color: '#595959',
    fontSize: 12,
    lineHeight: 15,
    flex: 1,
  },

  cateName: {
    color: Colors.textColor3,
    fontSize: 12,
    lineHeight: 20,
    textAlignVertical: 'center',
    alignItems: 'center',
  },

  borderBottom: {
    borderBottomColor: Colors.backgroundColor,
    borderBottomWidth: 2,
  },

  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconChoose: {
    width: 12,
    height: 12,
    flexShrink: 0,
    alignItems: 'center',
  },
});

export default React.memo(HomeCategory);
