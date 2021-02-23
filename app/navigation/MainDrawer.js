import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import SideMenu from '../components/SideMenu';
import CartStack from './designerat/CartStack';
import CategoryStack from './designerat/CategoryStack';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {appBootstrap} from '../redux/actions';
import AppContainer from '../components/containers/AppContainer';
import AccountStack from './designerat/AccountStack';
import DesigneratHomeScreen from '../screens/home/DesigneratHomeScreen';
import HomeStack from './designerat/HomeStack';
import {HeaderMiddle} from '../components/HeaderMiddle';
import {HeaderRight} from '../components/HeaderRight';
import {HeaderBack} from '../components/HeaderBack';
import NormalProductShowScreen from '../screens/product/NormalProductShowScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideMenu {...props} showLogo={true} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
