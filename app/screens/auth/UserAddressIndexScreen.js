import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import widgetStyles from '../../components/widgets/widgetStyles';
import BgContainer from '../../components/containers/BgContainer';
import {useSelector} from 'react-redux';
import {map} from 'lodash';
import {isRTL} from '../../I18n';
import {iconSizes} from '../../constants/sizes';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const UserAddressIndexScreen = () => {
  const {auth} = useSelector((state) => state);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <BgContainer showImage={false}>
      <View style={[widgetStyles.panelContent, {padding: 20}]}>
        {map(auth.addresses, (d) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              paddingTop: 10,
              borderTopColor: colors.btn_bg_theme_color,
              borderTopWidth: 1,
            }}>
            <Text>{d.name}</Text>
            <Icon
              name={`chevron-${isRTL ? 'left' : 'right'}`}
              type="evilicon"
              size={iconSizes.medium}
              color={colors.icon_theme_color}
            />
          </TouchableOpacity>
        ))}
      </View>
    </BgContainer>
  );
};

export default UserAddressIndexScreen;
