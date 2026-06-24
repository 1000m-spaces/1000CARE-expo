import { Dimensions, Platform, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
const fullWith = Dimensions.get('window').width

const styles = StyleSheet.create({
  imageInfo: {
    width: fullWith,
    height: 200,
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  viewNeo: {
    width: fullWith-60,
    alignItems: 'center',
  },
  styleTitle: {
    color: 'white',
    fontSize: 22,
  },
  textMoney: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
  },
  viewSelect: {
    width: fullWith,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    marginBottom: 10,
    paddingVertical: 18,
    flexWrap: 'wrap',
  },
  buttonSelect: {
    height: 40,
    width: 40,
    backgroundColor: '#E5F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 65,
  },
  textHistory: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:'white',
    lineHeight: 32,
    color: Colors.textColor2,
    marginBottom: 1,
  },
  textSelect: {
    marginTop: 5,
  },
  viewSpace: {
    backgroundColor: '#E5E5E5',
    height: 75,
  },
  viewStatement: {
    height: 85,
    width: fullWith,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonStatement: {
    width: fullWith-70,
    backgroundColor: '#0B7B8A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
  },
  textStatement: {
    color: 'white',
    fontSize: 16,
  },
  containerProfile: {
    backgroundColor: 'white',
    height: 140,
    position: 'absolute',
    top: 200 + 60 - 70 + (Platform.OS === 'ios' ? 20 : 0),
    width: fullWith - 40,
    marginHorizontal: 21,
    borderRadius: 5,
    paddingHorizontal: 20,
    elevation: 10,
  },
  numberAccount: {
    color: '#8C8C8C',
    fontSize: 15,
  },
  number: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  numberMoney: {
    color: Colors.priceColor,
    fontWeight: '600',
    fontSize: 18,
  },
  textUnit: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  buttonSelectAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
  },
  viewSelectAccount: {
    height: 18,
    width: 18,
    borderRadius: 20,
        
  },
  imageSelect: {
    height: 18,
    width: 18,
    position: 'absolute',
    left: 2,
  },
  imageCircle: {
    height: 18,
    width: 18,
  },
  viewPay: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  textCheckBox: {
    marginLeft: 20,
    fontSize: 16,
    color: '#CCCCCC',
  },
  buttonPay: {
    borderRadius: 35,
    paddingHorizontal: 15,
  },
  textPay: {
    fontWeight: 'normal',
  },
  viewButton: {
    paddingHorizontal: 0,
  },
  buttonCoppy: {
    borderWidth:1,
    borderColor:'white',
    borderRadius:15,
    paddingHorizontal:10,
    paddingVertical:1,
  },
  textCoppy: {
    textDecorationLine:'underline',
    color:'white',
  }
})
export default styles