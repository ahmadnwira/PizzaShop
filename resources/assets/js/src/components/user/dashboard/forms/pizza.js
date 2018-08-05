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

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Pizza Name</label>
                    <input type="text" className="form-control"
                        placeholder="pizza"
                        name="name"
                        onChange={this.handleInputChange}
                        placeholder={this.props.data? this.props.data.name: 'enter new pizza'}
                        value={this.state.name}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Pizza Dough</label>
                    <select
                        className="form-control" name="dough"
                        onChange={this.handleInputChange}
                    >
                        <option> sicilian </option>
                        <option> regular </option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="size">Item Size</label>
                    <select
                        className="form-control" name="size"
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
                        name="toppings_count"
                        onChange={this.handleInputChange}
                        value={this.props.data ? this.props.data.toppings_count : this.state.toppings_count}
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Price</label>
                    <input type="text" className="form-control"
                        placeholder="price"
                        name="price"
                        onChange={this.handleInputChange}
                        value={this.props.data ? this.props.data.price : this.state.price}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
}

export default PizzaForm;