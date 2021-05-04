import React, {useContext, useState, useEffect, Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {iconSizes, text} from '../../../constants/sizes';
import {showCountryModal} from '../../../redux/actions';
import {clearCart, getCoupon, submitCart} from '../../../redux/actions/cart';
import {Button, Input, CheckBox, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {map, round, isNull} from 'lodash';
import ProductItem from '../product/ProductItem';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  CREATE_MYFATOORAH_PAYMENT_URL,
  CREATE_TAP_PAYMENT_URL,
} from '../../../redux/actions/types';
import {getConvertedFinalPrice} from '../../../helpers';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import widgetStyles from '../widgetStyles';
import {themeColors} from '../../../constants/colors';
import DesingeratBtn from '../Button/DesigneratBtn';

const CartList = ({
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
  } = useContext(GlobalValuesContext);
  const {cart, auth, guest, country, settings} = useSelector(state => state);
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
    <Fragment>
      <View
        animation="bounceInLeft"
        easing="ease-out"
        useNativeDriver={true}
        style={{flexDirection: 'column', width: '100%'}}>
        {map(cart, (item, i) => {
          return (
            <ProductItem
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignText: 'center',
            marginTop: 10,
            paddingBottom: 20,
            paddingTop: 20,
            borderTopWidth: 0.5,
            borderTopColor: 'lightgrey',
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              color: colors.header_one_theme_color,
            }}>
            {I18n.t('total')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {round(total, 2)}
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
        {shipmentFees > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignText: 'center',
              marginTop: 10,
              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('shipment_fees_per_piece')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: colors.header_one_theme_color,
                }}>
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
              alignText: 'center',
              marginTop: 10,

              paddingBottom: 20,
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {I18n.t('discount')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: 'red',
                }}>
                {round(coupon.value, 2)}
              </Text>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  color: 'red',
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
            {I18n.t('grossTotal')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                color: colors.header_one_theme_color,
              }}>
              {`${round(grossTotal, 2)} ${I18n.t('kwd')}`}
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
        <View>
          {settings.shipment_notes && (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 15,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: themeColors.desinerat.lightGray,
              }}
              onPress={() => navigate('Contactus')}>
              <Text style={[widgetStyles.headerThree, {lineHeight: 35}]}>
                {settings.shipment_notes}
              </Text>
            </TouchableOpacity>
          )}
          <View style={{paddingTop: 20, paddingBottom: 20}}>
            <Input
              editable={editMode}
              placeholder={name ? name : I18n.t('name')}
              value={name ? name : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('name')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="default"
              onChangeText={name => setName(name)}
            />
            <Input
              editable={editMode}
              placeholder={email ? email : I18n.t('email')}
              value={email ? email : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('email')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
            />
            <Input
              editable={editMode}
              textContentType="telephoneNumber"
              placeholder={mobile ? mobile : I18n.t('mobile')}
              leftIcon={() => <Text>+{country.calling_code}</Text>}
              leftIconContainerStyle={{paddingRight: 15}}
              value={mobile ? mobile : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: iconSizes.tiny,
              }}
              inputStyle={{
                fontFamily: text.font,
                textAlign: isRTL ? 'right' : 'left',
              }}
              label={I18n.t('mobile')}
              labelStyle={{
                paddingBottom: 10,

                fontFamily: text.font,
                textAlign: 'left',
              }}
              shake={true}
              keyboardType="number-pad"
              onChangeText={text => setMobile(text)}
            />
            <TouchableOpacity
              onPress={() => {
                editMode ? dispatch(showCountryModal()) : null;
              }}
              style={{
                borderWidth: 1,
                borderColor: 'lightgrey',
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
            {/*<Input*/}
            {/*  editable={editMode}*/}
            {/*  placeholder={area ? area : I18n.t('area')}*/}
            {/*  value={area ? area : null}*/}
            {/*  inputContainerStyle={{*/}
            {/*    borderWidth: 1,*/}
            {/*    borderColor: 'lightgrey',*/}
            {/*    paddingLeft: 15,*/}
            {/*    paddingRight: 15,*/}
            {/*    marginBottom: iconSizes.tiny,*/}
            {/*  }}*/}
            {/*  inputStyle={{*/}
            {/*    fontFamily: text.font,*/}
            {/*    textAlign: isRTL ? 'right' : 'left',*/}
            {/*  }}*/}
            {/*  label={I18n.t('area')}*/}
            {/*  labelStyle={{*/}
            {/*    paddingBottom: 10,*/}

            {/*    fontFamily: text.font,*/}
            {/*    textAlign: 'left',*/}
            {/*  }}*/}
            {/*  shake={true}*/}
            {/*  keyboardType="default"*/}
            {/*  onChangeText={area => setArea(area)}*/}
            {/*/>*/}
            <Input
              editable={editMode}
              placeholder={address ? address : I18n.t('full_address')}
              value={address ? address : null}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: 'lightgrey',
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
              onChangeText={address => setAddress(address)}
            />
            {/*<Input*/}
            {/*  spellCheck={true}*/}
            {/*  editable={editMode}*/}
            {/*  placeholder={notes ? notes : I18n.t('additional_information')}*/}
            {/*  value={notes ? notes : null}*/}
            {/*  inputContainerStyle={{*/}
            {/*    borderWidth: 1,*/}
            {/*    borderColor: 'lightgrey',*/}
            {/*    paddingLeft: 15,*/}
            {/*    paddingRight: 15,*/}
            {/*    marginBottom: iconSizes.tiny,*/}
            {/*    height: 80,*/}
            {/*  }}*/}
            {/*  inputStyle={{*/}
            {/*    fontFamily: text.font,*/}
            {/*    textAlign: isRTL ? 'right' : 'left',*/}
            {/*  }}*/}
            {/*  label={I18n.t('additional_information')}*/}
            {/*  labelStyle={{*/}
            {/*    paddingBottom: 10,*/}

            {/*    fontFamily: text.font,*/}
            {/*    textAlign: 'left',*/}
            {/*  }}*/}
            {/*  shake={true}*/}
            {/*  keyboardType="default"*/}
            {/*  multiline={true}*/}
            {/*  numberOfLines={3}*/}
            {/*  onChangeText={notes => setNotes(notes)}*/}
            {/*/>*/}
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
            <DesingeratBtn
              disabled={!checked}
              handleClick={() =>
                dispatch(
                  submitCart({
                    name,
                    email,
                    mobile,
                    address: address ? address : 'NOT APPLICABLE',
                    country_id: shipmentCountry.id,
                    notes,
                    area: area ? area : 'N/A',
                  }),
                )
              }
              title={I18n.t('confirm_information')}
            />
          ) : (
            <View>
              <DesingeratBtn
                handleClick={() =>
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
                bg={true}
                title={I18n.t('go_to_payment_my_fatoorah')}
              />
              <DesingeratBtn
                handleClick={() =>
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
                bg={true}
                title={I18n.t('go_to_payment_tap')}
              />
            </View>
          )}
        </View>
      </View>
      <DesingeratBtn
        handleClick={() => dispatch(clearCart())}
        bgColor={'darkred'}
        title={I18n.t('clear_cart')}
      />
    </Fragment>
  );
};

export default CartList;

CartList.propTypes = {
  coupon: PropTypes.object,
  grossTotal: PropTypes.number.isRequired,
  shipment_notes: PropTypes.string,
  shipmentCountry: PropTypes.object.isRequired,
  editModeDefault: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({});
