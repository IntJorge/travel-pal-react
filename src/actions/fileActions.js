import {
    FILE_MODEL_CHANGE,
    FILE_MODEL_SAVE,
    FILE_MODEL_REQUEST,
    FILE_MODEL_RECEIVE,
    FILE_MODEL_FIELD_CHANGE,
} from '../constants/file';


export const fileModelChange = ({ meta, overrideModel, fromSaga = false, }) => {
    return {
        meta,
        overrideModel,
        fromSaga,
        type: FILE_MODEL_CHANGE,
    };
};

export const fileModelSave = ({ meta }) => {
    return {
        meta,
        type: FILE_MODEL_CHANGE,
    };
};

export const fileModelFieldChange = ({ meta, field, value, fromSaga = false, }) => {
    return {
        meta,
        field,
        value,
        fromSaga,
        type: FILE_MODEL_CHANGE,
    };
};

export const fileModelRequest = ({ meta }) => {
    return {
        meta,
        type: FILE_MODEL_REQUEST,
    };
};

export const fileModelReceive = ({ meta }) => {
    return {
        meta,
        type: FILE_MODEL_RECEIVE,
    };
};
