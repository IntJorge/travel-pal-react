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

export const makeSelectGlobalAlertIsOpen = () => createSelector(
    getGlobalState,
    (globalState) => {
        return !globalState ? Immutable.Map() : globalState.getIn(['alert', 'isOpen'])
    }
);

export const makeSelectGlobalAlertTitle = () => createSelector(
    getGlobalState,
    (globalState) => {
        return !globalState ? Immutable.Map() : globalState.getIn(['alert', 'title'])
    }
);

export const makeSelectGlobalAlertDescription = () => createSelector(
    getGlobalState,
    (globalState) => {
        return !globalState ? Immutable.Map() : globalState.getIn(['alert', 'description'])
    }
);