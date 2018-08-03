import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

import STORE from '../../store';

import Models from './models';

import CategoryForm from '../forms/category';
import ItemsForm from '../forms/items';
import PizzaForm from '../forms/pizza';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            toLogin: false,
            form: null
        }
        this.pickForm = this.pickForm.bind(this);
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

    pickForm(e) {
        switch (e.target.id) {
            case "category":
                this.setState({form: <CategoryForm/>});
                break;
            case "item":
                this.setState({form: <ItemsForm/>});
                break;
            case "pizza":
                this.setState({form: <PizzaForm/>})
                break;
        }
    }

    render() {
        if(this.state.toLogin === true){return <Redirect to="/login" />}

        return(
            <div className="row">
                <Models pickForm={this.pickForm}/>
                <div className="col-md-6 offset-md-3">
                    {this.state.form}
                </div>
            </div>
        );
    }
}

export default Admin;