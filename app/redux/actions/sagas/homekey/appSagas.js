import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  getCountry,
  getPages,
  getTags,
  setCommercials,
  setCountries,
  setHomeSplashes,
  setSettings,
  setSlides,
  startGetHomeCategoriesScenario,
  startGetParentCategoriesScenario,
} from '../requestSagas';
import {
  setHomeBrands,
  startAuthenticatedScenario,
  startGetHomeCompaniesScenario,
} from '../userSagas';
import {setDeviceId, setVersion} from '../settingSagas';
import {
  getClassifiedIndex,
  startGetHomeClassifiedsScenario,
} from '../classifiedSagas';
import {
  getHomeClassifiedCategories,
  getHomeUserCategories,
} from '../categorySagas';
import * as actions from '../../types';

export function* homeKeyBootStrap() {
  const {country} = yield select();
  yield all([
    call(getCountry),
    call(setSettings),
    call(setCountries),
    call(setSlides),
    call(setCommercials),
    call(setHomeBrands),
    call(startAuthenticatedScenario),
    call(setDeviceId),
    call(getPages),
    call(getTags),
    call(getClassifiedIndex),
    call(setHomeSplashes),
    call(getHomeClassifiedCategories, {
      payload: {
        on_home: true,
        type: 'is_classified',
      },
    }),
    call(getHomeUserCategories, {payload: {on_home: true, type: 'is_user'}}),
    // put({type: actions.GET_CATEGORIES}),
    call(startGetParentCategoriesScenario),
    call(startGetHomeCategoriesScenario),
    call(startGetHomeCompaniesScenario, {
      payload: {
        searchParams: {on_home: 1, is_company: 1, country_id: country.id},
      },
    }),
    yield call(startGetHomeClassifiedsScenario, {
      payload: {searchParams: {on_home: 1, country_id: country.id}},
    }),
    put({type: actions.TOGGLE_RESET_APP, payload: false}),
  ]);
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
}
