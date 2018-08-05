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

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        fetch("/api/categories/")
        .then(response => response.json())
        .then(data => {this.setState({categories: data})});
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit}>
            <fieldset className="fieldset">
                <legend>Item:</legend>
                <div className="form-group">
                    <label htmlFor="category">Item Name</label>
                    <input type="text" className="form-control"
                        name="name"
                        placeholder="item"
                        onChange={this.handleInputChange}
                        value={this.props.data ? this.props.data.name : this.state.name}
                        />
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
                    <label htmlFor="category">Item Category</label>
                    <select
                        className="form-control" name="category"
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
                        name="price"
                        placeholder="price$"
                        onChange={this.handleInputChange}
                        value={this.props.data ? this.props.data.price : this.state.price}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </fieldset>
            </form>
        );
    }
}

export default ItemsForm;