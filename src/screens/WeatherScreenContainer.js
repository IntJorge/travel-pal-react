import { connect } from 'react-redux'

import {
    fileModelFieldChange,
} from '../actions/fileActions';

import {
    makeSelectFileModelByMeta,
} from '../selectors/file';

import HOCToJS from '../components/HOCToJS';
import WeatherScreenComponent from '../components/WeatherScreenComponent';

const makeMapStateToProps = () => {
    const getFileModel = makeSelectFileModelByMeta()

    const mapStateToProps = (state, ownProps) => {
        const fileModel = getFileModel(state)('persistent');
        console.debug("FILE MODEL", fileModel && fileModel.toJS());

        return {
            fileModel,
            ...ownProps,
        };
    };

    return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onChange: (field, value) => dispatch(formModelFieldChange({
        //     meta: 'currency',
        //     field,
        //     value,
        // })),
    };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(HOCToJS(WeatherScreenComponent));