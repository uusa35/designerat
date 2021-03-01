import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import SideMenu from '../components/SideMenu';
import HomeStack from './designerat/HomeStack';
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
