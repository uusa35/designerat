import React, {Fragment, useState, useMemo, useContext, useEffect} from 'react';
import {ImageBackground, SafeAreaView, StatusBar, View} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import {useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const BgContainer = ({
  children,
  showImage = true,
  img = images.whiteBgUrl,
  enableMargin = false,
  marginVal = height / 30,
  white = false,
}) => {
  const {
    isLoading,
    isConnected,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
  } = useSelector((state) => state);
  const {mainBg} = useContext(GlobalValuesContext);
  const [currentLoading, setCurrentLoading] = useState(
    isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
  );
  const [bg, setBg] = useState();

  useMemo(() => {
    setBg(!showImage ? images.whiteBg : mainBg.includes('.') ? mainBg : img);
  }, []);

  useMemo(() => {
    setCurrentLoading(
      isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
    );
  }, [isLoading, isLoadingBoxedList, isLoadingProfile, isLoadingContent]);

  // useEffect(() => {
  //   if (!isEmpty(navigation)) {
  //     const {routeName} = navigation.state;
  //     if (__DEV__) {
  //       // console.log('dev routeName', routeName);
  //     }
  //     analytics().logEvent(routeName, {
  //       item: `${APP_CASE}_${routeName}`,
  //       description: `${routeName}_${moment().format('YYYY-MM-DD')}`,
  //       start_date: moment().format('YYYY-MM-DD'),
  //     });
  //     analytics().setCurrentScreen(routeName);
  //   }
  // }, []);

  return (
    <ImageBackground
      source={!showImage ? (white ? images.whiteBg : images.grayBg) : {uri: bg}}
      style={{height, width, backgroundColor: 'white', flexGrow: 1, flex: 1}}
      resizeMode="cover">
      {isConnected ? (
        currentLoading ? (
          <LoadingView />
        ) : (
          <View style={{flex: 1, paddingTop: enableMargin ? marginVal : 0}}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
              barStyle={'light-content'}
              // showHideTransition={statusBarTransition}
              // hidden={hidden}
            />
            {children}
          </View>
        )
      ) : (
        <LoadingOfflineView />
      )}
      <AndroidBackHandlerComponent />
    </ImageBackground>
  );
};

export default BgContainer;
