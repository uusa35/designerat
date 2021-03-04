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
import {map, round, isEmpty} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {MALLR, ABATI, HOMEKEY, PAYMENT} from './../../../../app';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import widgetStyles from '../widgetStyles';
import {adjustColor} from '../../../helpers';
import {
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
} from '../../../redux/actions/types';
import DesigneratBtn from '../Button/DesigneratBtn';
import DesingeratBtn from '../Button/DesigneratBtn';
import DesigneratCartPriceSummary from './DesigneratCartPriceSummary';

const DesigneratCartListConfirmationScreen = ({
  showLabel = false,
  editMode = false,
}) => {
  const dispatch = useDispatch();
  const {colors, total, grossTotal} = useContext(GlobalValuesContext);
  const {coupon, shipmentFees, cart, settings, shipmentCountry} = useSelector(
    (state) => state,
  );
  const navigation = useNavigation();
  const route = useRoute();
  const {
    cName,
    cEmail,
    cMobile,
    cAddress,
    cNotes,
    cArea,
    cBlock,
    cStreet,
    cBuilding,
    cAreaId,
    country_id,
    area_id,
  } = route.params;
  const [checked, setChecked] = useState(false);

  console.log('the address', cAddress);

  const handleCashOnDelivery = () => {
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
                name: cName,
                email: cEmail,
                mobile: cMobile,
                address: cAddress,
                block: cBlock,
                building: cBuilding,
                street: cStreet,
                area: cArea,
                area_id: cAreaId,
                country_id,
                cart,
                price: total,
                net_price: grossTotal,
                shipment_fees: shipmentFees,
                cash_on_delivery: settings.cash_on_delivery,
                coupon_id: !isEmpty(coupon) ? coupon.id : null,
                discount: !isEmpty(coupon) ? coupon.value : 0,
                notes: cNotes,
                payment_method: isIOS
                  ? 'Iphone - CASH ON DELIVERY'
                  : 'Android - CASH ON DELIVERY',
              }),
            ),
        },
      ],
      {cancelable: true},
    );
  };

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
      {settings.shipment_notes && (
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
          <Text style={widgetStyles.headerThree}>
            {settings.shipment_notes}
          </Text>
        </View>
      )}

      <DesigneratCartPriceSummary title={I18n.t('order_summary')} />
      <Text
        style={[widgetStyles.headerThree, {textAlign: 'left', padding: 20}]}>
        {I18n.t('deliver_to')}
      </Text>
      <View
        style={[
          widgetStyles.panelContent,
          {
            paddingBottom: 20,
            paddingTop: 20,
            marginTop: 0,
          },
        ]}>
        <Input
          editable={editMode}
          placeholder={cName ? cName : I18n.t('name')}
          value={cName ? cName : null}
          leftIcon={() =>
            cName ? (
              <Text style={widgetStyles.headerThree}>{I18n.t('name')}</Text>
            ) : null
          }
          leftIconContainerStyle={{paddingRight: 15}}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 0,
              borderRadius: 0,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('email') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
        />
        <Input
          editable={editMode}
          placeholder={cEmail ? cEmail : I18n.t('email')}
          value={cEmail ? cEmail : null}
          leftIcon={() =>
            cEmail ? (
              <Text style={widgetStyles.headerThree}>{I18n.t('email')}</Text>
            ) : null
          }
          leftIconContainerStyle={{paddingRight: 15}}
          label={showLabel ? I18n.t('email') : null}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 0,
              borderRadius: 0,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="email-address"
        />
        <Input
          editable={editMode}
          value={cMobile ? cMobile : null}
          textContentType="telephoneNumber"
          leftIcon={() => <Text>+{shipmentCountry.calling_code}</Text>}
          leftIconContainerStyle={{paddingRight: 15, paddingBottom: 4}}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          placeholder={I18n.t('mobile') + '*'}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderRadius: 0,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('mobile') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          // onPress={() => {
          //   editMode ? dispatch(showCountryModal()) : null;
          // }}
          style={{
            borderWidth: 1,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderColor: 'lightgrey',
            height: 50,
            width: '94.5%',
            alignSelf: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 15,
          }}>
          <Text style={[widgetStyles.headerThree, {paddingRight: 10}]}>
            {I18n.t('country')}
          </Text>
          <Text style={widgetStyles.headerThree}>{shipmentCountry.slug}</Text>
        </TouchableOpacity>
        {!validate.isEmpty(cAddress) && (
          <>
            <Input
              editable={false}
              placeholder={cArea ? cArea : I18n.t('area')}
              value={cAddress ? cArea : null}
              leftIcon={() =>
                cArea ? (
                  <Text style={widgetStyles.headerThree}>{I18n.t('area')}</Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('area') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={cBlock ? cBlock : I18n.t('block')}
              value={cBlock ? cBlock : null}
              leftIcon={() =>
                cBlock ? (
                  <Text style={widgetStyles.headerThree}>
                    {I18n.t('block')}
                  </Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('block') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={cStreet ? cStreet : I18n.t('street')}
              value={cStreet ? cStreet : null}
              leftIcon={() =>
                cStreet ? (
                  <Text style={widgetStyles.headerThree}>
                    {I18n.t('street')}
                  </Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('street') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
            <Input
              editable={false}
              placeholder={cBuilding ? cBuilding : I18n.t('building_no')}
              value={cBuilding ? cBuilding : null}
              leftIcon={() =>
                cBuilding ? (
                  <Text style={widgetStyles.headerThree}>
                    {I18n.t('building_no')}
                  </Text>
                ) : null
              }
              leftIconContainerStyle={{paddingRight: 15}}
              containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
              inputContainerStyle={[
                widgetStyles.inputContainerStyle,
                {
                  borderBottomWidth: 0,
                  borderRadius: 0,
                },
              ]}
              inputStyle={widgetStyles.inputStyle}
              label={showLabel ? I18n.t('building') : null}
              labelStyle={[
                styles.titleLabelStyle,
                {color: colors.main_theme_color, paddingBottom: 10},
              ]}
              shake={true}
              keyboardType="default"
            />
          </>
        )}
        <Input
          spellCheck={true}
          editable={editMode}
          placeholder={cNotes ? cNotes : I18n.t('additional_information')}
          value={cNotes ? cNotes : null}
          containerStyle={{
            marginBottom: 0,
            paddingBottom: 0,
            height: 80,
          }}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 1,
              borderRadius: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderBottomRightRadius: 3,
              borderBottomLeftRadius: 3,
              height: 80,
            },
          ]}
          inputStyle={[widgetStyles.inputStyle, {alignItems: 'center'}]}
          label={showLabel ? I18n.t('additional_information') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
          // multiline={true}
          numberOfLines={3}
        />
      </View>
      <View style={{backgroundColor: 'white', margin: 15, padding: 15}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CheckBox
            containerStyle={{
              backgroundColor: 'transparent',
              alignItems: 'baseline',
              justifyContent: 'center',
              borderWidth: 0,
            }}
            title={I18n.t('agree_on_conditions_and_terms')}
            iconType="material"
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            checked={checked}
            onPress={() => setChecked(!checked)}
            textStyle={{fontFamily: text.font, paddingTop: 5}}
          />
          <Icon
            name="read"
            type="material-community"
            size={iconSizes.smaller}
            onPress={() => navigation.navigate('TermAndCondition')}
          />
        </View>
        {settings.cash_on_delivery && (
          <DesigneratBtn
            disabled={!checked}
            handleClick={() => handleCashOnDelivery()}
            title={I18n.t('cash_on_delivery')}
          />
        )}
        <DesigneratBtn
          disabled={!checked}
          handleClick={() => {
            dispatch({
              type: CREATE_MYFATOORAH_PAYMENT_URL,
              payload: {
                name: cName,
                email: cEmail,
                mobile: cMobile,
                address: cAddress,
                block: cBlock,
                building: cBuilding,
                street: cStreet,
                area: cArea,
                area_id,
                country_id,
                cart,
                price: total,
                net_price: grossTotal,
                shipment_fees: shipmentFees,
                cash_on_delivery: settings.cash_on_delivery,
                coupon_id: !isEmpty(coupon) ? coupon.id : null,
                discount: !isEmpty(coupon) ? coupon.value : 0,
                notes: cNotes,
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
                name: cName,
                email: cEmail,
                mobile: cMobile,
                address: cAddress,
                block: cBlock,
                building: cBuilding,
                street: cStreet,
                area: cArea,
                area_id,
                country_id,
                cart,
                price: total,
                net_price: grossTotal,
                shipment_fees: shipmentFees,
                cash_on_delivery: settings.cash_on_delivery,
                coupon_id: !isEmpty(coupon) ? coupon.id : null,
                discount: !isEmpty(coupon) ? coupon.value : 0,
                notes: cNotes,
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
