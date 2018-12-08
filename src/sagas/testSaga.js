import { takeLatest } from 'redux-saga/effects'

import {
    EXTERNALS_REQUEST
} from '../constants/externals';

function* testSaga() {
  yield takeLatest('EXTERNALS_REQUEST', handleTest);
}

function* handleTest(action) {
    console.debug("Saga Action", action);
}


export default testSaga;