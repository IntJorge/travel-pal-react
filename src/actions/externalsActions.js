import {
    EXTERNALS_REQUEST,
    EXTERNALS_RECEIVE,
} from '../constants/externals';


export const externalsRequest = ({ meta }) => {
    return {
        meta,
        type: EXTERNALS_REQUEST,
    }
};

export const externalsReceive = ({ meta, data }) => {
    return {
        meta,
        data,
        type: EXTERNALS_RECEIVE
    }
};
