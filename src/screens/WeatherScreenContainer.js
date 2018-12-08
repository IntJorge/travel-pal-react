import { connect } from 'react-redux'
import { fromJS } from 'immutable';

import {
    fileModelFieldChange,
} from '../actions/fileActions';

import {
    makeSelectFileModelByMeta,
} from '../selectors/file';

import {
    makeSelectGlobalWeather,
} from '../selectors/globals';

import {
    appWeatherRequest,
} from '../actions/globals';

import {
    makeSelectEventStatusModelFieldByMeta,
} from '../selectors/eventStatus';

import HOCToJS from '../components/HOCToJS';
import WeatherScreenComponent from '../components/WeatherScreenComponent';

const makeMapStateToProps = () => {
    const getWeather = makeSelectGlobalWeather()
    const getEventStatusField = makeSelectEventStatusModelFieldByMeta();

    const mapStateToProps = (state, ownProps) => {
        const weather = getWeather(state) || fromJS({});
        const isPlaceInfoLoading = getEventStatusField(state)('placeInfo', 'isLoading') || false;
        const isWeatherInfoLoading = getEventStatusField(state)('weatherInfo', 'isLoading') || false;

        return {
            weather,
            isPlaceInfoLoading,
            isWeatherInfoLoading,
            ...ownProps,
        };
    };

    return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
    return {
        onWeatherRequest: () => {
            dispatch(appWeatherRequest());
        },
    };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(HOCToJS(WeatherScreenComponent));