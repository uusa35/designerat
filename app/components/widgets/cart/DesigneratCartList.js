import React, {useContext, useState, useEffect, Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {iconSizes, text} from '../../../constants/sizes';
import {showCountryModal} from '../../../redux/actions';
import {clearCart, getCoupon, submitCart} from '../../../redux/actions/cart';
import {
  Button,
  Input,
  CheckBox,
  Icon,
  ListItem,
  Badge,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, round, isNull} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import {getConvertedFinalPrice} from '../../../helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CREATE_MYFATOORAH_PAYMENT_URL} from '../../../redux/actions/types';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratProductItem from '../product/DesigneratProductItem';
import widgetStyles from '../widgetStyles';
import {toggleProductFavorite} from '../../../redux/actions/product';
import {width} from '../../../constants';

const DesigneratCartList = ({
  shipmentCountry,
  shipment_notes = null,
  editModeDefault = true,
  coupon,
  selectedArea,
  shipmentFees,
}) => {
  const dispatch = useDispatch();
  const {
    colors,
    total,
    grossTotal,
    exchange_rate,
    currency_symbol,
    cartLength,
  } = useContext(GlobalValuesContext);
  const {cart, auth, guest, country} = useSelector((state) => state);
  const {navigate} = useNavigation();
  const [name, setName] = useState(!validate.isEmpty(auth) ? auth.name : null);
  const [email, setEmail] = useState(
    !validate.isEmpty(auth) ? auth.email : null,
  );
  const [mobile, setMobile] = useState(
    !validate.isEmpty(auth) ? auth.mobile : null,
  );
  const [address, setAddress] = useState(
    !validate.isEmpty(auth) ? auth.email : null,
  );
  const [notes, setNotes] = useState(
    !validate.isEmpty(auth) ? auth.description : null,
  );
  const [code, setCode] = useState(
    !validate.isEmpty(coupon) ? coupon.code : '',
  );
  const [editMode, setEditMode] = useState(editModeDefault);
  const [checked, setChecked] = useState(false);
  const [area, setArea] = useState('');

  useEffect(() => {
    setEmail(auth.email);
    setName(auth.name);
    setMobile(auth.mobile);
    setAddress(auth.address);
    setNotes(auth.description);
  }, [auth]);

  return (
    <View
      animation="bounceInLeft"
      easing="ease-out"
      useNativeDriver={true}
      style={{flexDirection: 'column', width}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: 'white',
        }}>
        <Text style={widgetStyles.headerThree}>{I18n.t('cart')}</Text>
        <Text style={widgetStyles.headerThree}>{I18n.t('step')} (1/2)</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <Text style={widgetStyles.headerThree}>
          {I18n.t('products_number')} ({cartLength})
        </Text>
        <Text style={widgetStyles.headerThree}>
          {grossTotal}.000 {I18n.t('kwd')}
        </Text>
      </View>
      {map(cart, (item, i) => {
        return (
          <DesigneratProductItem
            item={item}
            timeData={item.type === 'service' ? item.timeData : null}
            key={item.element.id}
            editMode={editMode}
            qty={item.qty}
            notes={item.notes}
          />
        );
      })}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
          backgroundColor: 'white',
          padding: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigate('FavoriteProductIndex')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Icon name="heart" type="antdesign" size={iconSizes.smaller} />
          <Text style={[widgetStyles.headerThree, {paddingLeft: 20}]}>
            {I18n.t('add_from_favorite_list')}
          </Text>
        </TouchableOpacity>
        <Icon
          name="chevron-left"
          type="evilicon"
          size={iconSizes.medium}
          color="gray"
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          margin: 15,
          paddingTop: 10,
        }}>
        <Text style={widgetStyles.headerThree}>{I18n.t('total_details')}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 20,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}>
        <Text style={[widgetStyles.headerThree]}>{I18n.t('total_sum')}</Text>
        <View style={{flexDirection: 'row', minWidth: 50}}>
          <Text style={widgetStyles.headerThree}>{round(total, 2)}</Text>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('kwd')}
          </Text>
        </View>
      </View>

      {shipmentFees > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 20,
            backgroundColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={widgetStyles.headerThree}>
            {I18n.t('shipment_fees_per_piece')}
          </Text>
          <View style={{flexDirection: 'row', minWidth: 50}}>
            <Text style={widgetStyles.headerThree}>
              {round(shipmentCountry.fixed_shipment_charge, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
        </View>
      ) : null}

      {coupon && coupon.value > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 20,
            backgroundColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={widgetStyles.headerThree}>{I18n.t('discount')}}</Text>
          <View style={{flexDirection: 'row', minWidth: 50}}>
            <Text style={widgetStyles.headerThree}>
              {round(coupon.value, 2)}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 20,
          backgroundColor: 'white',
          borderBottomWidth: 1,
        }}>
        <Text style={widgetStyles.headerThree}>{I18n.t('grossTotal')}</Text>
        <View style={{flexDirection: 'row', minWidth: 50}}>
          <Text style={widgetStyles.headerThree}>{round(grossTotal, 2)}</Text>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('kwd')}
          </Text>
        </View>
      </View>
      {!country.is_local && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignText: 'center',
            marginTop: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderTopWidth: 0.5,
            borderTopColor: 'lightgrey',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}>
            {`${I18n.t('gross_total_in')} ${currency_symbol}`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {`${getConvertedFinalPrice(
                round(grossTotal, 2),
                exchange_rate,
              )} ${currency_symbol}`}
            </Text>
          </View>
        </View>
      )}
      {guest ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Button
            // onPress={() => dispatch(showLoginModal())}
            onPress={() => navigate('Login')}
            raised
            containerStyle={{flex: 0.5, marginBottom: 10, margin: 5}}
            buttonStyle={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'black',
            }}
            title={I18n.t('login')}
            titleStyle={{fontFamily: text.font, color: 'black'}}
          />
          <Button
            onPress={() => navigate('Register')}
            raised
            containerStyle={{flex: 0.5, marginBottom: 10, margin: 5}}
            buttonStyle={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'black',
            }}
            title={I18n.t('register')}
            titleStyle={{fontFamily: text.font, color: 'black'}}
          />
        </View>
      ) : null}
      <View>
        {shipment_notes && (
          <Button
            raised
            title={shipment_notes}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}
          />
        )}
      </View>
      <Button
        raised
        containerStyle={{margin: 15, marginTop: 50}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
        }}
        title={I18n.t('pay')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
        onPress={() => navigate('CartIndexForm')}
      />
    </View>
  );
};

export default DesigneratCartList;

DesigneratCartList.propTypes = {
  coupon: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  shipment_notes: PropTypes.string,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({});
