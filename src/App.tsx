import React from 'react';
import {HashRouter,Switch, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home'

export default () => {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/" exact component={Home}></Route>
                </Switch>
            </HashRouter>
        </div>
    );
};
