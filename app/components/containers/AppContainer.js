import React, {useEffect, Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {appBootstrap} from '../../redux/actions';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import BgContainer from './BgContainer';

const AppContainer = ({children}) => {
  const {isConnected} = useNetInfo();
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (isConnected) {
      dispatch(appBootstrap());
    }
  }, [isConnected]);
  return (
    <GlobalValuesContext.Provider
      value={{
        cartLength: cart.length,
        countriesLength: countries.length,
        currency_symbol: country ? country.currency.currency_symbol : 'KWD',
        exchange_rate: country ? country.currency.exchange_rate : '1',
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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      {isConnected ? (
        <BgContainer>{children}</BgContainer>
      ) : (
        <LoadingOfflineView />
      )}
    </GlobalValuesContext.Provider>
  );
};

export default AppContainer;
