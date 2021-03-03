import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import RegisterFormWidget from '../../components/widgets/user/RegisterFormWidget';
import BgContainer from '../../components/containers/BgContainer';
import {useDispatch, useSelector} from 'react-redux';
import validate from 'validate.js';
import DesigneratRegisterFormWidget from '../../components/widgets/user/DesigneratRegisterFormWidget';

const DesigneratRegisterScreen = () => {
  const [userCountryId, setUserCountryId] = useState('');
  // const [visible, setVisible] = useState(false);
  // const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  // const parent = dangerouslyGetParent();

  return (
    <BgContainer showImage={false}>
      <DesigneratRegisterFormWidget />
    </BgContainer>
  );
};

export default DesigneratRegisterScreen;
const styles = StyleSheet.create({
  iconContainer: {
    flex: 0.1,
    padding: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
