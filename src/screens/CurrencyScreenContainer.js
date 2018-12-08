import { connect } from 'react-redux'
import { fromJS } from 'immutable';
import {
    formModelFieldChange,
} from '../actions/form';

import {
    makeSelectFormModelByMeta,
} from '../selectors/form';

import {
    makeSelectEventStatusModelFieldByMeta,
  } from '../selectors/eventStatus';


import HOCToJS from '../components/HOCToJS';
import CurrencyScreenComponent from '../components/CurrencyScreenComponent';

const makeMapStateToProps = () => {
    const getFormModel = makeSelectFormModelByMeta();
    const getEventStatusField = makeSelectEventStatusModelFieldByMeta();

    const mapStateToProps = (state, ownProps) => {
        const isPlaceInfoLoading = getEventStatusField(state)('placeInfo', 'isLoading') || false;
        const formModel = getFormModel(state)('currency');
        const placeInfo =  getFormModel(state)('placeInfo') || fromJS({});

        const currencySymbol = placeInfo.getIn(['currency_symbol']) || '$';
        const currencyCode = placeInfo.getIn(['currency_code']) || 'USD';
        const currency = placeInfo.getIn(['currency']) || 'United States Dollars';

        // console.debug("FORM MODEL", formModel && formModel.toJS());

        return {
            formModel,
            currencySymbol,
            currencyCode,
            currency,
            isLoading: isPlaceInfoLoading,
            ...ownProps,
        };
    };

    return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (field, value) => dispatch(formModelFieldChange({
            meta: 'currency',
            field,
            value,
        })),
    };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(HOCToJS(CurrencyScreenComponent));