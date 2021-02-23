import React, {useContext} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import I18n from '../../I18n';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import AbatiHomeScreen from '../../screens/home/AbatiHomeScreen';
import CelebrityIndexScreen from '../../screens/celebrity/CelebrityIndexScreen';
import DesignerShowScreen from '../../screens/designer/DesignerShowScreen';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import ContactusScreen from '../../screens/ContactusScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import RoleIndexScreen from '../../screens/role/RoleIndexScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {HeaderBack} from '../../components/HeaderBack';
import MainTab from '../MainTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';

const Stack = createStackNavigator();
const HomeStack = () => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarVisible: false,
        // headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.header_theme_bg,
        },
        headerTitleStyle: {
          color: colors.header_theme_color,
        },
      }}>
      <Stack.Screen
        options={({navigation}) => ({
          headerLeft: () => (
            <Ionicons
              name="ios-menu"
              size={25}
              style={[{color: 'black'}]}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerTitle: () => <HeaderMiddle showLogo={true} />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
        })}
        name={'Home'}
        component={MainTab}
      />
      <Stack.Screen name={'UserShow'} component={CelebrityIndexScreen} />
      <Stack.Screen
        name={'DesignerShow'}
        options={{
          headerTitle: () => <HeaderMiddle />,
        }}
        component={DesignerShowScreen}
      />
      <Stack.Screen
        name={'ProductShow'}
        options={{
          headerTitle: () => <HeaderMiddle />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
          headerLeft: (props) => <HeaderBack {...props} />,
        }}
        component={NormalProductShowScreen}
      />
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{
          headerRight: () => <HeaderRight />,
          headerTitle: () => <HeaderMiddle title={I18n.t('login')} />,
          headerBackTitle: () => null,
        }}
      />
      <Stack.Screen
        name={'Register'}
        component={RegisterScreen}
        options={{
          headerRight: () => <HeaderRight />,
          headerTitle: () => <HeaderMiddle title={I18n.t('register')} />,
          headerBackTitle: () => null,
        }}
      />
      <Stack.Screen
        name={'RoleIndex'}
        component={RoleIndexScreen}
        options={{
          headerRight: () => <HeaderRight />,
          headerTitle: () => <HeaderMiddle title={I18n.t('roles')} />,
          headerBackTitle: () => null,
        }}
      />
      <Stack.Screen
        name={'ImageZoom'}
        component={ImageZoomWidget}
        options={{
          headerRight: () => <HeaderRight />,
          headerTitle: () => <HeaderMiddle />,
          headerBackTitle: () => null,
        }}
      />
      <Stack.Screen name={'Contactus'} component={ContactusScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
