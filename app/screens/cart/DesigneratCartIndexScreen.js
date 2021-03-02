import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import validate from 'validate.js';
import {text, width, height} from '../../constants/sizes';
import I18n from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import LottieView from 'lottie-react-native';
import {animations} from '../../constants/animations';
import {View as Animating} from 'react-native-animatable';
import EmptyListWidget from '../../components/Lists/EmptyListWidget';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratCartList from '../../components/widgets/cart/DesigneratCartList';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import widgetStyles from '../../components/widgets/widgetStyles';
const DesigneratCartIndexScreen = () => {
  const {cart, country, shipmentFees, settings, coupon, area} = useSelector(
    (state) => state,
  );
  const {grossTotal, colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  return (
    <BgContainer showImage={false}>
      {!validate.isEmpty(cart) && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#f7f7f7',
          }}>
          <KeyBoardContainer>
            <DesigneratCartList
              shipmentCountry={country}
              shipmentFees={shipmentFees}
              selectedArea={area}
              grossTotal={grossTotal}
              discount={coupon.value}
              shipment_notes={settings.shipment_notes}
              editModeDefault={true}
              coupon={coupon}
            />
          </KeyBoardContainer>
        </View>
      )}
      {validate.isEmpty(cart) && (
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            flex: 1,
            padding: 20,
          }}>
          <LottieView
            source={animations.emptyCart}
            // source={animations.cart}
            autoPlay
            loop
            resizeMode="cover"
            style={{
              alignSelf: 'center',
              width: width / 3,
              height: width / 3,
            }}
            enableMergePathsAndroidForKitKatAndAbove
          />
          <Animating
            animation="bounceIn"
            easing="ease-out"
            useNativeDriver={true}>
            <Text style={[widgetStyles.headerThree, {marginBottom: 20}]}>
              {I18n.t('cart_is_empty')}
            </Text>
            <DesigneratBtn
              handleClick={() => navigation.navigate('FavoriteProductIndex')}
              title={I18n.t('add_from_favorite_list')}
            />
            <DesigneratBtn
              handleClick={() => navigation.navigate('Home')}
              marginTop={20}
              title={I18n.t('continue_shopping')}
            />
          </Animating>
        </View>
      )}
    </BgContainer>
  );
};

export default DesigneratCartIndexScreen;

const styles = StyleSheet.create({});
