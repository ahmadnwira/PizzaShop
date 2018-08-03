import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import ErrorsList from './errorsList';

class Login extends Component
{

    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            errors:[],
            toProfile:false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({errors: []});
        fetch("api/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: JSON.stringify(this.state),
            }
        )
        .then(response => response.json())
        .then(data => {
        if (data["msg"] !== "success"){
            this.setState({errors: data["errors"]});
        }
        else {
            localStorage.setItem('token', data["token"]);
            this.setState({toProfile: true});
        }
        });
    }

    render() {
        if(this.state.toProfile == true) {
            return (<Redirect to="/profile" />)
        }

        return(
            <form className="col-offset-md-4 col-md-6 mt-2" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="mail">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                           value={this.state.email} onChange={this.handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                           value={this.state.password} onChange={this.handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">login</button>
                <Link to="/signup" className="btn btn-secondary ml-1">sign up</Link>

                {this.state.errors.length>0 ? <ErrorsList errors={this.state.errors}/>: ''}
            </form>
        )
    }

}
export default Login;