import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 6,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  title: {
    color: Colors.textColor2,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 6,
    marginBottom: 12,
  },
  all: {
    color: Colors.systemColor2,
    fontWeight: '600',
    fontSize: 14,
  },
  allContainer: {
    position: 'absolute',
    right: 18,
    top: 9,
  },
  productGrid: {
    paddingHorizontal: 0,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  productCell: {
    flexShrink: 0,
  },
  distributorName: {
    color: Colors.textColor1,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 8,
  },
  distributorLogo: {
    width: 56,
    height: 56,
  },
  distributorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 1,
    backgroundColor: Colors.white,
  },
  chevronIcon: {
    position: 'absolute',
    right: 0,
    top: 44/2,
  },
})
