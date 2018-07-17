import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './home/Home';
import Nav from './nav/Nav';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            categories: [],
            items:[],
            active_category:0
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

    componentWillMount() {
        fetch("api/categories/")
          .then(response => response.json())
          .then(
            (result) => {
                this.setState({categories: result});
            },
            (error) => {
                this.setState({categories: []})
            }
          );

          fetch("api/pizza")
          .then(response => response.json())
          .then(
            (result) => {
                this.setState({items: result});
            },
            (error) => {
                this.setState({items: []})
            }
          );
        }



    render() {
        return (
            <div className="container">
                <Nav />
                <Home
                    categories={this.state.categories}
                    handleClick={this.CategoryClickHandler}
                    active = {this.state.active_category}
                    items={this.state.items}
                />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
