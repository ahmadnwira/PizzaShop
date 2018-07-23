import React from 'react';
import PropTypes from 'prop-types';

import Categories from '../containers/CategoriesContainer';
import Items from '../containers/ItemsContainer';

const Home = () => (
    <div className="row mt-2">
        <Categories categories={[]}/>
        <Items items={[]} />
    </div>
)

Home.prototype = {
    item: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.object)
}

export default Home;