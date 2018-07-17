import React from 'react';
import PropTypes from 'prop-types';
import Categories from './categories/Categories';
import Items from './items/Items';

const Home = (props) => {
    return (
        <div className="row mt-2">
            <Categories
                handleClick={props.handleClick}
                categories={props.categories}
                active = {props.active}
            />
            <Items items={props.items} />
        </div>
    );
}

Home.prototype = {
    item: PropTypes.object,
    categoires: PropTypes.arrayOf(PropTypes.object),
    active: PropTypes.number.isRequired
}

export default Home;