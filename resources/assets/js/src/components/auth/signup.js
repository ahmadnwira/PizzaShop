import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import ErrorsList from './errorsList';

class SignUp extends Component
{
    constructor(){
        super();
        this.state = {
            mail:"",
            name:"",
            password:"",
            password_confirmation:"",
            errors:[],
            toLogin:false
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
        fetch("api/signup",
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
                this.setState({toLogin: true})
            }
        });
    }

    render() {

        if(this.state.toLogin == true) {
            return (<Redirect to="/login" />)
        }

        return(
            <form className="col-offset-md-4 col-md-6 mt-2" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="mail">Email address</label>
                    <input type="email" className="form-control" id="mail" placeholder="Enter email"
                        value={this.state.mail} onChange={this.handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" className="form-control" id="name" placeholder="username"
                        value={this.state.name} onChange={this.handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type="password" className="form-control" id="password_confirmation" placeholder="confirm Password"
                        value={this.state.password_confirmation} onChange={this.handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">sign up</button>
                <Link to="/login" className="btn btn-secondary ml-1">login</Link>

                {this.state.errors.length>0 ? <ErrorsList errors={this.state.errors}/>: ''}
            </form>
        );
    }
}
export default SignUp;