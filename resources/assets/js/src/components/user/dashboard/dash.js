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
            data:[]
        }

        this.onCreateClick = this.onCreateClick.bind(this);
        this.onModelClick = this.onModelClick.bind(this);
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

    render() {
        return (
            <div className = "row" >
                <ModelsList onCreateClick = {this.onCreateClick} onModelClick = {this.onModelClick}/>

                <div className = "col-md-6 offset-md-3" >
                    <CreateForm formName={this.state.form} />
                    <ModelControls data={this.state.data} model={this.state.model}/>
                </div>
            </div>
        );
    }
}
export default DashBoard;
