import { connect } from 'react-redux';

import HomeScreenComponent from '../components/HomeScreenComponent';
import { externalsRequest } from '../actions/externalsActions';

import HOCToJS from '../components/HOCToJS';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onExternalsRequest: () => dispatch(externalsRequest({ meta: 'weather' })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HOCToJS(HomeScreenComponent));