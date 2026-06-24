import { StyleSheet } from 'react-native'
import { brandColors, liquidGlass } from '~/design-system/tokens'

export default StyleSheet.create({
  tabBarIndicator: {
    backgroundColor: brandColors.tealPrimary,
    height: 3,
    borderRadius: 3,
  },

  tabBarContainer: {
    backgroundColor: liquidGlass.background,
    color: brandColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: liquidGlass.border,
    elevation: 0,
    shadowOpacity: 0,
  },

  tabBarLabelActive: {
    color: brandColors.tealPrimary,
  },

  tabBarLabelInactive: {
    color: brandColors.mutedLight,
  },

  tabBarHeaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  imageAndBadge: {
    width: 36,
    height: 36,
  },
  
  tabBarImage: {
    width: 32,
    height: 32,
  },

  marginBottomMedium: {
    marginBottom: 10,
  },

  badge: {
    backgroundColor: brandColors.danger,
    marginLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  longBadge: {
    right: -4,
  },

  headerContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },

  tabIcon: {
    width: 32,
    height: 32,
  },

  tabLabelContainer: {
    alignItems: 'center',
  },
})
