import React, {Component} from 'react';

class ItemsForm extends Component {
    constructor() {
        super();
        this.state = {
            category:0,
            price:1,
            name:"",
            size:"small",
            categories: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        fetch("/api/categories/")
        .then(response => response.json())
        .then(data => {this.setState({categories: data})});
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({errors: []});
        const data = JSON.stringify({...this.state, token: localStorage.getItem('token')});
        fetch("api/items",
            {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: data,
            }
        )
        .then(response => response.json())
        .then(data => {
            if (data["msg"] !== "success"){
                this.setState({errors: data["errors"]});
            }
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
            <fieldset className="fieldset">
                <legend>Item:</legend>
                <div className="form-group">
                    <label htmlFor="category">Item Name</label>
                    <input type="text" className="form-control"
                        id="name"
                        placeholder="item"
                        onChange={this.handleInputChange}
                        value={this.props.name ? this.props.name : this.state.name}
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Item Size</label>
                    <select
                        className="form-control" id="size"
                        onChange={this.handleInputChange}
                    >
                        <option> small </option>
                        <option> large </option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Item Category</label>
                    <select
                        className="form-control" id="category"
                        onChange={this.handleInputChange}
                    >
                        <option> pick category </option>
                        {
                            this.state.categories.map((category, index) => {
                                return <option key={index} value={category.id}>{category.category}</option>
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Item Price</label>
                    <input type="text" className="form-control"
                        id="price"
                        placeholder="price$"
                        onChange={this.handleInputChange}
                        value={this.props.price ? this.props.price : this.state.price}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </fieldset>
            </form>
        );
    }
}

export default ItemsForm;