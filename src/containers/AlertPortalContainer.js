import { connect } from 'react-redux'

import {
    makeSelectGlobalAlertIsOpen,
    makeSelectGlobalAlertTitle,
    makeSelectGlobalAlertDescription,
} from '../selectors/globals';

import {
    appAlertDismiss,
} from '../actions/globals';

import AlertPortalComponent from '../components/AlertPortalComponent';

import HOCToJS from '../components/HOCToJS';

const makeMapStateToProps = () => {
    const getAlertIsOpen = makeSelectGlobalAlertIsOpen();
    const getAlertTitle = makeSelectGlobalAlertTitle();
    const getAlertDescription = makeSelectGlobalAlertDescription();

    const mapStateToProps = (state, ownProps) => {
        const isOpen = getAlertIsOpen(state);
        const title = getAlertTitle(state);
        const description = getAlertDescription(state);

        return {
            isOpen,
            title,
            description,
            ...ownProps,
        };
    };

    return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return {
      onDismiss: () => {
          dispatch(appAlertDismiss());
      },
  };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(HOCToJS(AlertPortalComponent));