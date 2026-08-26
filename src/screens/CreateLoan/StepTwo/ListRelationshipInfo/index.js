import React from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import { Image, Text } from '~/common/index'
import RadioButtonGroup from '~/common/RadioButtonGroup/RadioButtonGroup'
import styles from './styles'
import { plus_2 } from '~/assets/constants'
import RelationshipInfo from './RelationshipInfo'
import PressScale from '~/design-system/PressScale'

const ListRelationshipInfo = ({ listRelationShip, setListRelationShip }) => {
  const [show, setShow] = useState(!!listRelationShip && listRelationShip.length > 0)

  const onChange = (idx, key, value) => {
    const temp = listRelationShip
    temp[idx] = {
      ...temp[idx],
      [key]: value,
    }
    setListRelationShip([...temp])
  }

  const onDelete = (idx) => {
    const temp = listRelationShip
    temp.splice(idx, 1)
    if (temp.length === 0) {
      setShow(false)
      setListRelationShip(null)
    } else {
      setListRelationShip([...temp])
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>Bạn có người thân có tín dụng tại MB?</Text>
      <View style={{ paddingVertical: 18 }}>
        <RadioButtonGroup 
          value={show}
          data={[
            {
              value: true,
              title: 'Có',
            },
            {
              value: false,
              title: 'Không',
            },
          ]}
          onDataChange={(item) => {
            setShow(item.value)
            if (item.value) {
              setListRelationShip([{}])
            } else {
              setListRelationShip(null)
            }
          }}
        />
      </View>
      {
        show && (
          <>
            {
              listRelationShip && listRelationShip.map((item, idx) => {
                return (
                  <RelationshipInfo
                    key={idx}
                    index={idx + 1}
                    data={item}
                    onDelete={() =>{
                      onDelete(idx)
                    }}
                    onChange={(key, value) => {
                      onChange(idx, key, value)
                    }}
                  />
                )
              })
            }
            <PressScale
              style={styles.addButtonContainer}
              onPress={() => setListRelationShip([...listRelationShip, {}])}
            >
              <Image
                style={styles.addButton}
                source={plus_2}
              />
            </PressScale>
          </>
        )
      }
    </View>
  )
}

export default ListRelationshipInfo