import { takeLatest } from 'redux-saga/effects'
import {ATTEMPT_EDIT_TASK, ATTEMPT_GET_TASKS, ATTEMPT_LOGIN, ATTEMPT_LOGOUT, ATTEMPT_POST_TASK} from "../actions";
import autSaga from "./authSaga"
import taskSaga from "./taskSaga"

function* mainSaga() {
    yield takeLatest(ATTEMPT_LOGIN, autSaga);
    yield takeLatest(ATTEMPT_LOGOUT, autSaga);
    yield takeLatest(ATTEMPT_POST_TASK, taskSaga);
    yield takeLatest(ATTEMPT_GET_TASKS, taskSaga);
    yield takeLatest(ATTEMPT_EDIT_TASK, taskSaga);
}

export default mainSaga;
