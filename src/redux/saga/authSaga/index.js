import { call, put } from 'redux-saga/effects';
import {ATTEMPT_LOGIN, ATTEMPT_LOGOUT, loginFailed, loginSuccess, logoutFail, logoutSuccess} from "../../actions";
import Api from "../../../api";
import {history} from "../../../common/getAppConfigurations";
import {LOGIN_PATH, TABLE_PATH, TOKEN} from "../../../common/constants";

function* authSaga({ type, payload }) {
    switch (type) {
        case ATTEMPT_LOGIN: {
            try {
                const user = yield call(Api.login, payload);
                localStorage.setItem(TOKEN, user.data.message.token);
                yield put(loginSuccess(user.data));
                history.push(TABLE_PATH);
            } catch (e) {
                yield put(loginFailed(e));
            }
            break;
        }
        case ATTEMPT_LOGOUT: {
            try {
                localStorage.removeItem(TOKEN);
                yield call(Api.logout);
                yield put(logoutSuccess());
                history.push(LOGIN_PATH);
            } catch (e) {
                yield put(logoutFail(e));
            }
            break;
        }
    }
}

export default authSaga;
