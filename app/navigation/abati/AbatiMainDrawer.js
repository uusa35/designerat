import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DesigneratSideMenu from '../../components/DesigneratSideMenu';
import HomeStack from './../myexpo/MyExpoHomeStack';
const Drawer = createDrawerNavigator();

const AbatiMainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <DesigneratSideMenu {...props} showLogo={true} />
      )}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default AbatiMainDrawer;
