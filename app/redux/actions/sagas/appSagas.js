import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {BackHandler, Alert} from 'react-native';
import * as actions from '../types';
import {PersistStore} from './../../store';
import {defaultLang} from './langSagas';
import * as RootNavigation from './../../../RootNavigation.js';
import I18n from './../../../I18n';
import {
  disableLoading,
  enableErrorMessage,
  setVersion,
  enableResetApp,
} from './settingSagas';
import {designeratBootStrap} from './designerat/appSagas';

export function* startAppBootStrap() {
  try {
    const {bootStrapped} = yield select();
    yield call(defaultLang);
    yield call(setVersion);
    if (!bootStrapped) {
      yield call(designeratBootStrap);
    }
  } catch (e) {
    if (__DEV__) {
      yield call(enableErrorMessage, I18n.t('app_general_error'));
    }
  } finally {
    yield all([call(disableLoading), call(enableResetApp)]);
  }
}

export function* goBackBtnScenario(action) {
  if (action.payload !== 'Home') {
    RootNavigation.back();
  } else {
    Alert.alert(I18n.t('do_you_want_to_exit_the_app'), '', [
      {
        text: I18n.t('confirm'),
        onPress: () => BackHandler.exitApp(),
      },
      {
        text: I18n.t('cancel'),
        onPress: () => false,
      },
    ]);
  }
}

export function* startResetStoreScenario() {
  RootNavigation.navigate('Home');
  yield all([put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false})]);
  PersistStore.purge();
  yield delay(1000);
  yield call(startAppBootStrap);
}
