import React from 'react';
import Item from './Item';

const ItemsList = (props) => {
    return (
        props.items.length > 0 ?
            props.items.map(item =>
                <Item item={item} key={item.id}/>
            )
        : <li className="list-group-item"> No Avilable Items. </li>
    );
}

export default ItemsList