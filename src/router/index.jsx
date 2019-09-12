import React from "react";
import {Login, HomePage, } from "../containers";
import {MainLayout } from "../layouts";
import {Switch, Route} from "react-router-dom";
import {LOGIN_PATH, MAIN_PATH, TABLE_PATH} from "../common/constants";
import TablePage from "../containers/TasksTable";

const Routes = () => (
        <MainLayout>
            <Switch>
                <Route path={LOGIN_PATH} component={Login}/>
                <Route path={TABLE_PATH} component={TablePage}/>
                <Route path={MAIN_PATH} component={HomePage}/>
            </Switch>
        </MainLayout>

);

export default Routes;
