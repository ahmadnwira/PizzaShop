import React from 'react';
import { connect } from 'react-redux';

import {activeCategory} from '../actions/actions';
import CategoriesList from '../components/categories/CategoriesList';
import STORE from '../store';

const Categories = props => {
    return(
        <CategoriesList
            categories={props.categories}
            active={props.active}
            onCategoryClick = { (id, url) => STORE.dispatch(activeCategory(id, url)) }
        />
    );
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        active: state.activeCategoryItems.active
    }
}

export default connect(mapStateToProps)(Categories);
