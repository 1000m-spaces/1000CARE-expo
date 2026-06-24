import { Dimensions, Platform, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
const fullWith = Dimensions.get('window').width

const styles = StyleSheet.create({
  imageInfo: {
    width: fullWith,
    height: 220,
  },
  viewTitle: {
    flexDirection: 'row',
    padding: 10,
  },
  viewNeo: {
    width: fullWith-60,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  styleTitle: {
    marginTop: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 22,
  },
  numberMoney: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
    marginTop: 20,
  },
  textMoney: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
  },
  viewSelect: {
    height: 90,
    elevation: 5,
    marginHorizontal: 20,
    width: fullWith-40,
    position: 'absolute',
    top: 220 + 60 - 90/2 + (Platform.OS === 'ios' ? 20 : 0),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    color: Colors.textColor2,
  },
  viewSpace: {
    backgroundColor: '#E5E5E5',
    height: 50,
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
})
export default styles