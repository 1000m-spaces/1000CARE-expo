import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Image, TextInput, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon, Text } from '~/common/index';
import {
  searchProductsV2,
  resetSearchProductsV2,
  getSearchSuggestionsV2,
} from '~/store/catalogV2/catalogV2Actions';
import {
  getSearchProductsV2Status,
  getSearchProductsV2,
  getSearchSuggestionsV2 as selectSearchSuggestionsV2,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Màn tìm kiếm THẬT (marketplace-core, 2026-09-18) — thay bản cũ dùng
// Meilisearch trên catalog NeoMed. GET /customer/v1/search?q=&limit=&offset=
// full-text xuyên mọi NCC, bỏ dấu, chỉ SP đang bán. Field trả về chỉ
// {product_id,name,rx,price,currency} — KHÔNG có store_id nên bấm vào
// 1 kết quả chỉ mở xem nhanh (không có "thêm vào giỏ" ở đây), giống hệt
// ProductQuickViewModal ở HomeScreen.js. Xem
// [[marketplace-core-business-model]].
const SearchV2 = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [query, setQuery] = useState(route?.params?.prefill || '');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const status = useSelector(state => getSearchProductsV2Status(state));
  const results = useSelector(state => getSearchProductsV2(state));
  const suggestions = useSelector(state => selectSearchSuggestionsV2(state));
  const loading = status === Status.LOADING;

  useEffect(() => {
    inputRef.current?.focus();
    dispatch(getSearchSuggestionsV2());
    if (route?.params?.prefill) {
      dispatch(searchProductsV2(route.params.prefill, 30, 0));
    }
    return () => {
      dispatch(resetSearchProductsV2());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useCallback(
    _.debounce(text => {
      if (text.trim()) {
        dispatch(searchProductsV2(text.trim(), 30, 0));
      } else {
        dispatch(resetSearchProductsV2());
      }
    }, 350),
    [],
  );

  const onChangeText = text => {
    setQuery(text);
    debouncedSearch(text);
  };

  const onSuggestionPress = keyword => {
    setQuery(keyword);
    dispatch(searchProductsV2(keyword, 30, 0));
  };

  const renderItem = ({ item }) => (
    <PressScale style={styles.resultRow} onPress={() => setQuickViewProduct(item)}>
      {item.media ? (
        <Image source={{ uri: item.media }} style={styles.resultThumb} />
      ) : (
        <View style={[styles.resultThumb, styles.resultThumbPlaceholder]}>
          <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(18)} />
        </View>
      )}
      <View style={styles.resultInfo}>
        <Text style={styles.resultName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.resultPriceRow}>
          <Text style={styles.resultPrice}>{formatMoney(item.price, { unit: 'đ' })}</Text>
          {item.rx ? <Text style={styles.rxBadge}>Rx</Text> : null}
        </View>
      </View>
      <Icon type="feather" name="chevron-right" color={brandColors.mutedLight} size={s(16)} />
    </PressScale>
  );

  const showSuggestions = !query.trim() && suggestions.length > 0;

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <View style={styles.searchDock}>
          <Icon type="feather" name="search" color={brandColors.tealDark} size={s(16)} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            value={query}
            onChangeText={onChangeText}
            placeholder="Bạn đang tìm sản phẩm gì?"
            placeholderTextColor={brandColors.mutedLight}
            returnKeyType="search"
          />
          {!!query && (
            <PressScale onPress={() => onChangeText('')}>
              <Icon type="feather" name="x" color={brandColors.mutedLight} size={s(16)} />
            </PressScale>
          )}
        </View>
      </View>

      {showSuggestions ? (
        <View style={styles.suggestionsWrap}>
          <Text style={styles.suggestionsTitle}>Gợi ý hôm nay</Text>
          <View style={styles.suggestionsChipsWrap}>
            {suggestions.map(item => (
              <PressScale
                key={item.id}
                style={styles.suggestionChip}
                onPress={() => onSuggestionPress(item.keyword)}
              >
                <Text style={styles.suggestionChipText} numberOfLines={1}>{item.keyword}</Text>
              </PressScale>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.product_id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            !loading && query.trim() ? (
              <View style={styles.emptyWrap}>
                <Icon type="feather" name="search" color={brandColors.mutedLight} size={s(28)} />
                <Text style={styles.emptyText}>Không tìm thấy sản phẩm phù hợp</Text>
              </View>
            ) : null
          }
        />
      )}

      <Modal
        isVisible={!!quickViewProduct}
        onBackdropPress={() => setQuickViewProduct(null)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.quickViewModalWrap}
      >
        <View style={styles.quickViewCard}>
          <View style={styles.quickViewImage}>
            {quickViewProduct?.media ? (
              <Image source={{ uri: quickViewProduct.media }} style={styles.quickViewImageInner} resizeMode="contain" />
            ) : (
              <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(32)} />
            )}
          </View>
          <Text style={styles.quickViewName}>{quickViewProduct?.name}</Text>
          <View style={styles.quickViewPriceRow}>
            <Text style={styles.quickViewPrice}>{formatMoney(quickViewProduct?.price, { unit: 'đ' })}</Text>
            {quickViewProduct?.rx ? <Text style={styles.rxBadge}>Kê đơn (Rx)</Text> : null}
          </View>
          <PressScale style={styles.quickViewCloseButton} onPress={() => setQuickViewProduct(null)}>
            <Text style={styles.quickViewCloseText}>Đóng</Text>
          </PressScale>
        </View>
      </Modal>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    marginTop: s(8),
    paddingHorizontal: s(16),
    marginBottom: s(14),
  },
  backButton: {},
  backButtonGlass: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    ...brandShadow.soft,
  },
  searchDock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    height: s(42),
    borderRadius: s(21),
    paddingHorizontal: s(14),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: fs(13.5),
    color: brandColors.textDark,
    padding: 0,
  },
  suggestionsWrap: {
    paddingHorizontal: s(20),
  },
  suggestionsTitle: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '800',
    marginBottom: s(12),
  },
  suggestionsChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(8),
  },
  suggestionChip: {
    paddingHorizontal: s(14),
    paddingVertical: s(10),
    borderRadius: s(999),
    backgroundColor: brandColors.tealLight,
  },
  suggestionChipText: {
    color: brandColors.tealDark,
    fontSize: fs(12.5),
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(40),
    flexGrow: 1,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(12),
    marginBottom: s(10),
  },
  resultThumb: {
    width: s(52),
    height: s(52),
    borderRadius: s(12),
    backgroundColor: brandColors.tealLight,
  },
  resultThumbPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
  },
  resultPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    marginTop: s(4),
  },
  resultPrice: {
    color: brandColors.tealDark,
    fontSize: fs(13.5),
    fontWeight: '800',
  },
  rxBadge: {
    color: brandColors.dangerText,
    backgroundColor: brandColors.dangerTint,
    fontSize: fs(9.5),
    fontWeight: '800',
    paddingHorizontal: s(6),
    paddingVertical: s(2),
    borderRadius: s(6),
    overflow: 'hidden',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: s(80),
    gap: s(10),
  },
  emptyText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
  quickViewModalWrap: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  quickViewCard: {
    backgroundColor: brandColors.surface,
    borderTopLeftRadius: s(24),
    borderTopRightRadius: s(24),
    padding: s(24),
    alignItems: 'center',
  },
  quickViewImage: {
    width: s(96),
    height: s(96),
    borderRadius: s(16),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(16),
  },
  quickViewImageInner: {
    width: '100%',
    height: '100%',
  },
  quickViewName: {
    color: brandColors.textDark,
    fontSize: fs(16),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: s(8),
  },
  quickViewPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    marginBottom: s(20),
  },
  quickViewPrice: {
    color: brandColors.tealDark,
    fontSize: fs(18),
    fontWeight: '800',
  },
  quickViewCloseButton: {
    width: '100%',
    height: s(48),
    borderRadius: s(14),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickViewCloseText: {
    color: brandColors.tealDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
});

export default SearchV2;
