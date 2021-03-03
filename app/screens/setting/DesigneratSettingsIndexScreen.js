import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Linking,
  RefreshControl,
} from 'react-native';
import {View} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
  bottomContentInset,
  iconSizes,
  text,
  touchOpacity,
} from '../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {changeLang, refetchHomeElements} from '../../redux/actions';
import {HOMEKEY, MALLR, ABATI, ESCRAP} from './../../../app';
import {appUrlIos} from '../../env';
import PagesList from '../../components/widgets/page/PagesList';
import {getMyClassifieds} from '../../redux/actions/classified';
import {reAuthenticate, setRole, submitAuth} from '../../redux/actions/user';
import BgContainer from '../../components/containers/BgContainer';
import CopyRightInfo from '../../components/widgets/setting/CopyRightInfo';
import {isEmpty, first, filter} from 'lodash';
import {width} from './../../constants';
import widgetStyles from '../../components/widgets/widgetStyles';

const DesigneratSettingsIndexScreen = ({navigation}) => {
  const {guest, lang, settings, version, roles} = useSelector((state) => state);
  const {colors} = settings;
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
    dispatch(refetchHomeElements());
  };

  const handleRegisterClick = () => {
    if (!isEmpty(roles)) {
      dispatch(setRole(first(filter(roles, (r) => r.name === 'Client'))));
    }
    return navigation.navigate('Register');
  };

  return (
    <BgContainer enableMargin={true} showImage={false}>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          padding: 20,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        <View
          animation="bounceIn"
          easing="ease-out"
          useNativeDriver={true}
          style={styles.container}>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => navigation.navigate('FavoriteProductIndex')}
            style={styles.btnWrapper}>
            <Icon name="staro" type="antdesign" size={iconSizes.medium} />
            <Text style={styles.btnTitle}>{I18n.t('product_favorites')}</Text>
          </TouchableOpacity>
          {!guest && (HOMEKEY || ESCRAP) ? (
            <Fragment>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() => navigation.navigate('FavoriteClassifiedIndex')}
                style={styles.btnWrapper}>
                <Icon name="staro" type="antdesign" size={iconSizes.medium} />
                <Text style={styles.btnTitle}>
                  {I18n.t('classified_favorites')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={touchOpacity}
                onPress={() => dispatch(getMyClassifieds({redirect: true}))}
                style={styles.btnWrapper}>
                <Icon name="profile" type="antdesign" size={iconSizes.medium} />
                <Text style={styles.btnTitle}>{I18n.t('my_classifieds')}</Text>
              </TouchableOpacity>
            </Fragment>
          ) : null}
          {!guest ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() =>
                navigation.navigate('ProfileIndex', {name: I18n.t('profile')})
              }
              style={styles.btnWrapper}>
              <Icon name="face" type="material" size={iconSizes.medium} />
              <Text style={styles.btnTitle}>{I18n.t('profile')}</Text>
            </TouchableOpacity>
          ) : null}
          {!guest && !(HOMEKEY || ESCRAP) ? (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              onPress={() => navigation.navigate('OrderIndex')}
              style={styles.btnWrapper}>
              <Icon name="history" type="material" size={iconSizes.medium} />
              <Text style={styles.btnTitle}>{I18n.t('order_history')}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
            style={styles.btnWrapper}>
            <Icon name="globe" type="font-awesome" size={iconSizes.medium} />
            <Text style={styles.btnTitle}>{I18n.t('lang')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            onPress={() => navigation.navigate('Contactus')}
            style={styles.btnWrapper}>
            <Icon name="mobile1" type="antdesign" size={iconSizes.medium} />
            <Text style={styles.btnTitle}>{I18n.t('contactus')}</Text>
          </TouchableOpacity>
        </View>
        {guest ? (
          <Fragment>
            <TouchableOpacity
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.btn_bg_theme_color,
                height: 50,
                marginBottom: 10,
                borderRadius: 3,
              }}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={[
                  widgetStyles.headerTow,
                  {color: colors.btn_theme_color, textAlign: 'center'},
                ]}>
                {I18n.t('login')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 10, margin: 10}}
              onPress={() => handleRegisterClick()}>
              <Text style={widgetStyles.headerThree}>
                {I18n.t('u_dont_have_account_register_now')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 10, margin: 10}}
              onPress={() => Linking.openURL(`${appUrlIos}password/reset`)}>
              <Text style={widgetStyles.headerThree}>
                {I18n.t('did_u_forget_password')}
              </Text>
            </TouchableOpacity>
          </Fragment>
        ) : null}
        <PagesList title={I18n.t('our_support')} />
      </ScrollView>
      <CopyRightInfo version={version} />
    </BgContainer>
  );
};

export default DesigneratSettingsIndexScreen;

// DesigneratSettingsIndexScreen.propTypes = {
//   guest: PropTypes.bool.isRequired,
// };
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: '5%',
  },
  btnWrapper: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    width: '45%',
    height: 120,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'center',
  },
});
