import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/designerat/HomeScreen';
import I18n from '../../I18n';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: I18n.t('designers'),
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white',
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
    </Stack.Navigator>
  );
};

export default HomeStack;
