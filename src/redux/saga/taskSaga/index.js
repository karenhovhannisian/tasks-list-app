import { call, put } from 'redux-saga/effects';
import {
    postTaskSuccess,
    postTaskFail,
    ATTEMPT_POST_TASK,
    ATTEMPT_GET_TASKS,
    getTasksSuccess,
    ATTEMPT_EDIT_TASK,
    editTaskSuccess,
    editTaskFail,
    attemptGetTasks
} from "../../actions";
import Api from "../../../api";

function* taskSaga({ type, payload }) {
    switch (type) {
        case ATTEMPT_POST_TASK: {
            try {
                const data = yield call(Api.postTask, payload);
                yield put(postTaskSuccess(data));
                yield put(attemptGetTasks());
            } catch (e) {
                yield put(postTaskFail(e));
            }
            break;
        }
        case ATTEMPT_GET_TASKS: {
            try {
                const response = yield call(Api.getTasks, payload.sortByField, payload.sortDirection, payload.currentPage);
                yield put(getTasksSuccess(response.data.message));
            } catch (e) {
                yield put(postTaskFail(e));
            }
            break;
        }
        case ATTEMPT_EDIT_TASK: {
            try {
                const response = yield call(Api.editTask, payload);
                yield put(editTaskSuccess(response.data.message));
                const tasks = yield call(Api.getTasks);
                yield put(getTasksSuccess(tasks.data.message));
            } catch (e) {
                yield put(editTaskFail(e));
            }
            break;
        }
    }
}

export default taskSaga;
