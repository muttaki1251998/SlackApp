import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createHistory from 'history/createBrowserHistory';
import {Router} from 'react-router-dom';
import {Route} from 'react-router';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const customHistory = createHistory();

const Root =  () => (
    <Router history = {customHistory} forcedRefresh = {false}>
        <div>
            <Route path = "/" component={App} />
            <Route path = "/login" component={Login} />
            <Route path = "/register" component={Register} />
        </div>       
    </Router>
)

ReactDOM.render(
   <Root />,
    document.getElementById('root')
)
