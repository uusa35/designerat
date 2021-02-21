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
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: 'black',
        activeBackgroundColor: 'black',
      }}
      barStyle={{
        backgroundColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        navigationOptions
        options={{
          tabBarLabel: () => (
            <TextTabBar title={I18n.t('designers')} showLabel={true} />
          ),
          tabBarIcon: ({color}) => (
            <Ionicons
              name={'ios-home'}
              color={color}
              size={iconSizes.smaller}
            />
          ),
        }}
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
        options={{
          tabBarLabel: I18n.t('categories'),
          tabBarIcon: ({color}) => (
            <Ionicons name="ios-shirt" color={color} size={iconSizes.smaller} />
          ),
        }}
      />
      <Tab.Screen
        name="ProductIndex"
        component={HomeScreen}
        options={{
          tabBarLabel: I18n.t('market'),
          tabBarIcon: ({color}) => (
            <Ionicons
              name={'ios-bookmarks'}
              color={color}
              size={iconSizes.smaller}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartIndex"
        component={CartIndexScreen}
        options={{
          tabBarLabel: I18n.t('cart'),
          tabBarIcon: ({color}) => (
            <Ionicons
              name={'ios-cart'}
              color={color}
              size={iconSizes.smaller}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingIndex"
        component={SettingsScreen}
        options={{
          tabBarLabel: I18n.t('market'),
          tabBarIcon: ({color}) => (
            <Ionicons
              name={'ios-bookmark'}
              color={color}
              size={iconSizes.smaller}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
