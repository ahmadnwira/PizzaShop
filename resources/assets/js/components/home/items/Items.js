import React from 'react';
import ItemsList from './ItemsList';

const Items = (props) => {
    return (
        <div className="col-md-8">
            <ul className="list-group">
            <li className="list-group-item text-white bg-dark"><h2>Items</h2></li>
                <ItemsList items={props.items}/>
            </ul>
        </div>
    )
}

export default Items;