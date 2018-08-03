import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Nav from './nav/Nav';
import Home from './Home';
import Login from './auth/login';
import SignUp from './auth/signup';
import Profile from './user/profile';
import Admin from './user/admin';
import AuthRoute from './auth/authRoute';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/signup" component={SignUp}/>
                            <AuthRoute path="/profile" component={Profile}/>
                            <AuthRoute path="/admin/:action?" component={Admin}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}