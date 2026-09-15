import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputSearch from './InputSearch'
import PressScale from '~/design-system/PressScale'
import CartHeaderButton from '~/common/CartHeaderButton/CartHeaderButton'
import { Icon } from '~/common/index'
import { brandColors, brandShadow } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

// Header tìm kiếm theo spec redesign: 1 hàng phẳng (nút back kính +
// ô tìm kiếm xám + nút giỏ hàng), thay cho hero gradient teal bo góc cũ.
const SearchBar = ({ navigation, onBack, onChangeText, idSearchDistri, textSearch, ref_input }) => {
  return (
    <View style={styles.wrap}>
      <PressScale onPress={onBack} style={styles.backButton}>
        <View style={styles.backButtonGlass}>
          <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={18} />
        </View>
      </PressScale>
      <InputSearch
        ref_input={ref_input}
        onChangeText={onChangeText}
        idSearchDistri={idSearchDistri}
        textSearch={textSearch}
      />
      <CartHeaderButton navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingTop: s(8),
    paddingHorizontal: s(16),
    paddingBottom: s(14),
    borderBottomWidth: 1,
    borderBottomColor: brandColors.borderSoft,
  },
  backButton: {
    flexShrink: 0,
  },
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
})

export default SearchBar
