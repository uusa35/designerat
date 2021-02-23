import React, {useContext, Fragment} from 'react';
import {text} from '../constants/sizes';
import {Text} from 'react-native';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

const TextTabBar = ({focused, title, showLabel = false}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <>
      {showLabel && (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.small,
            textAlign: 'center',
            color: focused
              ? colors.footer_theme_color
              : colors.icon_theme_color,
          }}>
          {title}
        </Text>
      )}
    </>
  );
};

export default TextTabBar;
