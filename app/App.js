import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import MainDrawer from './navigation/MainDrawer';
import {Provider, useDispatch} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';
import {navigationRef, isReadyRef} from './RootNavigation';
import {useNetInfo} from '@react-native-community/netinfo';
import {appBootstrap} from './redux/actions';
import SimpleSpinner from './components/SimpleSpinner';

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
            <SwitchNavigator />
          </NavigationContainer>
        </React.Suspense>
      </Provider>
    </PersistGate>
  );
}
