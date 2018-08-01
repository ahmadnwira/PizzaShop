import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            toLogin: false
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
        if(this.state.toLogin === true){
            return <Redirect to="/login" />
        }
        return(
            <ul className="list-group list-group-flush col-md-3">
                <li className="list-group-item d-flex justify-content-between">
                    categories
                    <p>
                        <a id="category" className="btn btn-primary text-light">create</a>
                    </p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    items
                    <p>
                        <a className="btn btn-primary text-light" id="item">create</a>
                    </p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    pizza
                    <p>
                        <a className="btn btn-primary text-light" id="pizza">create</a>
                    </p>
                </li>
            </ul>
        );
    }
}

export default Admin;