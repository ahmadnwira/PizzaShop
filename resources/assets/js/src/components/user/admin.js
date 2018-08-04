import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

import DashBoard from './dashboard/dash';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            toLogin: false,
        }
    }

    componentWillMount() {
        fetch("/api/session/user",
            {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: JSON.stringify({token: localStorage.getItem('token')}),
            }
        )
        .then(response => response.json())
        .then(data => {
            switch (data['msg']) {
                case "expired":
                    localStorage.removeItem('token');
                    this.setState({toLogin: true})
                    break;
                case false:
                    this.setState({toLogin: true})
                    break;
            }
        });
    }

    render() {
        if(this.state.toLogin === true){return <Redirect to="/login" />}
        return(
            <DashBoard />
        );
    }
}

export default Admin;