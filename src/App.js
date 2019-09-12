import React, { Component } from 'react';
import {Provider} from "react-redux";
import { Router} from "react-router-dom";
import getAppConfigurations from "./common/getAppConfigurations";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
      const {routes , store, history } = getAppConfigurations();
      return (
        <Provider store={store}>
            <Router history={history} children={routes()} />
        </Provider>
    );
  }
}

export default App;
