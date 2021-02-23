import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import MainDrawer from './navigation/MainDrawer';
import MainTab from './navigation/MainTab';
import HomeStack from './navigation/designerat/HomeStack';
import CategoryStack from './navigation/designerat/CategoryStack';
import CartStack from './navigation/designerat/CartStack';
import AccountStack from './navigation/designerat/AccountStack';
import {Provider, useDispatch} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';
import {navigationRef, isReadyRef} from './RootNavigation';
import {useNetInfo} from '@react-native-community/netinfo';
import {appBootstrap} from './redux/actions';
import SimpleSpinner from './components/SimpleSpinner';
import MainStack from './navigation/MainStack';
import AppContainer from './components/containers/AppContainer';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
const SwitchNavigator = createSwitchNavigator(
  {
    MainDrawer,
  },
  {
    initialRouteName: 'MainDrawer',
  },
);

export default function App() {
  return (
    <PersistGate loading={<ActivityIndicator />} persistor={PersistStore}>
      <Provider store={Store}>
        <React.Suspense fallback={<SimpleSpinner />}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
            }}>
            <AppContainer>
              <SwitchNavigator />
            </AppContainer>
          </NavigationContainer>
        </React.Suspense>
      </Provider>
    </PersistGate>
  );
}
