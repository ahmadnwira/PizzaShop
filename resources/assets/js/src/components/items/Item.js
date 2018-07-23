import React from 'react';
import PropTypes from 'prop-types';

const Item = (props) => {
    return (
        <li className="list-group-item">
            {props.item.name} {props.item.dough} -
            {props.item.size == "NULL" ? "" : props.item.size} {props.item.price}$
        </li>
    );
}

Item.prototype = {
    item: PropTypes.object
}

export default Item;