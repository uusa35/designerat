import React, {useContext, useState, createRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import LoginForm from '../../components/widgets/user/LoginForm';
import BgContainer from '../../components/containers/BgContainer';
import {HOMEKEY} from './../../../app';
import DesigneratLoginForm from '../../components/widgets/user/DesigneratLoginForm';
import I18n from './../../I18n';
import widgetStyles from '../../components/widgets/widgetStyles';
import {themeColors} from '../../constants/colors';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {text} from '../../constants/sizes';
import {isEmpty} from 'lodash';
import {submitMobileConfirmationCode} from '../../redux/actions/user';
import {useDispatch} from 'react-redux';

const secondTextInput = createRef();
const thirdTextInput = createRef();
const forthTextInput = createRef();

const DesigneratMobileConfirmationScreen = () => {
  const {colors} = useContext(GlobalValuesContext);
  const [code, setCode] = useState('');
  const [codeFirst, setCodeFirst] = useState('');
  const [codeSecond, setCodeSecond] = useState('');
  const [codeThird, setCodeThird] = useState('');
  const [codeForth, setCodeForth] = useState('');
  const [codeComplete, setCodeComplete] = useState(false);
  const dispatch = useDispatch();

  useMemo(() => {
    if (codeFirst.length === 1) {
      secondTextInput.current?.focus();
    }
  }, [codeFirst]);

  useMemo(() => {
    if (codeSecond.length === 1) {
      thirdTextInput.current?.focus();
    }
  }, [codeSecond]);

  useMemo(() => {
    if (codeThird.length === 1) {
      forthTextInput.current?.focus();
    }
  }, [codeThird]);

  useMemo(() => {
    setCode(`${codeForth}${codeThird}${codeSecond}${codeFirst}`);
  }, [codeFirst, codeSecond, codeThird, codeForth]);

  useMemo(() => {
    if (code.length === 4) {
      setCodeComplete(true);
    } else {
      setCodeComplete(false);
    }
  }, [code]);

  return (
    <BgContainer showImage={false}>
      <View style={{marginTop: '10%', paddingLeft: 20, paddingRight: 20}}>
        <Text style={[widgetStyles.headerThree, {lineHeight: 40}]}>
          {I18n.t('mobile_confirmation_message')}
        </Text>
        <View
          style={{
            marginBottom: '10%',
            marginTop: '5%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <TextInput
            keyboardType="numeric"
            blurOnSubmit={false}
            style={styles.textInput}
            onChangeText={(text) => setCodeFirst(text)}
            maxLength={1}
          />
          <TextInput
            keyboardType="numeric"
            blurOnSubmit={false}
            ref={secondTextInput}
            style={styles.textInput}
            onChangeText={(text) => setCodeSecond(text)}
            maxLength={1}
          />
          <TextInput
            keyboardType="numeric"
            blurOnSubmit={false}
            ref={thirdTextInput}
            style={styles.textInput}
            onChangeText={(text) => setCodeThird(text)}
            maxLength={1}
          />
          <TextInput
            keyboardType="numeric"
            blurOnSubmit={false}
            ref={forthTextInput}
            style={styles.textInput}
            onChangeText={(text) => setCodeForth(text)}
            maxLength={1}
          />
        </View>

        <DesigneratBtn
          disabled={!codeComplete}
          title={I18n.t('confirm')}
          titleStyle={{color: colors.btn_theme_color, fontFamily: text.font}}
          bgColor={
            codeComplete
              ? colors.btn_theme_color
              : themeColors.desinerat.lightGray
          }
          handleClick={() => dispatch(submitMobileConfirmationCode(code))}
        />
      </View>
    </BgContainer>
  );
};

export default DesigneratMobileConfirmationScreen;

DesigneratMobileConfirmationScreen.propTypes = {
  token: PropTypes.string,
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInput: {
    textAlign: 'center',
    marginLeft: 15,
    width: 60,
    height: 70,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: themeColors.desinerat.lightGray,
    fontFamily: text.font,
    fontSize: text.medium,
  },
});