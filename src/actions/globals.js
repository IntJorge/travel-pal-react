import {
    APP_DEVICE_READY,
    APP_LOCATION_CHANGE,
    APP_LOCATION_REQUEST,
    APP_LOCATION_WATCH_CHANGE,
    APP_LOCATION_WATCH_CLEAR,
} from '../constants/globals';



export const appDeviceReady = () => {
    return {
        type: APP_DEVICE_READY,
    };
}

export const appLocationChange = ({ lat, lng }) => {
    return {
        type: APP_LOCATION_CHANGE,
        lat,
        lng
    };
};

export const appLocationRequest = () => {
    return {
        type: APP_LOCATION_REQUEST,
    };
};

export const appLocationWatchChange = ({ watchId }) => {
    return {
        type: APP_LOCATION_WATCH_CHANGE,
        watchId,
    };
};

export const appLocationWatchClear = () => {
    return {
        type: APP_LOCATION_WATCH_CLEAR,
    };
};