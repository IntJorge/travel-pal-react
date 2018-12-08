import {
    FORM_MODEL_CHANGE,
    FORM_MODEL_SAVE,
    FORM_MODEL_FIELD_CHANGE,
} from '../constants/form';


export const formModelChange = ({ meta, overrideModel, fromSaga = false, }) => {
    return {
        meta,
        overrideModel,
        fromSaga,
        type: FORM_MODEL_CHANGE,
    };
}

export const formModelFieldChange = ({ meta, field, value, fromSaga = false, }) => {
    return {
        meta,
        field,
        value,
        fromSaga,
        type: FORM_MODEL_FIELD_CHANGE,
    };
}

export const formModelSave = ({ meta }) => {
    return {
        meta,
        type: FORM_MODEL_SAVE,
    };
};