import { createStore, applyMiddleware } from 'redux';
import {
  combineReducers
} from 'redux-immutable';

import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';
import globalReducer from './reducers/globalReducer';
import externalsReducer from './reducers/externalsReducer';
import formReducer from './reducers/formReducer';
import fileReducer from './reducers/fileReducer';
import eventStatusReducer from './reducers/eventStatusReducer';


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable,
  }
})

export const store = createStore(
  combineReducers({
    globals: globalReducer,
    externals: externalsReducer,
    form: formReducer,
    file: fileReducer,
    eventStatus: eventStatusReducer,
  }),
  Immutable.Map(),
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  )
);


// syncFramework7WithStore(store, stateKernel);


sagaMiddleware.run(rootSaga);