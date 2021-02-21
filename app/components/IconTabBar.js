import React, {useContext} from 'react';
import {View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {iconSizes} from '../constants/sizes';
import {EXPO, HOMEKEY, ESCRAP} from './../../app';
import {useSelector} from 'react-redux';

const IconTabBar = ({type, name, focused, showLabel = false}) => {
  const {settings} = useSelector((state) => state);
  return (
    <View>
      <Icon
        size={showLabel ? iconSizes.smaller : iconSizes.smallest}
        name={name}
        type={type}
        color={
          focused
            ? settings.colors.icon_theme_color
            : settings.colors.btn_bg_theme_color
        }
      />
    </View>
  );
};

export default IconTabBar;
