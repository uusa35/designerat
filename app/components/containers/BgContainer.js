import React, {useState, useMemo, useContext, useEffect} from 'react';
import {
  AppState,
  ImageBackground,
  Linking,
  StatusBar,
  View,
  Alert,
} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import {useDispatch, useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import OneSignal from 'react-native-onesignal';
import {APP_CASE} from '../../../app.json';
import {oneSignalId} from '../../env';
import {getPathForDeepLinking} from '../../helpers';
import I18n from './../../I18n';
import {goDeepLinking, setDeepLinking, setPlayerId} from '../../redux/actions';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import {isIOS} from '../../constants';
import validate from 'validate.js';
import AlertMessage from '../AlertMessage';
import ProductFilterModal from '../../screens/product/ProductFilterModal';
import {useNetInfo} from '@react-native-community/netinfo';

const BgContainer = ({
  children,
  showImage = true,
  img = images.whiteBgUrl,
  enableMargin = false,
  marginVal = height / 30,
  white = false,
}) => {
  const {
    bootStrapped,
    isLoading,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
    deviceId,
    message,
  } = useSelector(state => state);
  const {mainBg, colors} = useContext(GlobalValuesContext);
  const [currentLoading, setCurrentLoading] = useState(
    isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
  );
  const [bg, setBg] = useState();
  const [appState, setAppState] = useState(AppState.currentState);
  const [device, setDevice] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const {isConnected} = useNetInfo();

  useMemo(() => {
    setBg(!showImage ? images.whiteBg : mainBg.includes('.') ? mainBg : img);
  }, []);

  useMemo(() => {
    setCurrentLoading(
      isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
    );
  }, [isLoading, isLoadingBoxedList, isLoadingProfile, isLoadingContent]);

  useEffect(() => {
    analytics().logEvent(route.name, {
      item: `${APP_CASE}_${route.name}`,
      description: `${route.name}_${moment().format('YYYY-MM-DD')}`,
      start_date: moment().format('YYYY-MM-DD'),
    });
    AppState.addEventListener('change', handleAppStateChange);
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(oneSignalId);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    if (isIOS) {
      OneSignal.promptForPushNotificationsWithUserResponse(response => {
        // console.log('Prompt response:', response);
      }, []);
    }
    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        const url = notification.payload
          ? notification.payload.launchURL
          : notification.launchURL;
        const payload = getPathForDeepLinking(url);
        dispatch(setDeepLinking(payload));
        const button1 = {
          text: I18n.t('cancel'),
          onPress: () => {
            notificationReceivedEvent.complete();
          },
          style: 'cancel',
        };

        const button2 = {
          text: I18n.t('open'),
          onPress: () => dispatch(goDeepLinking(payload)),
        };

        Alert.alert(
          I18n.t('notifications'),
          I18n.t(APP_CASE),
          [button1, button2],
          {
            cancelable: true,
          },
        );
      },
    );
    OneSignal.setNotificationOpenedHandler(notification => {
      const url = notification.payload
        ? notification.payload.launchURL
        : notification.notification.launchURL;
      if (url) {
        const payload = getPathForDeepLinking(url);
        dispatch(setDeepLinking(payload));
        setTimeout(() => {
          dispatch(goDeepLinking(payload));
        }, 1000);
      }
    });
    // OneSignal.setInAppMessageClickHandler((event) => {
    //   console.log('OneSignal IAM clicked:', event);
    // });
    // OneSignal.addEmailSubscriptionObserver((event) => {
    //   console.log('OneSignal: email subscription changed: ', event);
    // });
    // OneSignal.addSubscriptionObserver((event) => {
    //   console.log('OneSignal: subscription changed:', event);
    //   setDevice(event.to.userId);
    // });
    // OneSignal.addPermissionObserver((event) => {
    //   console.log('OneSignal: permission changed:', event);
    // });
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  });

  useEffect(() => {
    // console.log('appSateChanged', appState);
    if (appState === 'background') {
    } else {
    }
    // return () => {
    // };
  }, [bootStrapped, appState]);

  const handleOpenURL = event => {
    const {type, id} = getPathForDeepLinking(event.url);
    dispatch(setDeepLinking({type, id}));
    return dispatch(goDeepLinking({type, id}));
  };

  const handleAppStateChange = nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // console.log('active');
    }
    setAppState(nextAppState);
  };

  useMemo(() => {
    if (device) {
      dispatch(setPlayerId(device));
    }
  }, [device]);

  return (
    <ImageBackground
      source={!showImage ? (white ? images.whiteBg : images.grayBg) : {uri: bg}}
      style={{height, width, backgroundColor: 'white', flexGrow: 1, flex: 1}}
      resizeMode="cover">
      {currentLoading ? (
        <LoadingView />
      ) : (
        <View style={{flex: 1, paddingTop: enableMargin ? marginVal : 0}}>
          <StatusBar
            animated={true}
            backgroundColor={colors.footer_bg_theme_color}
            barStyle={'light-content'}
          />
          {children}
        </View>
      )}
      {!validate.isEmpty(message) &&
        message.visible &&
        validate.isString(message.content) &&
        isConnected &&
        bootStrapped && <AlertMessage message={message} />}
      {bootStrapped && <ProductFilterModal />}
    </ImageBackground>
  );
};

export default BgContainer;
