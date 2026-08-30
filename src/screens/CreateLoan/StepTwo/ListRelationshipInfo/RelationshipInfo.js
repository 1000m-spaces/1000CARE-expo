import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ModalSelect, Text, TextInput } from '~/common/index'
import { RELATIONSHIP_TYPE } from '~/constants/constants'
import PressScale from '~/design-system/PressScale'
import { brandColors, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const relationShip = [
  {
    id: RELATIONSHIP_TYPE.Dad,
    name: 'Bố đẻ',
  },
  {
    id: RELATIONSHIP_TYPE.Mom,
    name: 'Mẹ đẻ',
  },
  {
    id: RELATIONSHIP_TYPE.FatherInLaw,
    name: 'Bố vợ/chồng',
  },
  {
    id: RELATIONSHIP_TYPE.MotherInLaw,
    name: 'Mẹ vợ/chồng',
  },
  {
    id: RELATIONSHIP_TYPE.Siblings,
    name: 'Anh/chị/em ruột',
  },
  {
    id: RELATIONSHIP_TYPE.SiblingsInLaw,
    name: 'Anh/chị/em vợ/chồng',
  },
  {
    id: RELATIONSHIP_TYPE.Child,
    name: 'Con đẻ',
  },
  {
    id: RELATIONSHIP_TYPE.DaughterInLaw,
    name: 'Con dâu/rể',
  },
]

const RelationshipInfo = ({ index, onChange, data, onDelete }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>
          {`Người liên quan ${index}`}
        </Text>
        <PressScale
          onPress={onDelete}
        >
          <Text style={styles.deleteText}>
            Xóa
          </Text>
        </PressScale>
      </View>
      <TextInput
        inputContainerStyle={styles.inputContainerStyle}
        labelStyle={styles.labelStyle}
        value={data?.name}
        onChangeText={(value) => {
          onChange('name', value)
        }}
        label={'Họ và tên'}
      />
      <TextInput
        inputContainerStyle={styles.inputContainerStyle}
        labelStyle={styles.labelStyle}
        value={data?.identityCardNumber}
        onChangeText={(value) => {
          onChange('identityCardNumber', value)
        }}
        label={'Số giấy tờ tùy thân'}
      />
      <View style={styles.formItemContainer}>
        <Text style={[styles.labelStyle]}>Mối quan hệ</Text>
        <ModalSelect
          style={[styles.inputContainerStyle, styles.noBorder]}
          textStyle={styles.modalSelectPlaceHolder}
          selectedKey={data?.type}
          onChange={(relationship) => {
            if (relationship.id) {
              onChange('type', relationship.id)
            }
          }}
          data={relationShip}
          label={'Mối quan hệ'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: s(12),
    paddingTop: s(12),
    borderTopWidth: 1,
    borderTopColor: brandColors.borderSoft,
  },
  headerRow: {
    justifyContent: 'space-between',
    marginBottom: s(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fs(13),
    fontWeight: '700',
    color: brandColors.textDark,
  },
  deleteText: {
    color: brandColors.danger,
    fontSize: fs(12.5),
    fontWeight: '600',
  },
  inputContainerStyle: {
    minHeight: s(48),
    borderRadius: s(radiusScale.lg),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    backgroundColor: '#F4F9F9',
    marginBottom: s(14),
  },
  noBorder: {
    borderWidth: 1,
  },

  labelStyle: {
    color: brandColors.muted,
    fontWeight: 'normal',
    fontSize: fs(12),
    lineHeight: fs(20),
  },

})

export default RelationshipInfo
