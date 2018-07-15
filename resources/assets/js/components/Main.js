import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Categoires from './categories/Categories';
import Items from './items/Items';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            categoires: [],
            items:[],
            active_category:-1
        };

        this.CategoryClickHandler = this.CategoryClickHandler.bind(this)
    }

    CategoryClickHandler(key, url)
    {
        fetch(url)
        .then(response => response.json())
        .then(
          (result) => {
              this.setState({items: result, active_category: key});
          },
          (error) => {
              this.setState({items: []})
          }
        );
    }

    componentDidMount() {
        fetch("api/categoires/")
          .then(response => response.json())
          .then(
            (result) => {
                this.setState({categoires: result});
            },
            (error) => {
                this.setState({categoires: []})
            }
          );
    }

    render() {
        return (
            <div className="row mt-2">
                <Categoires
                    categoires={this.state.categoires}
                    handleClick={this.CategoryClickHandler}
                    active = {this.state.active_category}
                />
                <Items items={this.state.items} />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
