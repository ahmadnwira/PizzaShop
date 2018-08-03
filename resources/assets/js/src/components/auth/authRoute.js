import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthRoute = (props) => {
    return(
        localStorage.getItem("token") === null ? <Redirect to="/login" />
        : <Route component={props.component} path={props.path}/>
    );
};

export default AuthRoute;