import * as actionTypes from "../actions";
import {TOKEN} from "../../common/constants";
const defaultState = {
    isLoggedIn: !!localStorage.getItem(TOKEN),
    tasks: null,
    user: null,
    error: ''
};

const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload
            };
        case actionTypes.POST_TASK_SUCCESS:
            return {
                ...state,
                postAdded: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.message,
                isLoggedIn: true,
                error: '',
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isLoggedIn: false
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                error: 'Hеправильные учетные данные'
            }
    }
    return state;
};

export default mainReducer;
