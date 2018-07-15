import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Categoires from './Categories';
import Items from './Items';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            categoires: [],
            items:[],
        };

        this.CategoryClickHandler = this.CategoryClickHandler.bind(this)
    }

    CategoryClickHandler(key)
    {
        fetch(`api/categoires/${key}/items`)
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

    componentWillMount() {
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
                />
                <Items items={this.state.items} />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
