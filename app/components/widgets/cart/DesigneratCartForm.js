import {Button, CheckBox, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {formWidget, iconSizes, text} from '../../../constants/sizes';
import {Text, TouchableOpacity} from 'react-native';
import {showCountryModal} from '../../../redux/actions';
import {View} from 'react-native-animatable';
import {clearCart, getCoupon, submitCart} from '../../../redux/actions/cart';
import React, {useContext, useState} from 'react';
import {
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
} from '../../../redux/actions/types';
import {isNull} from 'lodash';
import {isIOS} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useNavigation} from '@react-navigation/native';
import validate from 'validate.js';
import {APP_CASE} from '../../../../app.json';
import widgetStyles from '../widgetStyles';
const DesigneratCartForm = ({
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

  return (
    <View>
      <View style={{paddingTop: 20, paddingBottom: 20}}>
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
        <Input
          editable={editMode}
          placeholder={name ? name : I18n.t('name')}
          value={name ? name : null}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('name')}
          labelStyle={{
            paddingBottom: 10,

            fontFamily: text.font,
            textAlign: 'left',
          }}
          shake={true}
          keyboardType="default"
          onChangeText={(name) => setName(name)}
        />
        <Input
          editable={editMode}
          placeholder={email ? email : I18n.t('email')}
          value={email ? email : null}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('email')}
          labelStyle={{
            paddingBottom: 10,

            fontFamily: text.font,
            textAlign: 'left',
          }}
          shake={true}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          editable={editMode}
          textContentType="telephoneNumber"
          placeholder={mobile ? mobile : I18n.t('mobile')}
          leftIcon={() => <Text>+{country.calling_code}</Text>}
          leftIconContainerStyle={{paddingRight: 15}}
          value={mobile ? mobile : null}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('mobile')}
          labelStyle={{
            paddingBottom: 10,

            fontFamily: text.font,
            textAlign: 'left',
          }}
          shake={true}
          keyboardType="number-pad"
          onChangeText={(text) => setMobile(text)}
        />
        <TouchableOpacity
          onPress={() => {
            editMode ? dispatch(showCountryModal()) : null;
          }}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: iconSizes.small,
            height: 45,
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
              textAlign: isRTL ? 'right' : 'left',
              color: colors.main_theme_color,
            }}>
            {shipmentCountry.slug}
          </Text>
        </TouchableOpacity>
        <Input
          editable={editMode}
          placeholder={area ? area : I18n.t('area')}
          value={area ? area : null}
          inputContainerStyle={widgetStyles.inputContainerStyle}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('area')}
          labelStyle={{
            paddingBottom: 10,

            fontFamily: text.font,
            textAlign: 'left',
          }}
          shake={true}
          keyboardType="default"
          onChangeText={(area) => setArea(area)}
        />
        <Input
          editable={editMode}
          placeholder={address ? address : I18n.t('full_address')}
          value={address ? address : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: iconSizes.tiny,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            fontSize: 14,
            textAlign: isRTL ? 'right' : 'left',
          }}
          label={I18n.t('address')}
          labelStyle={{
            paddingBottom: 10,

            fontFamily: text.font,
            textAlign: 'left',
          }}
          numberOfLines={3}
          shake={true}
          keyboardType="default"
          onChangeText={(address) => setAddress(address)}
        />
        <Input
          spellCheck={true}
          editable={editMode}
          placeholder={notes ? notes : I18n.t('additional_information')}
          value={notes ? notes : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 10,
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: iconSizes.tiny,
            height: 80,
          }}
          inputStyle={widgetStyles.inputStyle}
          label={I18n.t('additional_information')}
          labelStyle={{
            paddingBottom: 10,

            fontFamily: text.font,
            textAlign: 'left',
          }}
          shake={true}
          keyboardType="default"
          multiline={true}
          numberOfLines={3}
          onChangeText={(notes) => setNotes(notes)}
        />

        {coupon && editMode ? (
          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: 'lightgrey',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              {I18n.t('have_coupon')}
            </Text>
            <Input
              placeholder={I18n.t('coupon')}
              value={code ? code : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 10,
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="default"
              onChangeText={(code) => setCode(code)}
            />
            <Button
              raised
              containerStyle={{marginBottom: 10, width: '90%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
              }}
              title={I18n.t('add_coupon')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color,
              }}
              onPress={() => dispatch(getCoupon(code))}
            />
          </View>
        ) : null}
      </View>
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
      {editMode ? (
        <Button
          disabled={!checked}
          raised
          containerStyle={{marginBottom: 10, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0,
          }}
          title={I18n.t('confirm_information')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
          onPress={() =>
            dispatch(
              submitCart({
                name,
                email,
                mobile,
                address,
                country_id: shipmentCountry.id,
                notes,
                area: area ? area : 'N/A',
              }),
            )
          }
        />
      ) : (
        <View>
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('go_to_payment_my_fatoorah')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() =>
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
              })
            }
          />
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('go_to_payment_tap')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            onPress={() =>
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
              })
            }
          />
        </View>
      )}
      <Button
        raised
        containerStyle={{marginBottom: 10}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        title={I18n.t('clear_cart')}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
        onPress={() => dispatch(clearCart())}
      />
    </View>
  );
};

export default DesigneratCartForm;
