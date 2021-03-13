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
  DESIGNERAT_ONE_SIGNAL_APP_ID,
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
  }, [bootStrapped]);

  useEffect(() => {
    OneSignal.setAppId(DESIGNERAT_ONE_SIGNAL_APP_ID);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      // console.log('Prompt response:', response);
    });
  }, [bootStrapped]);

  useEffect(() => {});

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
