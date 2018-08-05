import React,{Component} from 'react';

import CategoryForm from "./forms/category";
import ItemsForm from './forms/items';
import PizzaForm from './forms/pizza';

class createForm extends Component{

    constructor() {
        super();
        this.state = {
            data:null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.item && this.props.formName) {
            fetch(`/api/${this.props.formName}/${this.props.item}`)
            .then(res => res.json())
            .then(data => {this.setState({data: data})})
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const method = this.state.data? 'PATCH': 'POST';
        const url = this.state.data?
                    `api/${this.props.formName}/${this.state.data.id}`
                    :`api/${this.props.formName}/`;

        const form = new FormData(e.target);
        const formEntries = {};
        for (const [key, value] of form.entries()) {
            formEntries[key] = value;
        }
        const data = JSON.stringify({...formEntries, token: localStorage.getItem('token')});

        fetch(url,
            {
                method: method,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: data,
            }
        )
        this.setState({data: null});
    }

    render() {
        switch (this.props.formName) {
            case "categories":
                return <CategoryForm data={this.state.data} handleSubmit={this.handleSubmit}/>
            case "items":
                return <ItemsForm data={this.state.data} handleSubmit={this.handleSubmit}/>
            case "pizza":
                return <PizzaForm data={this.state.data} handleSubmit={this.handleSubmit}/>
            default:
                return null
        }
    }

}

export default createForm;