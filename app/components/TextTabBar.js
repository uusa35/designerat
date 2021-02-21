import React, {useContext, Fragment} from 'react';
import {text} from '../constants/sizes';
import {Text} from 'react-native';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {useSelector} from 'react-redux';

const TextTabBar = ({focused, title, showLabel = false}) => {
  const {colors} = useSelector((state) => state.settings);
  return (
    <Fragment>
      {showLabel && (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.small,
            textAlign: 'center',
            color: 'white',
          }}>
          {title}
        </Text>
      )}
    </Fragment>
  );
};

export default TextTabBar;
