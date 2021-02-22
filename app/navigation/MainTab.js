import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import I18n from '../I18n';
import {iconSizes, text} from '../constants/sizes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeStack from './designers/HomeStack';
import {Icon} from 'react-native-elements';
import TextTabBar from '../components/TextTabBar';
import IconTabBar from '../components/IconTabBar';
import {useSelector} from 'react-redux';
import CategoryIndexScreen from '../screens/category/CategoryIndexScreen';
import ProductIndexAllScreen from '../screens/product/ProductIndexAllScreen';
import CartIndexScreen from '../screens/cart/CartIndexScreen';
import SettingsIndexScreen from '../screens/setting/SettingsIndexScreen';
import {useContext} from 'react';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainTab = () => {
  const {colors, cartLength} = useContext(GlobalValuesContext);
  const {categories} = useSelector((state) => state);
  return (
    <Tab.Navigator
      laze={false}
      initialRouteName="Home"
      barStyle={{
        backgroundColor: colors.footer_bg_theme_color,
      }}
      activeColor={colors.footer_theme_color}
      inactiveColor="white"
      shifting={true}
      labeled={true}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarLabel: (
            <TextTabBar
              showLabel={true}
              title={I18n.t('designers')}
              focused={route.focused}
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="home"
              type="octicon"
              focused={focused}
              showLabel={true}
            />
          ),
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
        name="CategoryIndex"
        component={CategoryIndexScreen}
        options={({route}) => ({
          tabBarLabel: (
            <TextTabBar
              showLabel={true}
              title={I18n.t('categories')}
              focused={route.focused}
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="layers"
              type="entypo"
              focused={focused}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="ProductIndex"
        component={ProductIndexAllScreen}
        options={({route}) => ({
          tabBarLabel: (
            <TextTabBar
              showLabel={true}
              title={I18n.t('market')}
              focused={route.focused}
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="shirt-sharp"
              type="ionicon"
              focused={focused}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="CartIndex"
        component={CartIndexScreen}
        options={({route}) => ({
          tabBarLabel: (
            <TextTabBar
              showLabel={true}
              title={I18n.t('cart')}
              focused={route.focused}
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="cart"
              type="ionicon"
              focused={focused}
              showLabel={true}
            />
          ),
        })}
      />
      <Tab.Screen
        name="SettingIndex"
        component={SettingsIndexScreen}
        options={({route}) => ({
          tabBarLabel: (
            <TextTabBar
              showLabel={true}
              title={I18n.t('my_account')}
              focused={route.focused}
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <IconTabBar
              name="ios-person-circle"
              type="ionicon"
              focused={focused}
              showLabel={true}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
