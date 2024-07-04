import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);// повертається покращувач для store

const store = createStore(reducer, enhancer); // ми прикрутили middleware (enhancer) до нашої store

sagaMiddleware.run(rootSaga); // запуск middleware

export default store;

