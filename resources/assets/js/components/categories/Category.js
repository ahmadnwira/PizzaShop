import React from 'react';
import PropTypes from 'prop-types';

const Category = (props) => {
    return (
        <li
            className={`list-group-item ${props.active === props.id ? 'active' : ''}`}
            onClick={()=>{props.handleClick(props.id, props.url)}}>
            {props.txt}
        </li>
    )
}

Category.propTypes = {
    active: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired
};

export default Category;