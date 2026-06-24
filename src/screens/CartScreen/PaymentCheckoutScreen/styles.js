import { StyleSheet } from 'react-native'
import { s } from '~/utils/responsive'

const styles = StyleSheet.create({
  mainContainer: { 
    flex:1,
    display: 'flex',
    justifyContent:'space-between',
    backgroundColor: 'transparent',
  },
  
  listCheckoutContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    marginTop: s(6),
  },

  itemSeparator: {
    height: s(12),
    backgroundColor: 'transparent',
  },

  mt12: {
    marginTop: s(12),
  },
})

export default styles
