import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Image } from '~/common/index'
import Modal from 'react-native-modal'
import {
  close,
} from '~/assets/constants'
import styles from './styles'
import PressScale from '~/design-system/PressScale'

const termData = [
  'Sản phẩm Vay siêu nhanh từ thẻ tín dụng: Là sản phẩm cho vay mục đích tiêu dùng cá nhân dành cho Khách hàng cá nhân có thẻ tín dụng do MB phát hành. Theo đó, căn cứ vào đề nghị vay vốn của Khách hàng qua (các) kênh số, giá trị Hạn mức thẻ Khách hàng đã được cấp, MB thực hiện cho khách hàng vay tối đa 75% giá trị hạn mức thẻ, đảm bảo',
  '- Thực hiện hoàn toàn online trên APP MBBank',
  '- Mức cho vay tối đa 75% hạn mức thẻ tín dụng',
  '- Khách hàng chủ động trả Gốc, lãi online',
  '- Trải nghiệm vay vốn hiện đại, giao diện thân thiện với tốc độ xử lý nhanh. tiêu dùng cá nhân và/ gia đình',
]

const DialogTerm = ({ isOpen, onClose }) => {
  const renderRow = (data) => {
    return (
      <Text style={styles.message}>{data}</Text>
    )
  }

  return (
    <Modal
      animationType="fade"
      backdropColor='rgba(0, 0, 0, 0.65)'
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={500}
      hasBackdrop={true}
      isVisible={isOpen}
      useNativeDriver={true}
      onBackdropPress={onClose}
    >
      <View 
        style={styles.mainContainer}
      >
        <View 
          style={styles.dialogHeader}
        >
          <Text
            style={styles.title}
          >
            Thể lệ sản phẩm
          </Text>
          <PressScale
            onPress={onClose}
          >
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={close}
            />
          </PressScale>
        </View>
        <View>
          <FlatList 
            keyExtractor={(_, idx) =>idx.toString()}
            data={termData}
            renderItem={({ item }) => renderRow(item)}
          />
        </View>
      </View>
    </Modal>
  )
}

export default DialogTerm
