import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE". RN không có
// `<table>` gốc nên dựng bằng `View` dạng lưới flex (mỗi cột chia đều
// bằng `flex: 1`) + `FlatList` cho phần thân. Giữ nguyên tên prop
// `columns`/`rows`. README gốc ghi rõ giới hạn: chưa có phân trang/sắp
// xếp/chọn hàng — bản chuyển đổi này giữ nguyên giới hạn đó.
export function Table({ columns = [], rows = [] }) {
  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        {columns.map((col) => (
          <Text key={col.key} style={styles.headerCell}>
            {col.header}
          </Text>
        ))}
      </View>
      <FlatList
        data={rows}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {columns.map((col) => (
              <View key={col.key} style={styles.cell}>
                {typeof item[col.key] === 'string' || typeof item[col.key] === 'number' ? (
                  <Text style={styles.cellText}>{item[col.key]}</Text>
                ) : (
                  item[col.key]
                )}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: semantic.bgSurface,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: semantic.bgSubtle,
    paddingVertical: careSpacing.space3,
    paddingHorizontal: careSpacing.space4,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: semantic.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: careSpacing.space3,
    paddingHorizontal: careSpacing.space4,
    borderBottomWidth: 1,
    borderBottomColor: semantic.border,
  },
  cell: {
    flex: 1,
  },
  cellText: {
    fontSize: 14,
    color: semantic.textPrimary,
  },
});

export default Table;
