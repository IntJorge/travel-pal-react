import {
    EVENT_STATUS_MODEL_CHANGE,
    EVENT_STATUS_MODEL_FIELD_CHANGE,
} from '../constants/eventStatus';


export const eventStatusModelChange = ({ meta, overrideModel, fromSaga = false }) => {
    return {
        meta,
        type: EVENT_STATUS_MODEL_CHANGE,
        overrideModel,
        fromSaga,
    }
};

export const eventStatusModelFieldChange = ({ meta, field, value, fromSaga = false }) => {
    return {
        meta,
        type: EVENT_STATUS_MODEL_FIELD_CHANGE,
        field,
        value,
        fromSaga,
    }
};

