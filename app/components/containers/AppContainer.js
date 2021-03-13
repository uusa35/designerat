import React, {useEffect, useState, Fragment, useMemo} from 'react';
import {AppState, useColorScheme, StatusBar, Text, Linking} from 'react-native';
import codePush from 'react-native-code-push';
import {useDispatch, useSelector} from 'react-redux';
import {
  appBootstrap,
  enableMessage,
  goDeepLinking,
} from './../../redux/actions';
import validate from 'validate.js';
import AlertMessage from './../../components/AlertMessage';
import CountriesList from './../../components/Lists/CountriesList';
import {GlobalValuesContext} from './../../redux/GlobalValuesContext';
import {axiosInstance} from './../../redux/actions/api';
import LoginScreenModal from './../../screens/auth/LoginScreenModal';
import AreasList from './../../components/Lists/AreasList';
import SimpleSpinner from './../../components/SimpleSpinner';
import ProductFilterModal from './../../screens/product/ProductFilterModal';
import LoadingOfflineView from './../../components/Loading/LoadingOfflineView';
import {useNetInfo} from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import OldVersionComponent from './../../components/widgets/OldVersionComponenet';
import {
  minOldVersionApple,
  minOldVersionAndroid,
  DESIGNERAT_ONE_SIGNAL_APP_ID,
} from './../../../app.json';
import {isIOS} from './../../constants';
import OneSignal from 'react-native-onesignal';
import {getPathForDeepLinking} from '../../helpers';
import LoadingContainer from '../Loading/LoadingContainer';
import I18n from './../../I18n';

const AppContainer = ({children}) => {
  const {
    bootStrapped,
    message,
    countries,
    country,
    area,
    areas,
    areaModal,
    logo,
    cart,
    total,
    grossTotal,
    token,
    loginModal,
    searchModal,
    lang,
    currency,
    resetApp,
    settings,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (!validate.isEmpty(token) && token.length > 5) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    axiosInstance.defaults.headers['currency'] = currency.currency_symbol;
    axiosInstance.defaults.headers.common['currency'] =
      currency.currency_symbol;
    axiosInstance.defaults.headers['country'] = country.slug;
    axiosInstance.defaults.headers.common['country'] = country.slug;
  }, [token, lang]);

  useEffect(() => {
    if (!validate.isEmpty(token) && token.length > 5) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    axiosInstance.defaults.headers['currency'] = currency.currency_symbol;
    axiosInstance.defaults.headers.common['currency'] =
      currency.currency_symbol;
    axiosInstance.defaults.headers['country'] = country.slug;
    axiosInstance.defaults.headers.common['country'] = country.slug;
  }, []);

  useEffect(() => {
    codePush.sync({installMode: codePush.InstallMode.IMMEDIATE});
    codePush.checkForUpdate().then((update) => {
      if (!update) {
        // console.warn('====> The app is up to date!');
      } else {
        if (__DEV__) {
          // console.warn('===> there is an update here');
        }
      }
    });
    if (!bootStrapped) {
      dispatch(appBootstrap());
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      dispatch(appBootstrap());
    }
  }, [isConnected]);

  return (
    <Fragment>
      {isConnected ? (
        <Fragment>
          {bootStrapped ? (
            <GlobalValuesContext.Provider
              value={{
                cartLength: cart.length,
                countriesLength: countries.length,
                currency_symbol: currency ? currency.currency_symbol : 'KWD',
                exchange_rate: currency ? currency.exchange_rate : '1',
                total,
                grossTotal,
                colors: settings.colors,
                logo: settings.logo,
                app_logo: settings.app_logo,
                mainBg: settings.main_bg,
                searchModal,
                resetApp,
                lang,
              }}>
              <>
                {DeviceInfo.getVersion() >=
                (isIOS ? minOldVersionApple : minOldVersionAndroid) ? (
                  children
                ) : (
                  <OldVersionComponent />
                )}
              </>
              {validate.isBoolean(loginModal) && (
                <LoginScreenModal
                  logo={logo}
                  loginModal={loginModal}
                  mainBg={settings.main_bg}
                />
              )}
              {country && (
                <CountriesList country={country} countries={countries} />
              )}
              {validate.isBoolean(areaModal) && !validate.isEmpty(areas) && (
                <AreasList area={area} areas={areas} areaModal={areaModal} />
              )}
            </GlobalValuesContext.Provider>
          ) : (
            <SimpleSpinner />
          )}
        </Fragment>
      ) : (
        <LoadingOfflineView />
      )}
      {!validate.isEmpty(message) &&
        message.visible &&
        validate.isString(message.content) &&
        isConnected &&
        bootStrapped && <AlertMessage message={message} />}
      {bootStrapped && !validate.isEmpty(settings) && <ProductFilterModal />}
    </Fragment>
  );
};

export default AppContainer;
