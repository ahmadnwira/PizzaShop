import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Provider} from 'react-redux';

import * as actions from "../actions/actions";
import STORE from '../store';

import Nav from './nav/Nav';
import Home from './Home';
import Login from './auth/login';
import SignUp from './auth/signup';
class App extends Component {

    componentDidMount() {
        STORE.dispatch(actions.fetchCategories("/api/categories"));
        STORE.dispatch(actions.activeCategory(0, "/api/pizza"));
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={SignUp}/>
                    </Switch>
                </div>

            </BrowserRouter>
        );
    }
}


if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={STORE}>
            <App />
        </Provider>
        , document.getElementById('root'));
}