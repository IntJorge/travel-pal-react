import {
    APP_DEVICE_READY,
    APP_LOCATION_CHANGE,
    APP_LOCATION_REQUEST,
    APP_LOCATION_WATCH_CHANGE,
    APP_LOCATION_WATCH_CLEAR,
    APP_ALERT_SHOW,
    APP_ALERT_DISMISS,
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

export const appAlertShow = ({ title, description }) => {
    return {
        type: APP_ALERT_SHOW,
        title,
        description,
    };
};

export const appAlertDismiss = () => {
    return {
        type: APP_ALERT_DISMISS,
    };
};