import React, {useContext} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import I18n from '../../I18n';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import DesigneratHomeScreen from '../../screens/home/DesigneratHomeScreen';
import CelebrityIndexScreen from '../../screens/celebrity/CelebrityIndexScreen';
import DesigneratDesignerShowScreen from '../../screens/designer/DesigneratDesignerShowScreen';
import DesigneratDesignerIndexScreen from '../../screens/designer/DesigneratDesignerIndexScreen';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import DesigneratNormalProductShowScreen from '../../screens/product/DesigneratNormalProductShowScreen';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';
import BrandIndexScreen from '../../screens/brand/BrandIndexScreen';
import ContactusScreen from '../../screens/ContactusScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import LoginScreen from '../../screens/auth/LoginScreen';
import DesigneratLoginScreen from '../../screens/auth/DesigneratLoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import CompanyIndexScreen from '../../screens/company/CompanyIndexScreen';
import DesigneratRegisterScreen from '../../screens/auth/DesigneratRegisterScreen';
import RoleIndexScreen from '../../screens/role/RoleIndexScreen';
import PaymentIndexScreen from '../../screens/PaymentIndexScreen';
import ProfileIndexScreen from '../../screens/auth/ProfileIndexScreen';
import UserEditScreen from '../../screens/auth/UserEditScreen';
import FavoriteProductIndexScreen from '../../screens/product/FavoriteProductIndexScreen';
import OrderIndexScreen from '../../screens/OrderIndexScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {HeaderBack} from '../../components/HeaderBack';
import MainTab from '../MainTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import CartConfirmationScreen from '../../screens/cart/CartConfirmationScreen';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import DesigneratCartIndexScreen from '../../screens/cart/DesigneratCartIndexScreen';
import DesigneratCartIndexFormScreen from '../../screens/cart/DesigneratCartIndexFormScreen';

const Stack = createStackNavigator();
const HomeStack = () => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarVisible: false,
        headerBackTitleVisible: false,
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
            <HeaderRight showCart={true} showProductFavorite={true} />
          ),
        })}
        name={'MainTab'}
        component={MainTab}
      />
      <Stack.Screen name={'UserShow'} component={CelebrityIndexScreen} />
      <Stack.Screen
        name={'DesignerShow'}
        options={{
          headerTitle: () => <HeaderMiddle />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
        }}
        component={DesigneratDesignerShowScreen}
      />
      <Stack.Screen
        name={'DesignerIndex'}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('designers')} />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
        }}
        component={DesigneratDesignerIndexScreen}
      />
      <Stack.Screen
        name={'CompanyIndex'}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('elites')} />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
        }}
        component={CompanyIndexScreen}
      />
      <Stack.Screen
        name={'Login'}
        component={DesigneratLoginScreen}
        options={{
          headerRight: () => <HeaderRight />,
          headerTitle: () => <HeaderMiddle title={I18n.t('login')} />,
          headerBackTitle: () => null,
        }}
      />
      <Stack.Screen
        name={'Register'}
        component={DesigneratRegisterScreen}
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
      <Stack.Screen
        name="CartConfirmation"
        component={CartConfirmationScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('cart_confirmation')} />
          ),
        }}
      />
      <Stack.Screen
        name="PaymentIndex"
        component={PaymentIndexScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => <HeaderMiddle title={I18n.t('payment_page')} />,
          headerLeft: () => <HeaderBack removeCart={true} />,
        }}
      />
      <Stack.Screen
        name="ProfileIndex"
        component={ProfileIndexScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('cart_confirmation')} />
          ),
        }}
      />
      <Stack.Screen
        name="UserEdit"
        component={UserEditScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('edit_information')} />
          ),
        }}
      />
      <Stack.Screen
        name={'ProductShow'}
        options={{
          headerTitle: () => <HeaderMiddle />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
        }}
        component={DesigneratNormalProductShowScreen}
      />
      <Stack.Screen
        name={'SearchProductIndex'}
        options={{
          headerTitle: () => <HeaderMiddle />,
          headerRight: () => (
            <HeaderRight showCart={true} displayShare={true} />
          ),
        }}
        component={SearchProductIndexScreen}
      />
      <Stack.Screen
        name="FavoriteProductIndex"
        component={FavoriteProductIndexScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        }}
      />
      <Stack.Screen
        name="BrandIndex"
        component={BrandIndexScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => <HeaderMiddle title={I18n.t('brands')} />,
        }}
      />
      <Stack.Screen
        name="OrderIndex"
        component={OrderIndexScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => <HeaderMiddle title={I18n.t('order_history')} />,
        }}
      />
      <Stack.Screen name={'Contactus'} component={ContactusScreen} />

      <Stack.Screen
        name="CartIndex"
        headerBackTitleVisible={false}
        component={CartIndexScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        }}
      />
      <Stack.Screen
        name="CartIndexForm"
        headerBackTitleVisible={false}
        component={DesigneratCartIndexFormScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
