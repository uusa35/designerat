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

import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const Stack = createStackNavigator();
const HomeStack = () => {
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
        name="Home"
        headerBackTitleVisible={false}
        component={AbatiHomeScreen}
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
              showProductsSearch={true}
              showProductFavorite={true}
            />
          ),
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('home')} showLogo={true} />
          ),
        }}
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
        }}
        component={NormalProductShowScreen}
        headerBackTitleVisible={false}
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
