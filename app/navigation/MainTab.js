import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions, useRoute} from '@react-navigation/native';
import I18n from '../I18n';
import {iconSizes, text} from '../constants/sizes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeStack from './designerat/HomeStack';
import CategoryStack from './designerat/CategoryStack';
import ProductStack from './designerat/ProductStack';
import CartStack from './designerat/CartStack';
import AccountStack from './designerat/AccountStack';
import TextTabBar from '../components/TextTabBar';
import IconTabBar from '../components/IconTabBar';
import {useSelector} from 'react-redux';
import ProductIndexAllScreen from '../screens/product/ProductIndexAllScreen';
import CartIndexScreen from '../screens/cart/CartIndexScreen';
import SettingsIndexScreen from '../screens/setting/SettingsIndexScreen';
import DesigneratHomeScreen from '../screens/home/DesigneratHomeScreen';
import CategoryIndexScreen from '../screens/category/CategoryIndexScreen';
import {useContext} from 'react';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {useNavigationState} from '@react-navigation/native';

import {useNavigation} from '@react-navigation/native';
import {HeaderRight} from '../components/HeaderRight';
import {HeaderLeft} from '../components/HeaderLeft';
import {HeaderMiddle} from '../components/HeaderMiddle';
import FastImage from 'react-native-fast-image';
import DesigneratCartIndexScreen from '../screens/cart/DesigneratCartIndexScreen';
import ImageLoaderContainer from '../components/widgets/ImageLoaderContainer';
import {icons} from '../constants/images';
import {Icon} from 'react-native-elements';

const MaterialTab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainTab = () => {
  const {colors, cartLength} = useContext(GlobalValuesContext);
  return (
    <Tab.Navigator
      laze={false}
      initialRouteName="Home"
      activeBackgroundColor="black"
      inActiveBackgroundColor="black"
      backBehavior="history"
      tabBarOptions={{
        style: {
          backgroundColor: colors.footer_bg_theme_color,
        },
        activeBackgroundColor: colors.footer_bg_theme_color,
        inactiveBackgroundColor: colors.footer_bg_theme_color,
      }}
      activeColor={colors.footer_theme_color}
      inactiveColor="white"
      shifting={true}
      labeled={true}>
      <Tab.Screen
        name="Home"
        component={DesigneratHomeScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('designers')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.brandat}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.icon_theme_color
              }
            />
          ),
          tabBarVisible: true,
        })}
        headerLeft={({navigation}) => (
          <Ionicons
            name="ios-menu"
            size={25}
            style={[{color: 'black'}]}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        )}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryIndexScreen}
        options={({}) => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('sections')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.hanger}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.icon_theme_color
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="ProductTab"
        component={ProductIndexAllScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('market')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <IconTabBar
              name="compass"
              type=""
              focused={focused}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="CartTab"
        component={DesigneratCartIndexScreen}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('cart')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <IconTabBar
              name="cart"
              type="ionicon"
              focused={focused}
              showLabel={true}
            />
          ),
          tabBarBadge: cartLength ? cartLength : null,
        })}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingsIndexScreen}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('my_account')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.account}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.icon_theme_color
              }
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
