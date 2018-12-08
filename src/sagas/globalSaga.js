
import { 
    channel,
    delay, } from 'redux-saga';
import {
    all,
    take,
    takeLatest,
    call,
    select,
    put,
} from 'redux-saga/effects'

import {
    APP_DEVICE_READY,
    APP_LOCATION_REQUEST
} from '../constants/globals';

import {
    fileModelChange,
    fileModelFieldChange,
} from '../actions/fileActions';

import {
    appLocationChange,
    appLocationWatchChange,
    appLocationRequest,
    appAlertShow,
} from '../actions/globals';

import {
    formModelChange,
} from '../actions/form';

import {
    eventStatusModelFieldChange,
} from '../actions/eventStatusActions';

import {
    FORM_MODEL_CHANGE,
} from '../constants/form';

import {
    APP_LOCATION_WATCH_CLEAR,
} from '../constants/globals';

import {
    makeSelectGlobalLocationWatchId,
} from '../selectors/globals';

import FileHelper from '../utils/files';
import ApiHelper from '../utils/api';
import Helpers from '../utils/helpers';

const globalChannel = channel();

const getGlobalLocationWatchId = makeSelectGlobalLocationWatchId();

/**
 * global application saga
 */
function* globalSaga() {
    yield all([
        watchDeviceReadySaga(),
        watchGlobalChannel(),
        watchDeviceLocationRequestSaga(),
        watchDeviceLocationWatchClearSaga(),
    ]);
}

/**
 * watch for device ready action
 */
function* watchDeviceReadySaga() {
    yield takeLatest(APP_DEVICE_READY, handleAppDeviceReady);
}

/**
 * watch for geolocation request actions
 */
function* watchDeviceLocationRequestSaga() {
    yield takeLatest(APP_LOCATION_REQUEST, handleDeviceLocationRequest);
}

/**
 * watch for geolocation watch clear request actions
 */
function* watchDeviceLocationWatchClearSaga() {
    yield takeLatest(APP_LOCATION_WATCH_CLEAR, handleDeviceLocationWatchClear);
}

function* handleAppDeviceReady(action) {
    try {

        console.debug("App Device Ready.");
        yield put(appLocationRequest());
        // FileHelper.requestFileSystem({
        //     fileName: 'globals.json',
        //     onSuccess: (fileEntry) => {
        //         console.log("FILE ENTRY", fileEntry);
        //     },
        // });

        // yield put(eventStatusModelFieldChange({
        //     meta: 'placeInfo',
        //     field: 'isLoading',
        //     value: true,
        //     fromSaga: true,
        // }));

        // yield call(Helpers.getCurrentLatLng, ({ onSuccess: ({ lat, lng }) => {
        //     globalChannel.put(appLocationChange({ lat, lng }));

        //     ApiHelper.getLocationDetails({ lat, lng, onSuccess: (locData) => {
        //         globalChannel.put(formModelChange({ meta: 'placeInfo', overrideModel: { ...locData}, fromSaga: true }));
        //     }});
        // }}));

        // yield put(eventStatusModelFieldChange({
        //     meta: 'placeInfo',
        //     field: 'isLoading',
        //     value: false,
        //     fromSaga: true,
        // }));

    } catch (e) {
        console.error("handleAppDeviceReady error ", e);
    }
}


function* handleDeviceLocationRequest(action) {
    yield put(eventStatusModelFieldChange({
        meta: 'placeInfo',
        field: 'isLoading',
        value: true,
        fromSaga: true,
    }));

    yield call(Helpers.getCurrentLatLng, (
        { 
            onSuccess: ({ lat, lng }) => {
                console.debug("GPS Successful", lat, lng);
                globalChannel.put(appLocationChange({ lat, lng }));

                ApiHelper.getLocationDetails({ 
                    lat,
                    lng,
                    onSuccess: (locData) => {
                        globalChannel.put(formModelChange({ meta: 'placeInfo', overrideModel: { ...locData}, fromSaga: true }));
                    },
                    onError: (error) => {
                        globalChannel.put(appAlertShow({ title: 'OpenCage API Error', description: 'Oops! Error encountered while fething data from OpenCage. Please refresh the map.'}));

                        // yield call(delay, 2000);
                        globalChannel.put(eventStatusModelFieldChange({
                            meta: 'placeInfo',
                            field: 'isLoading',
                            value: false,
                            fromSaga: true,
                        }));
                    },
                });
            },
            onError: (e) => {     
                globalChannel.put(appAlertShow({ title: 'GPS Error', description: 'Oops! Location cannot be fetched at the moment. Please refresh the map.'}));
            },
        }
    ));
}

function* handleDeviceLocationWatchClear(action) {
    const watchId = yield select(state => getGlobalLocationWatchId(state));

    if (watchId !== undefined && watchId !== null) {
        Helpers.stopLocationWatch({ watchId });
    }
}


function* watchGlobalChannel() {
    while(true) {
        const action = yield take(globalChannel);
        const { type, meta, fromSaga } = action;
        yield put(action);

        if (type === FORM_MODEL_CHANGE && meta === 'placeInfo' && fromSaga) {
            // yield call(delay, 2000);
            yield put(eventStatusModelFieldChange({
                meta: 'placeInfo',
                field: 'isLoading',
                value: false,
                fromSaga: true,
            }));
        }
    };
}


export default globalSaga;