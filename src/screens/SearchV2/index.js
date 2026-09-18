import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon, Text } from '~/common/index';
import { getSearchSuggestionsV2 } from '~/store/catalogV2/catalogV2Actions';
import { getSearchSuggestionsV2 as selectSearchSuggestionsV2 } from '~/store/catalogV2/catalogV2Selector';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';
import { NAVIGATION_SEARCH_RESULTS_V2 } from '~/navigation/routes';

// Bỏ dấu tiếng Việt để lọc gợi ý không phân biệt dấu (gõ "ha" vẫn ra
// "hạt cho mèo") — API search-suggestions trả nguyên danh sách tĩnh,
// lọc theo prefix làm ở client.
const stripDiacritics = str =>
  str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

// Màn NHẬP + GỢI Ý từ khoá (2026-09-18, học theo Shopee) — chỉ có
// thanh search + danh sách gợi ý dạng hàng (không phải chip), lọc dần
// theo ký tự đang gõ. Bấm 1 gợi ý hoặc bấm tìm → điều hướng SANG MÀN
// KHÁC (SearchResultsV2) hiện danh sách sản phẩm, đúng như Shopee tách
// 2 màn riêng thay vì search-as-you-type ngay tại đây. Xem
// [[marketplace-core-business-model]].
const SearchV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const suggestions = useSelector(state => selectSearchSuggestionsV2(state));

  useEffect(() => {
    dispatch(getSearchSuggestionsV2());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSuggestions = useMemo(() => {
    const q = stripDiacritics(query.trim());
    if (!q) return suggestions;
    return suggestions.filter(item => stripDiacritics(item.keyword || '').includes(q));
  }, [query, suggestions]);

  const goToResults = keyword => {
    if (!keyword.trim()) return;
    navigation.navigate(NAVIGATION_SEARCH_RESULTS_V2, { keyword: keyword.trim() });
  };

  const renderSuggestion = ({ item }) => (
    <PressScale style={styles.suggestionRow} onPress={() => goToResults(item.keyword)}>
      <Icon type="feather" name="search" color={brandColors.mutedLight} size={s(15)} />
      <Text style={styles.suggestionText} numberOfLines={1}>{item.keyword}</Text>
    </PressScale>
  );

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
            autoFocus
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => goToResults(query)}
            placeholder="Bạn đang tìm sản phẩm gì?"
            placeholderTextColor={brandColors.mutedLight}
            returnKeyType="search"
          />
          {!!query && (
            <PressScale onPress={() => setQuery('')}>
              <Icon type="feather" name="x" color={brandColors.mutedLight} size={s(16)} />
            </PressScale>
          )}
        </View>
      </View>

      <FlatList
        data={filteredSuggestions}
        keyExtractor={item => String(item.id)}
        renderItem={renderSuggestion}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          query.trim() ? (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="search" color={brandColors.mutedLight} size={s(28)} />
              <Text style={styles.emptyText}>Không có gợi ý phù hợp, bấm tìm để xem kết quả</Text>
            </View>
          ) : null
        }
      />
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
    marginBottom: s(6),
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
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(40),
    flexGrow: 1,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    paddingVertical: s(14),
    borderBottomWidth: 1,
    borderBottomColor: brandColors.borderSoft,
  },
  suggestionText: {
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(13.5),
    fontWeight: '600',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: s(80),
    gap: s(10),
    paddingHorizontal: s(30),
  },
  emptyText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SearchV2;
