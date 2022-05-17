import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as locationsApi from '../../shared/api/locationsApi';
import { USER_DATA_TOKEN_KEY } from '../../shared/constants';
import { actions } from './locationsSlice';
import { UserInfoUpdateForm } from './types';

function* fetchLocations() {
  try {
    const locations = yield call(locationsApi.fetchLocations);
    yield put({ type: actions.fetchLocationsSuccess.type, payload: locations });
  } catch {
    yield put({ type: actions.fetchLocationsFailure.type });
  }
}

function* updateUserInfo(action: PayloadAction<UserInfoUpdateForm>) {
  try {
    const formData = action.payload;
    yield call(locationsApi.updateLocation, formData);
    localStorage.setItem(USER_DATA_TOKEN_KEY, JSON.stringify(formData))
    yield put({ type: actions.submitUserInfoUpdateFormSuccess.type, payload: formData });
    yield put({ type: actions.fetchLocations.type });
  } catch {
    yield put({ type: actions.submitUserInfoUpdateFormFailure.type });
  }
}

export function* applyLocationsEffects() {
  yield takeLatest(actions.fetchLocations.type, fetchLocations);
  yield takeLatest(actions.submitUserInfoUpdateForm.type, updateUserInfo);
}
