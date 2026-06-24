import { Fonts } from '~/assets/config';

const fontFamily = Fonts.base;
const fontFamilyMedium = Fonts.base;
const fontFamilyBold = Fonts.bold;
const fontWeightRegular = 'normal';
const fontWeightBold = 'normal';

export default {
  /**
   * Use the Heading style for card titles.
   */
  headingText: theme => ({
    fontFamily,
    color: theme.headingTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  headingTextBold: theme => ({
    fontFamily: fontFamilyBold,
    color: theme.headingTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  /**
   * Use the Subheading style to denote new sections within cards.
   */
  subheadingText: theme => ({
    fontFamily: fontFamilyMedium,
    color: theme.subHeadingTextColor,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  subheadingTextBold: theme => ({
    fontFamily: fontFamilyBold,
    color: theme.subHeadingTextColor,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  /**
   * The Body text style is used widely throughout the UI.
   * Any text that isn’t a title, heading, subheading, label
   * would generally use the Body style.
   */
  bodyText: theme => ({
    fontFamily: fontFamilyMedium,
    color: theme.bodyTextColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  bodyTextBold: theme => ({
    fontFamily: fontFamilyBold,
    color: theme.bodyTextColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  /**
   * Use labels with form field and input elements to
   * signify the element’s function to the user.
   */
  labelText: theme => ({
    fontFamily: fontFamilyMedium,
    color: theme.labelTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  labelTextBold: theme => ({
    fontFamily: fontFamilyBold,
    color: theme.labelTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  /**
   * Text style meant to be used only for Button component when size = "md"
   */
  buttonText: {
    fontFamily: fontFamilyBold,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
  },
  /**
   * Text style meant to be used only for Button component when size = "sm"
   */
  buttonTextSmall: {
    fontFamily: fontFamilyMedium,
    fontSize: 12,
    textAlign: 'center',
  },
  /**
   * Form label text style used only in TextInput component
   */
  formLabel: theme => ({
    fontFamily: fontFamilyBold,
    fontSize: 16,
    color: theme.labelTextColor,
    fontWeight: fontWeightBold,
  }),
  /**
   * Text style meant only for TextInput component
   */
  formInput: theme => ({
    fontFamily,
    fontSize: 16,
    color: theme.bodyTextColor,
  }),
  /**
   * Form Error text style used only in TextInput component
   */
  formError: theme => ({
    fontFamily,
    fontSize: 13,
    color: theme.errorColor,
  }),
};
