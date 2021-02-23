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
import CategoryIndexScreen from '../../screens/category/CategoryIndexScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const Stack = createStackNavigator();
const CategoryStack = () => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.header_theme_bg,
        },
        headerTitleStyle: {
          color: colors.header_theme_color,
        },
      }}>
      <Stack.Screen
        name="CategoryIndex"
        headerBackTitleVisible={false}
        component={CategoryIndexScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerRight: () => (
            <HeaderRight
              showCart={false}
              showProductsSearch={false}
              showProductFavorite={true}
            />
          ),
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('home')} showLogo={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoryStack;
