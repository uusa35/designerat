import React, {useState, useContext, Fragment} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {
  bottomContentInset,
  text,
  height,
  iconSizes,
  formWidget,
} from '../../../constants/sizes';
import {icons} from '../../../constants/images';
import {enableErrorMessage, showCountryModal} from '../../../redux/actions';
import {
  companyRegister,
  register,
  submitAuth,
} from '../../../redux/actions/user';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {ABATI, APP_CASE} from './../../../../app';
import {useDispatch, useSelector} from 'react-redux';
import {filter, first, map, remove} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';
import ImagePicker from 'react-native-image-crop-picker';
import widgetStyles from '../widgetStyles';
import validate from 'validate.js';
import {validateSubmitRegister} from '../../../constants/validations';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratBtn from '../Button/DesigneratBtn';
import {themeColors} from '../../../constants/colors';
import DesineratRegisterFormIsMaleComponenet from './DesineratRegisterFormIsMaleComponenet';

const DesigneratRegisterFormWidget = ({showLabel = false}) => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {country, playerId, role, roles} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [sampleLogo, setSampleLogo] = useState(null);
  const [images, setImages] = useState();
  const [isMale, setIsMale] = useState(false);

  const openLogoPicker = () => {
    return ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: false,
      includeBase64: true,
      includeExif: true,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then((image) => {
      setImage(image);
      // setSampleLogo(image.path);
    });
  };

  const openImagesPicker = () => {
    return ImagePicker.openPicker({
      width: 1080,
      height: 1440,
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1440,
      multiple: true,
      cropping: true,
      freeStyleCropEnabled: false,
      includeBase64: false,
      includeExif: true,
      maxFiles: 2,
      minFiles: 1,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then((images) => {
      setImages(images);
    });
  };

  const removeImage = (i) => {
    const newImages = remove(images, (img, index) => i !== index);
    setImages(newImages);
  };

  const handleRegister = () => {
    // if (!validate.isEmpty(role) && !role.isClient) {
    //   return validateSubmitRegister
    //     .validate({
    //       name,
    //       email,
    //       password,
    //       mobile,
    //       country_id: country.id,
    //       address,
    //       player_id: playerId,
    //       description,
    //       image,
    //       images,
    //       role_id: role.id,
    //     })
    //     .then((r) => {
    //       // ImagePicker.clean()
    //       //   .then(() => {
    //       // console.log('removed all tmp images from tmp directory');
    //       // })
    //       // .catch((e) => {
    //       // console.log('picker error', e);
    //       // });
    //       return dispatch(
    //         companyRegister({
    //           name,
    //           email,
    //           password,
    //           mobile,
    //           country_id: country.id,
    //           address,
    //           player_id: playerId,
    //           description,
    //           image,
    //           images,
    //           role_id: role
    //             ? role.id
    //             : first(filter(roles, (r) => r.isCompany)).id,
    //         }),
    //       );
    //     })
    //     .catch((e) => {
    //       const {message, item} = first(e.errors);
    //       return dispatch(
    //         enableErrorMessage(
    //           message ? I18n.t(message, {item}) : I18n.t(first(e.errors)),
    //         ),
    //       );
    //     });
    // } else {
    dispatch(
      register({
        name,
        email,
        password,
        mobile,
        country_id: country.id,
        address,
        player_id: playerId,
        description,
        is_male: isMale,
        role_id: role ? role.id : first(filter(roles, (r) => r.isClient)).id,
      }),
    );
    // }
  };

  return (
    <KeyBoardContainer>
      <ImageLoaderContainer
        img={logo}
        style={{
          width: 50,
          height: 50,
          marginTop: '10%',
          marginBottom: '10%',
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
      {/*{(role.isDesigner || role.isCompany) && (*/}
      {/*  <TouchableOpacity*/}
      {/*    onPress={() => openLogoPicker()}*/}
      {/*    style={{*/}
      {/*      width: '100%',*/}
      {/*      alignItems: 'center',*/}
      {/*      marginTop: 20,*/}
      {/*      marginBottom: 20,*/}
      {/*    }}>*/}
      {/*    <ImageLoaderContainer*/}
      {/*      img={image && image.path ? image.path : sampleLogo}*/}
      {/*      style={{*/}
      {/*        width: 120,*/}
      {/*        height: 120,*/}
      {/*        margin: 10,*/}
      {/*        borderWidth: 1,*/}
      {/*        borderColor: 'lightgrey',*/}
      {/*        borderRadius: 120 / 2,*/}
      {/*      }}*/}
      {/*      resizeMode="cover"*/}
      {/*    />*/}
      {/*    <Text style={{fontFamily: text.font, fontSize: text.small}}>*/}
      {/*      {I18n.t('add_logo')}*/}
      {/*    </Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}
      <Input
        placeholder={I18n.t('email') + '*'}
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
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        leftIcon={() => (
          <Icon
            name="envelope"
            type="evilicon"
            size={iconSizes.smaller}
            onPress={() => setVisiblePassword(!visiblePassword)}
          />
        )}
      />
      <Input
        placeholder={I18n.t('password')}
        secureTextEntry={true}
        containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
        inputContainerStyle={[
          widgetStyles.inputContainerStyle,
          {borderBottomWidth: 0, borderRadius: 0},
        ]}
        inputStyle={widgetStyles.inputStyle}
        label={showLabel ? I18n.t('password') : null}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="default"
        onChangeText={(text) => setPassword(text)}
        leftIcon={() => (
          <Icon
            name="lock"
            type="evilicon"
            size={iconSizes.smaller}
            onPress={() => setVisiblePassword(!visiblePassword)}
          />
        )}
      />
      <Input
        placeholder={I18n.t('first_name') + '*'}
        containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
        inputContainerStyle={[
          widgetStyles.inputContainerStyle,
          {
            borderBottomWidth: 0,
            borderRadius: 0,
          },
        ]}
        inputStyle={widgetStyles.inputStyle}
        label={showLabel ? I18n.t('first_name') : null}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="default"
        onChangeText={(text) => setName(text)}
      />
      <Input
        leftIcon={() => <Text>+{country.calling_code}</Text>}
        leftIconContainerStyle={{paddingRight: 15}}
        containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
        placeholder={I18n.t('mobile') + '*'}
        inputContainerStyle={[
          widgetStyles.inputContainerStyle,
          {
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
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
        onChangeText={(text) => setMobile(text)}
      />

      <DesineratRegisterFormIsMaleComponenet
        isMale={isMale}
        setIsMale={setIsMale}
      />
      {/*{(role.isDesigner || role.isCompany) && (*/}
      {/*  <>*/}
      {/*    <Text*/}
      {/*      style={[*/}
      {/*        styles.titleLabelStyle,*/}
      {/*        {*/}
      {/*          color: colors.main_theme_color,*/}
      {/*          marginTop: 20,*/}
      {/*          paddingLeft: 15,*/}
      {/*        },*/}
      {/*      ]}>*/}
      {/*      {I18n.t('more_images')}*/}
      {/*    </Text>*/}
      {/*    <View style={{backgroundColor: 'white', borderRadius: 5, margin: 15}}>*/}
      {/*      <TouchableOpacity*/}
      {/*        onPress={() => openImagesPicker()}*/}
      {/*        style={{width: '100%', marginTop: 0, alignItems: 'center'}}>*/}
      {/*        {validate.isEmpty(first(images)) && (*/}
      {/*          <ImageLoaderContainer*/}
      {/*            img={first(images) ? first(images).path : sampleLogo}*/}
      {/*            style={{*/}
      {/*              width: 120,*/}
      {/*              height: 120,*/}
      {/*              margin: 20,*/}
      {/*              borderWidth: 1,*/}
      {/*              borderColor: 'lightgrey',*/}
      {/*              borderRadius: 120 / 2,*/}
      {/*            }}*/}
      {/*            resizeMode="cover"*/}
      {/*          />*/}
      {/*        )}*/}
      {/*      </TouchableOpacity>*/}
      {/*    </View>*/}
      {/*  </>*/}
      {/*)}*/}

      {!validate.isEmpty(images) && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
          style={[
            widgetStyles.wrapper,
            {borderWidth: 1, borderColor: 'lightgrey', minHeight: 120},
          ]}>
          {map(images, (img, i) => (
            <ImageBackground
              key={i}
              source={{uri: img.path}}
              style={{
                width: 100,
                height: 100,
                marginRight: 5,
                marginLeft: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  opacity: 0.7,
                }}>
                <Icon
                  size={30}
                  name="close"
                  type="evil-icons"
                  onPress={() => removeImage(i)}
                />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
      )}

      <DesigneratBtn
        handleClick={() => handleRegister()}
        marginTop={20}
        title={I18n.t('register')}
      />

      <DesigneratBtn
        handleClick={() => navigation.navigate('Login')}
        marginTop={20}
        bg={false}
        title={I18n.t('u_have_account_already_log_in_now')}
      />
    </KeyBoardContainer>
  );
};

export default React.memo(DesigneratRegisterFormWidget);

DesigneratRegisterFormWidget.propTypes = {};

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
