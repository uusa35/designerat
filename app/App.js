import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import MainDrawer from './navigation/designerat/MainDrawer';
import MyExpoMainDrawer from './navigation/myexpo/MyExpoMainDrawer';
import {Provider} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';
import {navigationRef, isReadyRef} from './RootNavigation';
import SimpleSpinner from './components/SimpleSpinner';
import AppContainer from './components/containers/AppContainer';
import linking from './linking';
import LoadingView from './components/Loading/LoadingView';
import {APP_CASE} from './../app.json';

const DesigneratSwitchNavigator = createSwitchNavigator(
  {
    MainDrawer,
  },
  {
    initialRouteName: 'MainDrawer',
  },
);

const MyExpoSwitchNavigator = createSwitchNavigator(
  {
    MyExpoMainDrawer,
  },
  {
    initialRouteName: 'MainDrawer',
  },
);

export default function App() {
  const renderNavigator = () => {
    switch (APP_CASE) {
      case 'DESIGNERAAT':
        return <DesigneratSwitchNavigator />;
      case 'MYEXPO':
        return <MyExpoSwitchNavigator />;
      default:
        return <DesigneratSwitchNavigator />;
    }
  };
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
            <AppContainer>{renderNavigator()}</AppContainer>
          </NavigationContainer>
        </React.Suspense>
      </Provider>
    </PersistGate>
  );
}
