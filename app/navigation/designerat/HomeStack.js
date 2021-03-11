import React, {useContext} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import I18n, {isRTL} from '../../I18n';
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
import TermAndConditionScreen from '../../screens/TermAndConditionScreen';
import PolicyScreen from '../../screens/PolicyScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {HeaderBack} from '../../components/HeaderBack';
import MainTab from '../MainTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import CartConfirmationScreen from '../../screens/cart/CartConfirmationScreen';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import DesigneratCartIndexScreen from '../../screens/cart/DesigneratCartIndexScreen';
import DesigneratCartIndexFormScreen from '../../screens/cart/DesigneratCartIndexFormScreen';
import DesigneratCartConfirmationScreen from '../../screens/cart/DesigneratCartConfirmationScreen';
import UserAddressIndexScreen from '../../screens/auth/UserAddressIndexScreen';
import UserAddressCreateScreen from '../../screens/auth/UserAddressCreateScreen';
import UserAddressEditScreen from '../../screens/auth/UserAddressEditScreen';
import {Icon} from 'react-native-elements';
import {iconSizes} from '../../constants/sizes';

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
          backgroundColor: colors.footer_bg_theme_color,
        },
        headerTintColor: {
          color: colors.footer_theme_color,
        },
        headerBackTitleStyle: {
          color: colors.footer_theme_color,
        },
        headerBackImage: () => (
          <Icon
            name={`chevron-${isRTL ? 'right' : 'left'}`}
            type="evilicon"
            size={iconSizes.medium}
            color={colors.footer_theme_color}
          />
        ),
        headerTitleStyle: {
          color: colors.footer_theme_color,
        },
      }}>
      <Stack.Screen
        options={({navigation}) => ({
          headerLeft: () => (
            <Ionicons
              name="ios-menu"
              size={25}
              color={colors.footer_theme_color}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerTitle: () => <HeaderMiddle showLogo={true} />,
          headerRight: () => (
            <HeaderRight
              showCart={false}
              showProductFavorite={true}
              showCountry={false}
              showProductsSearch={true}
            />
          ),
        })}
        name={'MainTab'}
        component={MainTab}
      />
      <Stack.Screen
        name={'CelebrityIndex'}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('celebrities')} />,
        }}
        component={CelebrityIndexScreen}
      />
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
        name="ProfileIndex"
        component={ProfileIndexScreen}
        options={{
          // headerStyle: {
          //   backgroundColor: colors.header_theme_bg,
          // },
          // headerTitleStyle: {
          //   color: colors.header_theme_color,
          // },
          headerTitle: () => <HeaderMiddle title={I18n.t('profile')} />,
        }}
      />
      <Stack.Screen
        name="UserEdit"
        component={UserEditScreen}
        options={{
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
          headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        }}
      />
      <Stack.Screen
        name="BrandIndex"
        component={BrandIndexScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('brands')} />,
        }}
      />
      <Stack.Screen
        name="OrderIndex"
        component={OrderIndexScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('order_history')} />,
        }}
      />
      <Stack.Screen name={'Contactus'} component={ContactusScreen} />

      <Stack.Screen
        name="CartIndex"
        component={CartIndexScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        }}
      />
      <Stack.Screen
        name="CartIndexForm"
        component={DesigneratCartIndexFormScreen}
        options={{
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('cart_confirmation')} />
          ),
        }}
      />
      <Stack.Screen
        name="CartConfirmation"
        component={DesigneratCartConfirmationScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('payment')} />,
        }}
      />

      <Stack.Screen
        name="UserAddressIndex"
        component={UserAddressIndexScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('addresses')} />,
        }}
      />
      <Stack.Screen
        name="UserAddressCreate"
        component={UserAddressCreateScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('add_new_address')} />,
        }}
      />

      <Stack.Screen
        name="UserAddressEdit"
        component={UserAddressEditScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('edit_address')} />,
        }}
      />
      {/*<Stack.Screen*/}
      {/*  name="CartConfirmation"*/}
      {/*  component={CartConfirmationScreen}*/}
      {/*  options={{*/}
      {/*    headerStyle: {*/}
      {/*      backgroundColor: colors.header_theme_bg,*/}
      {/*    },*/}
      {/*    headerTitleStyle: {*/}
      {/*      color: colors.header_theme_color,*/}
      {/*    },*/}
      {/*    headerTitle: () => (*/}
      {/*      <HeaderMiddle title={I18n.t('cart_confirmation')} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
      <Stack.Screen
        name="PaymentIndex"
        component={PaymentIndexScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('payment_page')} />,
          headerLeft: () => <HeaderBack removeCart={true} />,
        }}
      />
      <Stack.Screen
        name="TermAndCondition"
        component={TermAndConditionScreen}
        options={{
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('terms_and_conditions')} />
          ),
        }}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          headerTitle: () => <HeaderMiddle title={I18n.t('policies')} />,
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
    </Stack.Navigator>
  );
};

export default HomeStack;
