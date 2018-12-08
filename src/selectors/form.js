
import { createSelector } from 'reselect';
import Immutable from 'immutable';


export const getFormState = (state = {}) => state.get('form');

export const makeSelectFormModelByMeta = () => createSelector(
    getFormState,
    (formState) => (meta) => {
        return !formState ? undefined : formState.getIn([meta, 'model'])
    }
);

export const makeSelectFormModelFieldByMeta = () => createSelector(
    getFormState,
    (formState) => (meta, field) => {
        if (!formState) return undefined;

        return formState.getIn([meta, 'model', field]);
    }
);