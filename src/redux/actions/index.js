/**
 *  Auth Actions with action creators
 **/
export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED =  "LOGIN_FAILED";
export const attemptLogin = (data) => ({type: ATTEMPT_LOGIN, payload: data});
export const loginSuccess = (user) => ({type: LOGIN_SUCCESS, payload: user});
export const loginFailed = (error) => ({type: LOGIN_FAILED, payload: error});

/**
 * Task actions with action creators
 */
export const ATTEMPT_GET_TASKS = "ATTEMPT_GET_TASKS";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const GET_TASKS_FAIL = "GET_TASKS_FAIL";
export const attemptGetTasks = (data) => ({type: ATTEMPT_GET_TASKS, payload: data});
export const getTasksSuccess = (data) => ({type: GET_TASKS_SUCCESS, payload: data});
export const getTasksFailed = (error) => ({type: GET_TASKS_FAIL, payload: error});

/**
 * Post task action creators
 */
export const ATTEMPT_POST_TASK = "ATTEMPT_POST_TASK";
export const POST_TASK_SUCCESS = "POST_TASK_SUCCESS";
export const POST_TASK_FAIL = "POST_TASK_FAIL";
export const attemptPostTask = (data) => ({type: ATTEMPT_POST_TASK, payload: data});
export const postTaskSuccess = (data) => ({type: POST_TASK_SUCCESS, payload: data});
export const postTaskFail = (error) => ({type: POST_TASK_FAIL, payload: error});

/**
 * Post task action creators
 */
export const ATTEMPT_LOGOUT = "ATTEMPT_LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const attemptLogout = () => ({type: ATTEMPT_LOGOUT});
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const logoutFail = (error) => ({type: LOGOUT_FAIL, payload: error});


export const ATTEMPT_EDIT_TASK = "ATTEMPT_EDIT_TASK";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAIL = "EDIT_TASK_FAIL";
export const attemptEditTask = (data) => ({type: ATTEMPT_EDIT_TASK, payload: data});
export const editTaskSuccess = (data) => ({type: EDIT_TASK_SUCCESS, payload: data});
export const editTaskFail = (error) => ({type: EDIT_TASK_FAIL, payload: error});
