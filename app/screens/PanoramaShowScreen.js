import React, {useState, Fragment} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import BgContainer from '../components/containers/BgContainer';
import {appUrlIos} from '../env';
import {useNavigation} from '@react-navigation/native';
import I18n from './../I18n';
import EmptyListWidget from '../components/Lists/EmptyListWidget';
import {images} from '../constants/images';
import {height} from '../constants';
import FastImage from 'react-native-fast-image';
const PanoramaShowScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  return (
    <BgContainer>
      {loading && (
        <View
          style={{
            width: '100%',
            height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={images.loading}
            style={{width: 150, height: 150}}
          />
        </View>
      )}
      <WebView
        javaScriptEnabled={true}
        onLoadEnd={() => setLoading(false)}
        source={{uri: `${appUrlIos}panorama/view`}}
        // style={{marginTop: 20}}
        // injectedJavaScript={'(function(){ return "test"}());'}
        // onNavigationStateChange={(navEvent) =>
        //   !isEmpty(cart) ? dispatch({type: 'CLEAR_CART'}) : null
        // }
      />
    </BgContainer>
  );
};

export default PanoramaShowScreen;
