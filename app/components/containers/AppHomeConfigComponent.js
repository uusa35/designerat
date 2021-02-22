import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {Linking} from 'react-native';
import {
  ABATI,
  ABATI_ONE_SIGNAL_APP_ID,
  MALLR,
  MALLR_ONE_SIGNAL_APP_ID,
  HOMEKEY,
  HOMKEY_ONE_SIGNAL_APP_ID,
  ESCRAP,
  ESCRAP_ONE_SIGNAL_APP_ID,
  EXPO,
  EXPO_ONE_SIGNAL_APP_ID,
  DAILY,
  DAILY_ONE_SIGNAL_APP_ID,
} from '../../../app';
import OneSignal from 'react-native-onesignal';
import {getPathForDeepLinking} from './../../helpers';
import {
  goDeepLinking,
  setDeepLinking,
  setPlayerId,
} from './../../redux/actions';
import validate from 'validate.js';
// import analytics from '@react-native-firebase/analytics';
import {useDispatch, useSelector} from 'react-redux';

const AppHomeConfigComponent = () => {
  const dispatch = useDispatch();
  const {bootStrapped, resetApp, playerId, linking} = useSelector(
    (state) => state,
  );
  const [deviceId, setDeviceId] = useState('');
  const [device, setDevice] = useState('');
  const [signalId, setSignalId] = useState();

  useMemo(() => {
    // analytics().setAnalyticsCollectionEnabled(true);
    if (ABATI) {
      setSignalId(ABATI_ONE_SIGNAL_APP_ID);
    } else if (MALLR) {
      setSignalId(MALLR_ONE_SIGNAL_APP_ID);
    } else if (HOMEKEY) {
      setSignalId(HOMKEY_ONE_SIGNAL_APP_ID);
    } else if (ESCRAP) {
      setSignalId(ESCRAP_ONE_SIGNAL_APP_ID);
    } else if (EXPO) {
      setSignalId(EXPO_ONE_SIGNAL_APP_ID);
    } else if (DAILY) {
      setSignalId(DAILY_ONE_SIGNAL_APP_ID);
    }
  }, [bootStrapped]);

  useEffect(() => {
    OneSignal.setAppId('ce8572ae-ff57-4e77-a265-5c91f00ecc4c');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notifReceivedEvent,
        );
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
      console.log('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      console.log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      console.log('OneSignal: subscription changed:', event);
      // this.setState({isSubscribed: event.to.isSubscribed});
    });
    OneSignal.addPermissionObserver((event) => {
      console.log('OneSignal: permission changed:', event);
    });

    // const deviceState = await OneSignal.getDeviceState();
    return () => {
      //   OneSignal.removeEventListener('received', onReceived);
      //   OneSignal.removeEventListener('opened', onOpened);
      // OneSignal.removeEventListener('ids', onIds);
      //   Linking.removeEventListener('url', handleOpenURL);
    };
  }, [bootStrapped]);

  const handleOpenURL = (event) => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
  };

  const onReceived = (notification) => {
    // __DEV__ ? console.log('Notification received: ', notification) : null;
  };

  const onOpened = (openResult) => {
    if (__DEV__) {
      // console.log('the whole thing', openResult.notification.payload);
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const notification = getPathForDeepLinking(
      openResult.notification.payload.launchURL,
    );
    dispatch(setDeepLinking(notification));
    setTimeout(() => {
      dispatch(goDeepLinking(notification));
    }, 1000);
  };

  const onIds = (device) => {
    if (!validate.isEmpty(device.userId) && playerId !== device.userId) {
      setDeviceId(device.userId);
      if (device.userId !== deviceId) {
        dispatch(setPlayerId(device.userId));
      }
    }
  };

  return <Fragment></Fragment>;
};

export default React.memo(AppHomeConfigComponent);
