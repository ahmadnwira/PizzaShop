import React from 'react';
import {Link} from 'react-router-dom';

const Models = (props) => (
    <ul className="list-group list-group-flush col-md-3">
    <li className="list-group-item d-flex justify-content-between">
        <Link to="/admin/categories">categories</Link>
        <p>
            <a className="btn btn-primary text-light"
                id='category'
                onClick={props.pickForm}> create</a>
        </p>
    </li>

    <li className="list-group-item d-flex justify-content-between">
        <Link to="/admin/items">items</Link>
        <p>
            <a className="btn btn-primary text-light"
                id='item'
                onClick={props.pickForm}> create</a>
        </p>
    </li>

    <li className="list-group-item d-flex justify-content-between">
        <Link to="/admin/pizza">pizza</Link>
        <p>
            <a className="btn btn-primary text-light"
                id='pizza'
                onClick={props.pickForm}> create</a>
        </p>
    </li>
    </ul>
)

export default Models;