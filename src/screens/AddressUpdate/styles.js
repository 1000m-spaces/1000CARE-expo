import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import dimens from '~/constants/dimens'

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor: Colors.backgroundColor,
  },
  mainContainer: { 
    flex:1,
    display: 'flex',
    justifyContent:'space-between',
    backgroundColor: Colors.backgroundColor,
    marginTop: 12,
  },
  buttonDelete: {
    position: 'absolute',
    right: 15,
    top: 18
  },
  textDelete: {
    color: 'red',
    fontSize: 18
  },
  addressSaveContainer:{
    marginVertical: 12,
    marginLeft: 12,
    backgroundColor: Colors.white,
  },
  formContainer:{
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  formItemContainer:{
    marginHorizontal: 18,
  },
  formItem:{
    flex: 1,
    marginLeft: 18,
  },
  form2ItemContainer:{
    marginRight: 18,
    marginBottom: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalSelectPlaceHolder: {
    textAlign: 'left',
  },
  addressItemContainer: {
    backgroundColor: 'rgba(0, 149, 217, 0.02)',
    borderRadius: 12,
    height:  dimens.common.WINDOW_WIDTH * 0.3,
    width: dimens.common.WINDOW_WIDTH * 0.6,
    marginRight: 18,
    padding: 12,
  },
  addressItemContainerActive: {
    backgroundColor: Colors.systemColor2,
    borderRadius: 12,
    height:  dimens.common.WINDOW_WIDTH * 0.3,
    width: dimens.common.WINDOW_WIDTH * 0.6,
    marginRight: 18,
    padding: 12,
  },
  userNameContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: Colors.textColor2,
  },
  labelActive: {
    fontSize: 12,
    color: Colors.white,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textColor2,
  },
  valueActive: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  imageChoose: {
    width: 14,
    height: 14,
  },

  bottomContainer: {
    paddingVertical: 18,
    paddingTop: 20,
    paddingBottom: 18,
    backgroundColor: Colors.white,
    alignSelf: 'flex-end',
  },
  
  nextStepBtnContainer: {
    flexDirection: 'row',
    margin: 0, 
    padding: 0,
    alignItems: 'center', 
    paddingHorizontal: 18,
  },

  nextStepBtn: {
    height: 50,
    width: '100%',
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: 50,
    backgroundColor: Colors.systemColor2,
  },
  textSaveInfo:{
    marginLeft: 18,
    color: Colors.textColor2,
    fontSize: 14,
  },
  lastItemContainer: {
    marginTop: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginBottom: 16,
  },

  // inputContainerStyle: {
  //   borderWidth: 0,
  //   borderColor: Colors.borderColor,
  //   borderBottomWidth: 1,
  //   marginBottom: 16,
  // },

  labelStyle: {
    color: Colors.textColor3,
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 20,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  mt12: {
    paddingTop: 12,
  },
})

export default styles