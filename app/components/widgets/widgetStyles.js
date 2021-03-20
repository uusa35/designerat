import {I18nManager, StyleSheet} from 'react-native';
import {formWidget, iconSizes, text, width} from '../../constants/sizes';
import {isRTL} from '../../I18n';
import {APP_CASE} from '../../../app.json';

const widgetStyles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    width: width,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    margin: 5,
    width: '100%',
  },
  panelContent: {
    marginLeft: text.medium,
    marginRight: text.medium,
    marginTop: text.medium,
    padding: text.smallest,
    backgroundColor: 'white',
    borderRadius: text.smallest,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleWrapper: {},
  title: {
    fontFamily: text.font,
    fontSize: text.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'left',
  },
  headerOne: {
    fontFamily: text.font,
    fontSize: text.xlarge,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'left',
  },
  headerTow: {
    fontFamily: text.font,
    fontSize: text.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'left',
  },
  headerThree: {
    fontFamily: text.font,
    fontSize: text.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'center',
  },
  headerFour: {
    fontFamily: text.font,
    fontSize: text.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'left',
  },
  headerFive: {
    fontFamily: text.font,
    fontSize: text.smaller,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'left',
  },
  headerSix: {
    fontFamily: text.font,
    fontSize: text.smallest,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    textAlign: 'left',
  },
  simpleShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  mediumShadow: {
    shadowColor: '#000',
    paddingLeft: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.0,
    elevation: 1,
  },
  elementName: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: text.small,
    fontFamily: text.font,
  },
  btnStyle: {
    marginLeft: 3,
    marginRight: 3,
    alignItems: 'center',
    shadowColor: '#000',
  },
  productServiceWidget: {
    width: '48%',
    minWidth: 150,
    maxWidth: 200,
    margin: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    maxHeight: 300,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    marginLeft: 3,
    marginRight: 3,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 1,
  },
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  newClassifiedBtnWrapper: {
    width: '90%',
    borderRadius: 20,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.38,
    shadowRadius: 5.0,
    elevation: 1,
  },
  newClassifiedWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
  },
  newClassifiedTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingRight: 20,
    paddingLeft: 20,
  },
  inputStyle: {
    fontFamily: text.font,
    textAlign: isRTL ? 'right' : 'left',
    height: formWidget[APP_CASE].smaller.height,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: iconSizes.tiny,
    backgroundColor: 'white',
  },
});

export default widgetStyles;
