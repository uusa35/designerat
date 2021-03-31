import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DesigneratSideMenu from '../../components/DesigneratSideMenu';
import HomeStack from './../designerat/HomeStack';
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
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

export default MainDrawer;
