import React, {Component} from 'react';

class CategoryForm extends Component {
    constructor() {
        super();
        this.state = {
            category:"",
            item:null
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
                    <label htmlFor="category">Category Title</label>
                    <input type="text" className="form-control"
                        name="category"
                        onChange={this.handleInputChange}
                        placeholder={this.props.data? this.props.data.category: 'enter new category'}
                        value={this.state.category}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
}

export default CategoryForm;