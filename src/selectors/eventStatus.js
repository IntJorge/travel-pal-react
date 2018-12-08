
import { createSelector } from 'reselect';
import Immutable from 'immutable';


export const getEventStatusState = (state = {}) => state.get('eventStatus');

export const makeSelectEventStatusModelByMeta = () => createSelector(
    getEventStatusState,
    (eventStatusState) => (meta) => {
        return !eventStatusState ? undefined : eventStatusState.getIn([meta, 'model'])
    }
);

export const makeSelectEventStatusModelFieldByMeta = () => createSelector(
    getEventStatusState,
    (eventStatusState) => (meta, field) => {
        if (!eventStatusState) return undefined;

        return eventStatusState.getIn([meta, 'model', field]);
    }
);