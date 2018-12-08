import { connect } from 'react-redux'

import {
    formModelFieldChange,
} from '../actions/form';

import {
    makeSelectFormModelByMeta,
} from '../selectors/form';

import HOCToJS from '../components/HOCToJS';
import CurrencyScreenComponent from '../components/CurrencyScreenComponent';

const makeMapStateToProps = () => {
    const getFormModel = makeSelectFormModelByMeta()

    const mapStateToProps = (state, ownProps) => {
        const formModel = getFormModel(state)('currency');
        console.debug("FORM MODEL", formModel && formModel.toJS());

        return {
            formModel,
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