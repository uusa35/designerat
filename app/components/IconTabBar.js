import React, {useContext} from 'react';
import {View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {iconSizes} from '../constants/sizes';
import {EXPO, HOMEKEY, ESCRAP} from './../../app';

const IconTabBar = ({type, name, focused, showLabel = false}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Icon
      size={iconSizes.smaller}
      name={name}
      type={type}
      color={focused ? colors.btn_bg_theme_color : colors.footer_theme_color}
      containerStyle={{
        borderBottomWidth: focused ? 1 : 0,
        paddingBottom: 5,
        borderColor: focused ? colors.btn_bg_theme_color : 'transparent',
      }}
    />
  );
};

export default IconTabBar;
