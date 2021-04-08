import React from 'react';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import BgContainer from '../components/containers/BgContainer';
import {appUrlIos} from '../env';
import {useNavigation} from '@react-navigation/native';

const PanoramaShowScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <BgContainer>
      <WebView
        javaScriptEnabled={true}
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
