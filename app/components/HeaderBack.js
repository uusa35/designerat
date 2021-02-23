/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

export const HeaderBack = (props) => {
  const route = useRoute();
  console.log('the routte', route);
  console.log('the props', props);
  const navigation = useNavigation();
  const test = getFocusedRouteNameFromRoute(route);
  console.log('test', test);
  console.log('navigation', navigation);
  return (
    <Icon
      type="fontawesome"
      name="chevron-right"
      size={32}
      onPress={() => navigation.goBack()}
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
