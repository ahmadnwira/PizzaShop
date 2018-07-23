import React from 'react';
import Item from './Item';

const ItemsList = props => (
    <div className="col-md-8">
        <ul className="list-group">
            {
                props.items.length > 0 ?
                props.items.map(item => <Item item={item} key={item.id}/> )
                : <li className="list-group-item"> No Available Items. </li>
            }
        </ul>
    </div>
)

export default ItemsList