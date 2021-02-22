import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import SideMenu from '../components/SideMenu';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {appBootstrap} from '../redux/actions';
import AppContainer from '../components/containers/AppContainer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <AppContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <SideMenu {...props} showLogo={true} />}>
        <Drawer.Screen name="Home" component={MainTab} />
      </Drawer.Navigator>
    </AppContainer>
  );
};

export default MainDrawer;
