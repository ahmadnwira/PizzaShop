import React,{Component}from 'react';

import Categories from '../containers/CategoriesContainer';
import Items from '../containers/ItemsContainer';

import {Provider} from 'react-redux';

import * as actions from "../actions/actions";
import STORE from '../store';

class Home extends Component{
    /*
        moved dispatching from <App /> as it was called at every render
        even when router rendered different component.
    */
    componentDidMount() {
        STORE.dispatch(actions.fetchCategories("/api/categories"));
        STORE.dispatch(actions.activeCategory(0, "/api/pizza"));
    }

    render() {
        return(
            <Provider store={STORE}>
                <div className="row mt-2">
                    <Categories categories={[]}/>
                    <Items items={[]} />
                </div>
            </Provider>
        );
    }
}


export default Home;