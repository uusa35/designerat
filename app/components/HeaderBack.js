/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  useNavigation,
  TabActions,
  DrawerActions,
} from '@react-navigation/native';
import {clearCart} from '../redux/actions/cart';
import {useDispatch} from 'react-redux';

export const HeaderBack = ({removeCart = false}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log(navigation);

  const handleBack = () => {
    if (removeCart) {
      dispatch(clearCart());
      navigation.navigate('CartTab');
    } else {
      navigation.goBack();
    }
  };

  return (
    <Icon
      type="fontawesome"
      name="chevron-right"
      size={32}
      // onPress={() => handleBack()}
      onPress={() => handleBack()}
      underlayColor="transparent"
      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
      color="black"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '150%',
  },
});
