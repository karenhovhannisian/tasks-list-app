import routes from "../router";
import {createStore, applyMiddleware} from "redux";
import {mainReducer, mainSaga} from "../redux";
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

const getAppConfigurations = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        mainReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(mainSaga);

    return {
        routes,
        store,
        history
    }
};

export default getAppConfigurations;
export {history}
