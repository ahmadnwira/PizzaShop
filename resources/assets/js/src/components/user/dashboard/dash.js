import React, {
    Component
} from 'react';

import ModelsList from './modelList';
import CreateForm from './createForm';
import ModelControls from './modelControls';

class DashBoard extends Component {

    constructor() {
        super();
        this.state = {
            form:null,
            model:null,
            data:[],
            item:null
        }

        this.onCreateClick = this.onCreateClick.bind(this);
        this.onModelClick = this.onModelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    onCreateClick(e) {
        this.setState({form: e.target.id, data:[]});
    }

    onModelClick(e) {
        const model = e.target.id;
        fetch(`/api/${model}`)
        .then(res => res.json())
        .then(data => {this.setState({model: model, data: data, form:null});});
    }

    onEditClick(e) {
        this.setState({
            model:null,
            data: [],
            form: e.target.dataset.form,
            item: e.target.dataset.item
        });
    }

    render() {
        return (
            <div className = "row" >
                <ModelsList onCreateClick = {this.onCreateClick} onModelClick = {this.onModelClick}/>

                <div className = "col-md-6 offset-md-3" >
                    {this.state.form? <CreateForm formName={this.state.form} item={this.state.item}/> :null}
                    <ModelControls
                        data={this.state.data}
                        model={this.state.model}
                        onEditClick={this.onEditClick}
                    />
                </div>
            </div>
        );
    }
}
export default DashBoard;
