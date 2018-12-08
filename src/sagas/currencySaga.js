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

function* currencySaga() {
  yield takeLatest(FORM_MODEL_FIELD_CHANGE, handleFieldChange);
}

function* handleFieldChange(action) {
    const { meta, field, fromSaga } = action;

    if(meta === 'currency' && !fromSaga) {
        try {
            const getFormModel = makeSelectFormModelByMeta();
            const formModelIM = yield select(state => getFormModel(state)('currency'));
            const formModel = !formModelIM ? {} : formModelIM.toJS();
            console.debug("CURRENCY SAGA MODEL", formModel);

            if (!formModel || !formModel.sourceCurrency || !formModel.destCurrency)
                return;

            const eventFromSrc = field === 'sourceValue' || field === 'sourceCurrency';

            if(eventFromSrc && (!formModel.sourceValue || !formModel.sourceCurrency || !formModel.destCurrency))
                return;
            if(!eventFromSrc && (!formModel.sourceCurrency || !formModel.destCurrency))
                return;
            // if(!eventFromSrc && (!formModel.destValue || !formModel.sourceCurrency || !formModel.destCurrency))
            //     return;

            // yield call(ApiHelper.getRates, {
            //     from: eventFromSrc ? formModel.sourceCurrency : formModel.destCurrency,
            //     to: eventFromSrc ? formModel.destCurrency : formModel.sourceCurrency,
            //     onSuccess: (rates) => {
            //         console.debug("RATES", rates);
            //         if (eventFromSrc) {
            //             const converted = formModel.sourceValue * rates;

            //             yield put(formModelFieldChange({
            //                 meta: 'currency',
            //                 field: 'destValue',
            //                 value: converted,
            //             }));
            //         } else {
            //             const converted = formModel.destValue * rates;

            //             yield put(formModelFieldChange({
            //                 meta: 'currency',
            //                 field: 'sourceValue',
            //                 value: converted,
            //             }));
            //         }
            //     },
            // });
            const rates = yield call(ApiHelper.getRates, {
                from: eventFromSrc ? formModel.sourceCurrency : formModel.destCurrency,
                to: eventFromSrc ? formModel.destCurrency : formModel.sourceCurrency,
            });

            // console.debug("RATES", rates);
            const converted = (formModel.sourceValue * rates).toFixed(2);

            yield put(formModelFieldChange({
                meta: 'currency',
                field: 'destValue',
                value: converted,
                fromSaga: true,
            }));
            // if (eventFromSrc) {
            //     const converted = (formModel.sourceValue * rates).toFixed(2);

            //     yield put(formModelFieldChange({
            //         meta: 'currency',
            //         field: 'destValue',
            //         value: converted,
            //         fromSaga: true,
            //     }));
            // } else {
            //     const converted = (formModel.destValue * rates).toFixed(2);

            //     yield put(formModelFieldChange({
            //         meta: 'currency',
            //         field: 'sourceValue',
            //         value: converted,
            //         fromSaga: true,
            //     }));
            // }

        } catch(error) {
            console.error("Currency Saga Error", error);
        }
    }
}


export default currencySaga;