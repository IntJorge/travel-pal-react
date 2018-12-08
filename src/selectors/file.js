import { createSelector } from 'reselect';
import Immutable from 'immutable';


export const getFileState = (state = {}) => state.get('file');

export const makeSelectFileModelByMeta = () => createSelector(
    getFileState,
    (fileState) => (meta) => {
        return !fileState ? undefined: fileState.getIn([meta, 'model'])
    }
);

export const makeSelectFileModelFieldByMeta = () => createSelector(
    getFileState,
    (fileState) => (meta, field) => {
        if (!fileState) return undefined;

        return fileState.getIn([meta, 'model', field]);
    }
);