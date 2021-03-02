import React, {useContext, useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS, width} from '../../../constants';
import {text, height, iconSizes} from '../../../constants/sizes';
import {showCountryModal} from '../../../redux/actions';
import {
  clearCart,
  getCoupon,
  storeOrderCashOnDelivery,
  storeOrderMyFatoorah,
  storeOrderTap,
  submitCart,
} from '../../../redux/actions/cart';
import {Button, CheckBox, Icon, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, round, isNull} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {MALLR, ABATI, HOMEKEY, PAYMENT} from './../../../../app';
import validate from 'validate.js';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import widgetStyles from '../widgetStyles';
import {adjustColor} from '../../../helpers';
import {
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
} from '../../../redux/actions/types';
import DesigneratBtn from '../Button/DesigneratBtn';
import DesingeratBtn from '../Button/DesigneratBtn';

const DesigneratCartListConfirmationScreen = ({
  cart,
  shipmentCountry,
  grossTotal,
  shipment_notes,
  shipmentFees,
  guest,
  discount = 0,
  editModeDefault = true,
  coupon = {},
  COD,
}) => {
  const dispatch = useDispatch();
  const {colors, total} = useContext(GlobalValuesContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {cName, cEmail, cMobile, cAddress, cNotes, cArea} = route.params;
  const [name, setName] = useState(cName);
  const [email, setEmail] = useState(cEmail);
  const [mobile, setMobile] = useState(cMobile);
  const [address, setAddress] = useState(cAddress);
  const [notes, setNotes] = useState(cNotes);
  const [area, setArea] = useState(cArea);
  const [editMode, setEditMode] = useState(editModeDefault);
  const [checked, setChecked] = useState(false);

  console.log('route params', route.params);

  const handleCashOnDelivery = useCallback(() => {
    return Alert.alert(
      I18n.t('order_confirmation'),
      I18n.t('order_cash_on_delivery_confirmation'),
      [
        {
          text: I18n.t('cancel'),
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: I18n.t('confirm_cash_on_delivery'),
          onPress: () =>
            dispatch(
              storeOrderCashOnDelivery({
                name,
                email,
                mobile,
                address,
                area,
                country_id: shipmentCountry.id,
                coupon_id: !isNull(coupon) ? coupon.id : null,
                cart,
                price: total,
                net_price: grossTotal,
                shipment_fees: shipmentFees,
                cash_on_delivery: COD,
                discount,
                payment_method: isIOS
                  ? 'Iphone - CASH ON DELIVERY'
                  : 'Android - CASH ON DELIVERY',
              }),
            ),
        },
      ],
      {cancelable: true},
    );
  });

  return (
    <View style={{flexDirection: 'column', width}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          backgroundColor: 'white',
        }}>
        <Text style={widgetStyles.headerThree}>
          {I18n.t('go_to_payment_page')}
        </Text>
        <Text style={widgetStyles.headerThree}>{I18n.t('step')} (3/3)</Text>
      </View>
      {shipment_notes && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 15,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: 'white',
          }}>
          <Text style={widgetStyles.headerThree}>{shipment_notes}</Text>
        </View>
      )}
      <View style={{backgroundColor: 'white', margin: 15, padding: 10}}>
        <View
          style={{
            marginTop: 0,
            marginBottom: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox
            containerStyle={{width: '90%'}}
            title={I18n.t('agree_on_conditions_and_terms')}
            iconType="material"
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            checked={checked}
            onPress={() => setChecked(!checked)}
            textStyle={{fontFamily: text.font, paddingTop: 5}}
          />
          <Icon
            name="book"
            type="font-awesome"
            size={15}
            onPress={() => navigate('TermAndCondition')}
          />
        </View>
        <View>
          <DesigneratBtn
            disabled={!checked}
            handleClick={() => {
              dispatch({
                type: CREATE_MYFATOORAH_PAYMENT_URL,
                payload: {
                  name,
                  email,
                  mobile,
                  address,
                  country_id: shipmentCountry.id,
                  coupon_id: !isNull(coupon) ? coupon.id : 0,
                  cart,
                  total,
                  grossTotal,
                  shipment_fees: shipmentCountry.fixed_shipment_charge,
                  discount: coupon.value,
                  payment_method: isIOS
                    ? 'IOS - My Fatoorah'
                    : 'Android - My Fatoorah',
                },
              });
            }}
            title={I18n.t('pay_myfatoorah')}
          />
          <DesingeratBtn
            disabled={!checked}
            handleClick={() => {
              dispatch({
                type: CREATE_TAP_PAYMENT_URL,
                payload: {
                  name,
                  email,
                  mobile,
                  address,
                  country_id: shipmentCountry.id,
                  coupon_id: !isNull(coupon) ? coupon.id : 0,
                  cart,
                  total,
                  grossTotal,
                  shipment_fees: shipmentCountry.fixed_shipment_charge,
                  discount: coupon.value,
                  payment_method: isIOS
                    ? 'IOS - My Fatoorah'
                    : 'Android - My Fatoorah',
                },
              });
            }}
            title={I18n.t('go_tap')}
          />
          <DesingeratBtn
            handleClick={() => dispatch(clearCart())}
            title={I18n.t('clear_cart')}
            bgColor={adjustColor(colors.btn_bg_theme_color, 15)}
            marginTop={15}
          />
        </View>
      </View>
    </View>
  );
};

export default DesigneratCartListConfirmationScreen;

DesigneratCartListConfirmationScreen.propTypes = {
  cart: PropTypes.array.isRequired,
  auth: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  discount: PropTypes.number,
  shipment_notes: PropTypes.string.isRequired,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired,
  shipmentFees: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({});
