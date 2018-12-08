import { connect } from 'react-redux'

import {
  makeSelectGlobalLocation,
  makeSelectGlobalPrevLocation,
} from '../selectors/globals';

import {
  makeSelectFileModelByMeta,
} from '../selectors/file';

import {
  makeSelectFormModelByMeta,
} from '../selectors/form';

import {
  makeSelectEventStatusModelFieldByMeta,
} from '../selectors/eventStatus';

import {
  appLocationRequest,
  appLocationWatchClear,
} from '../actions/globals';

import NavigationScreenComponent from '../components/NavigationScreenComponent';

import HOCToJS from '../components/HOCToJS';

const makeMapStateToProps = () => {
  const getLocation = makeSelectGlobalLocation();
  const getPrevLocation = makeSelectGlobalPrevLocation();
  const getFileModel = makeSelectFileModelByMeta();
  const getFormModel = makeSelectFormModelByMeta();
  const getEventStatusField = makeSelectEventStatusModelFieldByMeta();

  const mapStateToProps = (state, ownProps) => {
      const location = getLocation(state);
      const prevLocation = getPrevLocation(state);
      const fileModel = getFileModel(state)('placeInfo');
      const formModel = getFormModel(state)('placeInfo');
      const isPlaceInfoLoading = getEventStatusField(state)('placeInfo', 'isLoading') || false;

      // console.debug("FILE MODEL", fileModel && fileModel.toJS());
      // console.debug("FORM MODEL", formModel && formModel.toJS());
      // console.debug("Location", location && location.toJS());

      return {
          gpsLocation: location,
          placeInfo: formModel,
          isPlaceInfoLoading,
          ...ownProps,
      };
  };

  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationRequest: () => {
      dispatch(appLocationRequest());
    },
    onStopLocationWatch: () => {
      dispatch(appLocationWatchClear());
    },
  };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(HOCToJS(NavigationScreenComponent));