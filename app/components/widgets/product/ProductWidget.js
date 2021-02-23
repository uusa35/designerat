import React, {useContext, Fragment} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  Linking,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {
  iconSizes,
  productWidget,
  text,
  touchOpacity,
} from '../../../constants/sizes';
import TagWidget from './../TagWidget';
import I18n from './../../../I18n';
import FastImage from 'react-native-fast-image';
import {images} from '../../../constants/images';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {appUrlIos} from '../../../env';
import {Button, Icon} from 'react-native-elements';
import {APP_CASE} from './../../../../app.json';
import {toggleProductFavorite} from '../../../redux/actions/product';
import {useDispatch, useSelector} from 'react-redux';

const ProductWidget = ({
  element,
  showName = false,
  handleClickProductWidget,
  width = '48%',
}) => {
  const {currency_symbol, exchange_rate, colors} = useContext(
    GlobalValuesContext,
  );
  const {token, guest} = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={[
        widgetStyles.productServiceWidget,
        {width: width, borderWidth: 0.5},
      ]}
      onPress={() => handleClickProductWidget(element)}>
      <Fragment>
        <ImageLoaderContainer
          img={element.thumb}
          style={styles.image}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 80,
            right: 0,
            opacity: 0.5,
          }}>
          {element.exclusive ? <TagWidget tagName="exclusive" /> : null}
          {element.isOnSale ? (
            <TagWidget tagName="under_sale" bgColor="red" />
          ) : null}
          {element.isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
          {!element.hasStock && (
            <TagWidget tagName="out_of_stock" bgColor="red" />
          )}
        </View>
      </Fragment>
      {showName && (
        <View
          style={{
            width: '100%',
            paddingTop: 5,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingRight: 5,
              paddingLeft: 5,
            }}>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.small,
                  color: colors.header_tow_theme_color,
                },
              ]}>
              {element.name.substring(0, 20)}
            </Text>
            <Text
              style={[
                widgetStyles.elementName,
                {
                  fontSize: text.medium,
                  color: colors.header_one_theme_color,
                },
              ]}>
              {`${getConvertedFinalPrice(element.finalPrice, exchange_rate)}`}{' '}
              <Text
                style={[widgetStyles.elementName, {fontSize: text.smaller}]}>
                {currency_symbol}
              </Text>
            </Text>
          </View>
          {element.sku && (
            <Text
              style={[
                widgetStyles.elementName,
                {
                  textAlign: 'center',
                  fontSize: text.small,
                  color: colors.header_tow_theme_color,
                  paddingRight: 5,
                  paddingLeft: 5,
                },
              ]}>
              {`${I18n.t('sku')} :  ${element.sku.substring(0, 15)}`}
            </Text>
          )}
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              height: 35,
            }}>
            <TouchableOpacity
              onPress={() => handleClickProductWidget(element)}
              style={{
                width: '80%',
                backgroundColor: 'black',
                justifyContent: 'center',
                height: 35,
                borderBottomLeftRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.small,
                  textAlign: 'center',
                  color: 'white',
                }}>
                {I18n.t('buy_now')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'lightgrey',
                borderBottomRightRadius: 5,
                height: 35,
              }}>
              <Icon
                disabled={guest}
                onPress={() => {
                  dispatch(
                    toggleProductFavorite({
                      api_token: token,
                      product_id: element.id,
                    }),
                  );
                }}
                name="heart-outline"
                type="ionicon"
                size={iconSizes.small}
                underlayColor="transparent"
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ProductWidget);

ProductWidget.propTypes = {
  element: PropTypes.object.isRequired,
  handleClickProductWidget: PropTypes.func.isRequired,
  exchange_rate: PropTypes.number,
  currency_symbol: PropTypes.string,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: '100%',
    height: productWidget[APP_CASE].smaller.height,
  },
});
