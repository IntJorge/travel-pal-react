/**
 * externals api reducer
 */
import {
    EXTERNALS_REQUEST,
    EXTERNALS_RECEIVE,
} from '../constants/externals';


import { fromJS } from 'immutable';

const reducer = (state, action) => {

};


const externalsReducer = (state = fromJS({}), action) => {
    let newState = { ...state };
    switch(action.type) {
        case EXTERNALS_REQUEST:
            break;

        case EXTERNALS_RECEIVE:
            break;

        default:
            return newState;
    }

    return newState;
};

export default externalsReducer;