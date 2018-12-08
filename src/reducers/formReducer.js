/**
 * form reducer
 */
import {
    FORM_MODEL_CHANGE,
    FORM_MODEL_FIELD_CHANGE,
} from '../constants/form';

import { fromJS } from 'immutable';


const reducer = (state, action) => {
    switch(action.type) {
        case FORM_MODEL_CHANGE:
            return state.set('model', fromJS({ ...action.overrideModel }));    
            
        case FORM_MODEL_FIELD_CHANGE:
            return state.setIn(['model', action.field], action.value);
    }

    return state;
}


const formReducer = (state = fromJS({}) , action = {}) => {
    if (action.meta !== undefined && action.meta) {
        const form = state.get(action.meta);
        
        if (!form) {
            const newForm = fromJS({
                model: {}
            });

            return state.set(action.meta, reducer(newForm, action));
        } else {
            return state.set(action.meta, reducer(form, action));
        }

    }

    return state;
};



export default formReducer;