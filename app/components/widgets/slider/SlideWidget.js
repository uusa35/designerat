import React from 'react';
import {Linking, Pressable} from 'react-native';
import {width} from '../../../constants/sizes';
import {isNull} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';

const SlideWidget = ({slide}) => {
  return (
    <Pressable
      key={slide.id}
      onPress={() => {
        Linking.openURL(!isNull(slide.path) ? slide.path : slide.url);
      }}>
      <ImageLoaderContainer
        img={slide.large}
        style={{width, height: '100%'}}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default SlideWidget;
