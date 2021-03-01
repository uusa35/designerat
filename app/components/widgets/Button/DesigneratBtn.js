import {Text, TouchableOpacity, View} from 'react-native';
import {submitAuth} from '../../../redux/actions/user';
import widgetStyles from '../widgetStyles';
import I18n from '../../../I18n';
import React, {useContext} from 'react';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropTypes from 'prop-types';

const DesingeratBtn = ({
  handleClick,
  title,
  bg = true,
  titleStyle = widgetStyles.headerThree,
  marginTop = 5,
}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      style={{
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: bg ? colors.btn_bg_theme_color : 'transparent',
        height: 50,
        borderRadius: 3,
        marginTop,
      }}
      onPress={() => handleClick()}>
      <Text
        style={[
          titleStyle,
          {color: colors.btn_theme_color, textAlign: 'center', paddingTop: 5},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DesingeratBtn;

DesingeratBtn.prototype = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  titleStyle: PropTypes.object,
};
