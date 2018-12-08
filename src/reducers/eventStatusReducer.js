/**
 * eventStatus reducer
 */
import {
    EVENT_STATUS_MODEL_CHANGE,
    EVENT_STATUS_MODEL_FIELD_CHANGE,
} from '../constants/eventStatus';

import { fromJS } from 'immutable';


const reducer = (state, action) => {
    switch(action.type) {
        case EVENT_STATUS_MODEL_CHANGE:
            return state.set('model', fromJS({ ...action.overrideModel }));    
            
        case EVENT_STATUS_MODEL_FIELD_CHANGE:
            return state.setIn(['model', action.field], action.value);
    }

    return state;
}


const eventStatusReducer = (state = fromJS({}) , action = {}) => {
    if (action.meta !== undefined && action.meta) {
        const eventStatus = state.get(action.meta);
        
        if (!eventStatus) {
            const newEventStatus = fromJS({
                model: {}
            });

            return state.set(action.meta, reducer(newEventStatus, action));
        } else {
            return state.set(action.meta, reducer(eventStatus, action));
        }

    }

    return state;
};



export default eventStatusReducer;