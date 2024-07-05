import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { loginSaga, registerSaga } from './AuthSaga';
import { getTaskSaga, createTaskSaga, deleteTaskSaga } from './TasksSagas';




function* rootSaga() {
    // AUTH - все, що повязано з аутентифікацією
    yield takeLatest(ACTION_TYPES.LOGIN_USER_REQUEST, loginSaga);
    yield takeLatest(ACTION_TYPES.REGISTER_USER_REQUEST, registerSaga);

    // TASKS

    yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTaskSaga);
    yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga);
    yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga);
}

export default rootSaga;

//Все , що повязано із Saga буде функцією генератором* - function*