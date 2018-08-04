import React, {Component} from 'react';

class CategoryForm extends Component {
    constructor() {
        super();
        this.state = {
            category:"",
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
        fetch("api/categories",
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
                    <label htmlFor="category">Category Title</label>
                    <input type="text" className="form-control"
                        id="category"
                        onChange={this.handleInputChange}
                        placeholder="category..."
                        value={this.props.category ? this.props.category : this.state.category}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
}

export default CategoryForm;