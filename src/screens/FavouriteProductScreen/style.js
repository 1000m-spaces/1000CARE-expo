import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  listViewContainer: {
    flex: 1,
    maxHeight: 57,
    marginBottom: 2,
    backgroundColor: Colors.white,
    marginTop: 6,
  },
  listViewContent: {
    height: 57,
  },
  tabItem: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  tabSelected: {
    borderBottomColor: Colors.systemColor2,
    borderBottomWidth: 2,
  },
  tabTitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textColor3,
    fontWeight: 'normal',
  },
  tabTitleSelected: {
    color: Colors.systemColor2,
    fontWeight: '600',
  },
})