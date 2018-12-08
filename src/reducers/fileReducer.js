/**
 * form reducer
 */
import {
    FILE_MODEL_CHANGE,
    FILE_MODEL_FIELD_CHANGE,
} from '../constants/file';

import { fromJS } from 'immutable';

const reducer = (state, action) => {
    switch(action.type) {
        case FILE_MODEL_CHANGE:
            return state.set('model', fromJS({ ...action.overrideModel }));    
            
        case FILE_MODEL_FIELD_CHANGE:
            return state.setIn(['model', action.field], action.value);
    }

    return state;
}


const fileReducer = (state = fromJS({}) , action = {}) => {
    if (action.meta !== undefined && action.meta) {

        const file = state.get(action.meta);
        
        if (!file) {
            const newFile = fromJS({
                model: {}
            });

            return state.set(action.meta, reducer(newFile, action));
        } else {
            return state.set(action.meta, reducer(file, action));
        }

    }

    return state;
};



export default fileReducer;