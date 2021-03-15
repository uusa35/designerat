import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import MainDrawer from './navigation/MainDrawer';
import {Provider} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';
import {navigationRef, isReadyRef} from './RootNavigation';
import SimpleSpinner from './components/SimpleSpinner';
import AppContainer from './components/containers/AppContainer';
import linking from './linking';
import LoadingView from './components/Loading/LoadingView';

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
            linking={linking}
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
