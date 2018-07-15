import React from 'react';
import PropTypes from 'prop-types';

const Items = (props) => {
    return (
        <div className="col-md-8">
            <h2>Items</h2>
            <ul className="list-group">
                <li className="list-group-item text-white bg-dark">Categories</li>
                {
                    props.items.length > 0 ?
                    props.items.map(item =>
                        <li className="list-group-item" key={item.id}>
                            {item.item}, size: {item.size}, {item.price}$
                        </li>
                    )
                    : <li className="list-group-item"> No Avilable Items. </li>
                }
            </ul>
        </div>
    )
}

Items.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default Items;