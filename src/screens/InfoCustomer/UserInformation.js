import React from 'react'
import { Text, View } from 'react-native'
import TextInput from '~/common/Input/Input'
import { convertBirth } from '~/utils/date'
import styles from './styles'
import PressScale from '~/design-system/PressScale'

const UserInformation = ({ isNameShop, setNameShop, isOwnerFullName, setOwnerFullName, setOwnerEmail, isOwnerEmail, showDatePicker, isDate, setPhone, isPhone }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.titleSection}>Thông tin chung Cửa hàng</Text>
      <View style={styles.content}>
        <Text style={styles.label}>Tên cửa hàng</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Tên cửa hàng'}
          onChangeText={(text) => setNameShop(text)}
          value={isNameShop}
        />
        <Text style={styles.label}>Tên đầy đủ chủ cửa hàng</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Chủ cửa hàng'}
          onChangeText={(text) => setOwnerFullName(text)}
          value={isOwnerFullName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder={'Email'}
          onChangeText={(text) => setOwnerEmail(text)}
          style={styles.textInput}
          value={isOwnerEmail}
        />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 2 }}>
            <PressScale onPress={showDatePicker}>
              <Text style={{ height: 20, marginTop: 10, alignItems: 'center' }}>Ngày sinh</Text>
              <Text style={{ height: 20, marginTop: 6, alignItems: 'center' }}>{isDate ? convertBirth(isDate, 'DD/MM/YYYY HH:mm:ss') : '__/__/____'}</Text>
            </PressScale>
          </View>
          <View style={{ flex: 3, marginLeft: 20 }}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              placeholder={'Số điện thoại'}
              onChangeText={(text) => setPhone(text)}
              style={styles.textInput}
              value={isPhone}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default UserInformation