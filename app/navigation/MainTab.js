import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import HomeScreen from '../screens/designerat/HomeScreen';
import CartIndexScreen from '../screens/designerat/cart/CartIndexScreen';
import SettingsScreen from '../screens/designerat/setting/SettingIndexScreen';
import I18n from '../I18n';
import {iconSizes} from '../constants/sizes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeStack from './designers/HomeStack';
import {Icon} from 'react-native-elements';
import TextTabBar from '../components/TextTabBar';
import IconTabBar from '../components/IconTabBar';
import {useSelector} from 'react-redux';
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainTab = () => {
  const {colors} = useSelector((state) => state.settings);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.icon_theme_color,
        inactiveTintColor: colors.icon_bg_theme_color,
        inactiveBackgroundColor: 'blue',
        activeBackgroundColor: 'pink',
      }}
      barStyle={{
        backgroundColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          title: I18n.t('designers'),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="home"
              type="octicon"
              focused={focused}
              color={color}
              showLabel={true}
            />
          ),
        })}
        headerLeft={({navigation}) => (
          <TouchableOpacity style={{paddingLeft: 20}}>
            <Ionicons
              name="ios-menu"
              size={25}
              style={[{color: 'black'}]}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          </TouchableOpacity>
        )}
      />
      <Tab.Screen
        name="CategoryIndex"
        component={HomeScreen}
        options={({route}) => ({
          title: I18n.t('designers'),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="home"
              type="octicon"
              focused={focused}
              color={color}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="ProductIndex"
        component={HomeScreen}
        options={({route}) => ({
          title: I18n.t('designers'),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="home"
              type="octicon"
              focused={focused}
              color={color}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="CartIndex"
        component={CartIndexScreen}
        options={({route}) => ({
          title: I18n.t('designers'),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="home"
              type="octicon"
              focused={focused}
              color={color}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="SettingIndex"
        component={SettingsScreen}
        options={({route}) => ({
          title: I18n.t('designers'),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="home"
              type="octicon"
              focused={focused}
              color={color}
              showLabel={true}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
