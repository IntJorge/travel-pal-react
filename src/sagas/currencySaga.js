/**
 * currency saga
 */
import {
    takeLatest,
    call,
    select,
    put,
    delay,
} from 'redux-saga/effects'

import {
    FORM_MODEL_FIELD_CHANGE
} from '../constants/form';

import {
    formModelFieldChange,
} from '../actions/form';

import {
    makeSelectFormModelByMeta,
} from '../selectors/form';

import ApiHelper from '../utils/api';

/**
 * saga for source amount field change
 */
function* currencySaga() {
  yield takeLatest([FORM_MODEL_FIELD_CHANGE], handleFieldChange);
}

function* handleFieldChange(action) {
    const { meta, field, fromSaga, type } = action;

    if(meta === 'currency' && !fromSaga) {
        try {
            const getFormModel = makeSelectFormModelByMeta();
            const formModelIM = yield select(state => getFormModel(state)('currency'));
            const placeInfoModelIM = yield select(state => getFormModel(state)('placeInfo'));

            const sourceCurrencyCode = 'USD';
            const destCurrencyCode = !placeInfoModelIM ? 'USD' : placeInfoModelIM.getIn(['currency_code']) || 'USD';
            const sourceValue = !formModelIM ? 0 : formModelIM.getIn(['sourceValue']) || 0;

            let destValue = '0.00';
            // console.debug("CURR", sourceValue, destCurrencyCode);

            if (sourceCurrencyCode === destCurrencyCode) {
                destValue = parseFloat(sourceValue).toFixed(2);
            } else {
                const rates = yield call(ApiHelper.getRates, {
                    from: sourceCurrencyCode,
                    to: destCurrencyCode,
                });

                // console.debug("RATES", rates);
                destValue = (sourceValue * rates).toFixed(2);
            }

            yield put(formModelFieldChange({
                meta: 'currency',
                field: 'destValue',
                value: destValue,
                fromSaga: true,
            }));

        } catch(error) {
            console.error("Currency Saga Error", error);
        }
    }
}


export default currencySaga;