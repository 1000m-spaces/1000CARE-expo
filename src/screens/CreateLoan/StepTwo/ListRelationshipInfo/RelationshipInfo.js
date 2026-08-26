import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { ModalSelect, Text, TextInput } from '~/common/index'
import { RELATIONSHIP_TYPE } from '~/constants/constants'
import PressScale from '~/design-system/PressScale'

const relationShip = [
  {
    id: RELATIONSHIP_TYPE.Dad,
    name:'Bố đẻ',
  },
  {
    id: RELATIONSHIP_TYPE.Mom,
    name:'Mẹ đẻ',
  },
  {
    id: RELATIONSHIP_TYPE.FatherInLaw,
    name:'Bố vợ/chồng',
  },
  {
    id: RELATIONSHIP_TYPE.MotherInLaw,
    name:'Mẹ vợ/chồng',
  },
  {
    id: RELATIONSHIP_TYPE.Siblings,
    name:'Anh/chị/em ruột',
  },
  {
    id: RELATIONSHIP_TYPE.SiblingsInLaw,
    name:'Anh/chị/em vợ/chồng',
  },
  {
    id: RELATIONSHIP_TYPE.Child,
    name:'Con đẻ',
  },
  {
    id: RELATIONSHIP_TYPE.DaughterInLaw,
    name:'Con dâu/rể',
  },
]

const RelationshipInfo = ({ index, onChange, data, onDelete }) => {
  return (
    <View>
      <View 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexDirection: 'row',
        }}
      >
        <Text>
          {`Người liên quan ${index}`}
        </Text>
        <PressScale
          onPress={onDelete}
        >
          <Text
            style={{
              color: Colors.red,
            }}
          >
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
  inputContainerStyle: {
    borderWidth: 0,
    borderColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginBottom: 16,
  },

  labelStyle: {
    color: Colors.textColor3,
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 20,
  },

})

export default RelationshipInfo