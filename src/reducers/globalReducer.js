/**
 * externals api reducer
 */
import {
    APP_LOCATION_CHANGE,
    APP_LOCATION_WATCH_CHANGE,
    APP_LOCATION_WATCH_CLEAR,
} from '../constants/globals';


import { fromJS } from 'immutable';

const initialState = fromJS({
    location: {
        lat: 53.3498,
        lng: 6.2603,
    },
    prevLocation: {
        lat: 53.3498,
        lng: 6.2603,
    },
    locationWatchId: null,
    test: 'test',
});


const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case APP_LOCATION_CHANGE:
            const oldLat = state.getIn['location', 'lat'];
            const oldLng = state.getIn['location', 'lng'];

            return state
                .setIn(['location', 'lat'], action.lat)
                .setIn(['location', 'lng'], action.lng)
                .setIn(['prevLocation', 'lat'], oldLat)
                .setIn(['prevLocation', 'lng'], oldLng);
        case APP_LOCATION_WATCH_CHANGE:
            return state.setIn(['locationWatchId'], action.watchId);
        case APP_LOCATION_WATCH_CLEAR:
            return state.setIn(['locationWatchId'], null);
        default:
            return state;
    }

    return state;
};

export default globalReducer;