import React, {Component} from 'react';

class PizzaForm extends Component {
    constructor() {
        super();
        this.state = {
            "name": "",
            "dough": "regular",
            "toppings_count": 1,
            "size": "small",
            "price": 1
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({errors: []});
        const data = JSON.stringify({...this.state, token: localStorage.getItem('token')});
        fetch("api/pizza",
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
                <div className="form-group">
                    <label htmlFor="category">Pizza Name</label>
                    <input type="text" className="form-control"
                        placeholder="pizza"
                        id="name"
                        onChange={this.handleInputChange}
                        value={this.props.name ? this.props.name : this.state.name}
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Pizza Dough</label>
                    <select
                        className="form-control" id="dough"
                        onChange={this.handleInputChange}
                    >
                        <option> sicilian </option>
                        <option> regular </option>
                    </select>
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
                    <label htmlFor="category">number of toppings</label>
                    <input type="text" className="form-control"
                        placeholder="number of toppings"
                        id="toppings_count"
                        onChange={this.handleInputChange}
                        value={this.props.toppings_count ? this.props.toppings_count : this.state.toppings_count}
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Price</label>
                    <input type="text" className="form-control"
                        placeholder="price"
                        id="price"
                        onChange={this.handleInputChange}
                        value={this.props.price ? this.props.price : this.state.price}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
}

export default PizzaForm;