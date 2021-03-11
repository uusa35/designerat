import React, {Fragment, useState, useMemo, useContext, useEffect} from 'react';
import {
  AppState,
  ImageBackground,
  Linking,
  SafeAreaView,
  StatusBar,
  View,
  Alert,
} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import {useDispatch, useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import OneSignal from 'react-native-onesignal';
import {DESIGNERAT_ONE_SIGNAL_APP_ID} from '../../../app.json';
import {getPathForDeepLinking} from '../../helpers';
import {goDeepLinking, setDeepLinking, setPlayerId} from '../../redux/actions';

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
  const {mainBg} = useContext(GlobalValuesContext);
  const [currentLoading, setCurrentLoading] = useState(
    isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
  );
  const [bg, setBg] = useState();
  const [appState, setAppState] = useState(AppState.currentState);
  const [device, setDevice] = useState('');
  const dispatch = useDispatch();

  useMemo(() => {
    setBg(!showImage ? images.whiteBg : mainBg.includes('.') ? mainBg : img);
  }, []);

  useMemo(() => {
    setCurrentLoading(
      isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
    );
  }, [isLoading, isLoadingBoxedList, isLoadingProfile, isLoadingContent]);

  useEffect(() => {
    // if (!isEmpty(navigation)) {
    //   const {routeName} = navigation.state;
    //   if (__DEV__) {
    //     // console.log('dev routeName', routeName);
    //   }
    //   analytics().logEvent(routeName, {
    //     item: `${APP_CASE}_${routeName}`,
    //     description: `${routeName}_${moment().format('YYYY-MM-DD')}`,
    //     start_date: moment().format('YYYY-MM-DD'),
    //   });
    //   analytics().setCurrentScreen(routeName);
    // }
    AppState.addEventListener('change', handleAppStateChange);
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(DESIGNERAT_ONE_SIGNAL_APP_ID);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      // console.log('Prompt response:', response);
    });

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
      {isConnected ? (
        currentLoading ? (
          <LoadingView />
        ) : (
          <View style={{flex: 1, paddingTop: enableMargin ? marginVal : 0}}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              barStyle={'light-content'}
              // showHideTransition={statusBarTransition}
              // hidden={hidden}
            />
            {children}
          </View>
        )
      ) : (
        <LoadingOfflineView />
      )}
      <AndroidBackHandlerComponent />
    </ImageBackground>
  );
};

export default BgContainer;
