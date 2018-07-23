import React from 'react';
import PropTypes from 'prop-types';

const Category = (props) => {
    return (
        <li
            className={`list-group-item ${props.active === props.id ? 'active' : ''}`}
            onClick={props.onClick}
            >
            {props.category}
        </li>
    )
}

Category.propTypes = {
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Category;