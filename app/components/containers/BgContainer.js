import React, {useState, useMemo, useContext, useEffect} from 'react';
import {
  AppState,
  ImageBackground,
  Linking,
  StatusBar,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import {useDispatch, useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import OneSignal from 'react-native-onesignal';
import {DESIGNERAT_ONE_SIGNAL_APP_ID, APP_CASE} from '../../../app.json';
import {getPathForDeepLinking} from '../../helpers';
import {
  goBackBtn,
  goDeepLinking,
  setDeepLinking,
  setPlayerId,
} from '../../redux/actions';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import {isIOS} from '../../constants';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {deleteAddress} from '../../redux/actions/user';
import I18n from '../../I18n';
import ConfirmationModal from '../ConfirmationModal';

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
    isConnected,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
    deviceId,
  } = useSelector((state) => state);
  const {mainBg, colors} = useContext(GlobalValuesContext);
  const [currentLoading, setCurrentLoading] = useState(
    isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
  );
  const [bg, setBg] = useState();
  const [appState, setAppState] = useState(AppState.currentState);
  const [modalVisible, setModalVisible] = useState(false);
  const [device, setDevice] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  useMemo(() => {
    setBg(!showImage ? images.whiteBg : mainBg.includes('.') ? mainBg : img);
  }, []);

  useAndroidBackHandler(() => {
    // return dispatch(goBackBtn(route.name));
    if (route.name !== 'Home') {
      navigation.goBack();
    } else {
      setModalVisible(true);
    }
  });

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
    OneSignal.setAppId(DESIGNERAT_ONE_SIGNAL_APP_ID);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    if (isIOS) {
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        // console.log('Prompt response:', response);
      }, []);
    }
    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        // console.log(
        //   'OneSignal: notification will show in foreground:',
        //   notifReceivedEvent,
        // );
        let notif = notifReceivedEvent.getNotification();

        const button1 = {
          text: 'Cancel',
          onPress: () => {
            notifReceivedEvent.complete();
          },
          style: 'cancel',
        };

        const button2 = {
          text: 'Complete',
          onPress: () => {
            notifReceivedEvent.complete(notif);
          },
        };

        Alert.alert('Complete notification?', 'Test', [button1, button2], {
          cancelable: true,
        });
      },
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
      // console.log('OneSignal: notification opened:', notification);
      // const url = getPathForDeepLinking(notification.payload.launchURL);
      // dispatch(setDeepLinking(notification));
      // setTimeout(() => {
      //   dispatch(goDeepLinking(notification));
      // }, 1000);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      // console.log('OneSignal IAM clicked:', event);
      const {type, id} = getPathForDeepLinking(event.click_url);
      return dispatch(goDeepLinking({type, id}));
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      // console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      // console.log('OneSignal: subscription changed:', event);
      setDevice(event.to.userId);
    });
    OneSignal.addPermissionObserver((event) => {
      // console.log('OneSignal: permission changed:', event);
    });
  });

  useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    // console.log('appSateChanged', appState);
    if (appState === 'background') {
    } else {
    }
    return () => {};
  }, [bootStrapped, appState]);

  const handleOpenURL = (event) => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
  };

  const handleAppStateChange = (nextAppState) => {
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
          <ConfirmationModal
            handleConfirmClick={() => BackHandler.exitApp()}
            confirmTitle={I18n.t('confirm')}
            message={I18n.t('do_you_want_to_exit_the_app')}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            iconName="exit"
            iconType="antdesign"
          />
          {children}
        </View>
      )}
    </ImageBackground>
  );
};

export default BgContainer;
