import { createSelector } from 'reselect';
import Immutable from 'immutable';


export const getGlobalState = (state) => state.get('globals');

export const makeSelectGlobalLocation = () => createSelector(
    getGlobalState,
    (globalState) => {
        return !globalState ? Immutable.Map() : globalState.getIn(['location'])
    }
);

export const makeSelectGlobalPrevLocation = () => createSelector(
    getGlobalState,
    (globalState) => {
        return !globalState ? Immutable.Map() : globalState.getIn(['prevLocation'])
    }
);

export const makeSelectGlobalLocationWatchId = () => createSelector(
    getGlobalState,
    (globalState) => {
        return !globalState ? Immutable.Map() : globalState.getIn(['locationWatchId'])
    }
);
