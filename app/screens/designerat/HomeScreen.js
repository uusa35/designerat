/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppContainer from '../../components/containers/AppContainer';
import {refetchHomeElements} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import MainSliderWidget from '../../components/designerat/slider/MainSliderWidget';
import DesignerHorizontalWidget from '../../components/designerat/user/DesignerHorizontalWidget';
import CelebrityHorizontalWidget from '../../components/designerat/user/CelebrityHorizontalWidget';
import CompanyHorizontalWidget from '../../components/designerat/user/CompanyHorizontalWidget';

import I18n from './../../I18n';

const HomeScreen = () => {
  const {
    slides,
    homeDesigners,
    homeCelebrities,
    homeCompanies,
    country,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(refetchHomeElements());

  return (
    <AppContainer>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: 'transparent',
          }}
          contentInset={{bottom: 200}}
          horizontal={false}
          scrollEnabled={true}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          endFillColor="white"
          style={{
            paddingBottom: 200,
            backgroundColor: 'transparent',
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => handleRefresh()}
            />
          }>
          <MainSliderWidget elements={slides} />
          {homeDesigners && (
            <DesignerHorizontalWidget
              elements={homeDesigners}
              showName={true}
              name={I18n.t('designers')}
              title={I18n.t('designers')}
              searchParams={{is_designer: 1, country_id: country.id}}
            />
          )}
          {homeCelebrities && (
            <CelebrityHorizontalWidget
              elements={homeCelebrities}
              showName={true}
              name="celebrities"
              title={I18n.t('celebrities')}
              searchParams={{
                is_celebrity: 1,
                country_id: country.id,
                on_home: true,
              }}
            />
          )}
          {homeCompanies && (
            <DesignerHorizontalWidget
              elements={homeCompanies}
              showName={true}
              name="companies"
              title={I18n.t('companies')}
              searchParams={{
                is_company: 1,
                country_id: country.id,
                on_home: true,
              }}
            />
          )}
        </ScrollView>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
