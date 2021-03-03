import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import widgetStyles from '../../components/widgets/widgetStyles';
import BgContainer from '../../components/containers/BgContainer';
import {useDispatch, useSelector} from 'react-redux';
import {map} from 'lodash';
import {iconSizes} from '../../constants/sizes';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import I18n from './../../I18n';
import {text} from '../../constants/sizes';
import {
  deleteAddress,
  setAddress,
  changeAddress,
} from '../../redux/actions/user';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../constants/colors';

const UserAddressIndexScreen = () => {
  const {auth, address} = useSelector((state) => state);
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <BgContainer showImage={false}>
      <Text
        style={[
          widgetStyles.headerThree,
          {textAlign: 'left', marginLeft: 15, marginTop: 25},
        ]}>
        {I18n.t('addresses_list')}
      </Text>
      <View style={[widgetStyles.panelContent, {padding: 20}]}>
        {map(auth.addresses, (d, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopColor: colors.btn_bg_theme_color,
              borderTopWidth: 1,
              paddingBottom: 10,
              paddingTop: 10,
              borderBottomColor: colors.btn_bg_theme_color,
              borderBottomWidth: auth.addresses.length - 1 <= i,
            }}>
            <Text>{d.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {address && address.id === d.id && (
                <Icon
                  name={'check'}
                  type={'antdesign'}
                  color={colors.icon_theme_color}
                />
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserAddressEdit', {currentAddress: d})
                }
                style={{
                  borderWidth: 0.5,
                  padding: 10,
                  marginLeft: 10,
                  borderColor: colors.btn_bg_theme_color,
                  borderRadius: text.smallest,
                }}>
                <Text style={widgetStyles.headerFour}>{I18n.t('modify')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(changeAddress(d))}
                style={{
                  borderWidth: 0.5,
                  padding: 10,
                  marginLeft: 10,
                  borderColor: colors.btn_bg_theme_color,
                  borderRadius: text.smallest,
                }}>
                <Text style={widgetStyles.headerFour}>{I18n.t('select')}</Text>
              </TouchableOpacity>
              {d.name !== 'address_one' && (
                <TouchableOpacity
                  onPress={() => dispatch(deleteAddress(d.id))}
                  style={{
                    borderWidth: 0.5,
                    padding: 10,
                    marginLeft: 10,
                    borderColor: colors.btn_bg_theme_color,
                    borderRadius: text.smallest,
                    backgroundColor: themeColors.danger,
                  }}>
                  <Text style={[widgetStyles.headerFour, {color: 'white'}]}>
                    {I18n.t('delete')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </BgContainer>
  );
};

export default UserAddressIndexScreen;
