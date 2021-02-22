import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {text, iconSizes} from '../_____constants/sizes';
import widgetStyles from '../______components/widgetStyles';
import {useNavigation} from '@react-navigation/native';
import I18n from './../I18n';
import {Icon} from 'react-native-elements';
import {changeLang} from '../redux/actions';

const SideMenu = ({props, showLogo}) => {
  const {settings, guest, lang} = useSelector((state) => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToHome = () => {
    navigation.closeDrawer();
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <DrawerContentScrollView {...props}>
        <View>
          <Text>Side Menu</Text>
        </View>
        {showLogo && (
          <Drawer.Section style={{alignItems: 'center'}}>
            <FastImage
              source={{uri: settings.app_logo}}
              style={styles.logo}
              resizeMode="contain"
              loadingIndicatorSource={{uri: settings.app_logo}}
            />
            <Text style={[widgetStyles.title, {color: 'white'}]}>
              {settings.company}
            </Text>
          </Drawer.Section>
        )}
        <TouchableOpacity onPress={() => goToHome()} style={styles.menuBtn}>
          <Icon
            name="home"
            type="antdesign"
            size={iconSizes.smaller}
            color={settings.colors.icon_theme_color}
          />
          <Text style={[styles.titleStyle, {color: 'white'}]}>
            {I18n.t('home')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(changeLang(lang === 'ar' ? 'en' : 'ar'))}
          style={styles.menuBtn}>
          <Icon
            name="language"
            type="fontawesome"
            size={iconSizes.smaller}
            color={settings.colors.icon_theme_color}
          />
          <Text style={[styles.titleStyle, {color: 'white'}]}>
            {I18n.t('lang')}
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  menuBtn: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    minHeight: 50,
    borderBottomColor: 'lightgrey',
  },
  mainMenuText: {
    color: 'black',
    fontFamily: text.font,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
});
