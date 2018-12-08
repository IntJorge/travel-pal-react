import { all } from 'redux-saga/effects';
import currencySaga from './currencySaga';
import globalSaga from './globalSaga';

export default function* rootSaga() {
    yield all([
        globalSaga(),
        currencySaga(),
    ]);
}