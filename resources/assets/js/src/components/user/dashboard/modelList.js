import React from 'react';

const ModelsList = (props) => (
    <ul className="list-group list-group-flush col-md-3">
        <li className="list-group-item d-flex justify-content-between">
            <a href="#" id='categories' onClick={props.onModelClick}>categories</a>
            <p>
                <a className="btn btn-primary text-light"
                    id='categories'
                    onClick={props.onCreateClick}>
                        create
                </a>
            </p>
        </li>

        <li className="list-group-item d-flex justify-content-between">
            <a href="#" id='items' onClick={props.onModelClick}>items</a>
            <p>
                <a className="btn btn-primary text-light"
                    id='items'
                    onClick={props.onCreateClick}>
                    create
                </a>
            </p>
        </li>

        <li className="list-group-item d-flex justify-content-between">
            <a href="#" id='pizza' onClick={props.onModelClick}>pizza</a>
            <p>
                <a className="btn btn-primary text-light"
                    id='pizza'
                    onClick={props.onCreateClick}>
                    create
                </a>
            </p>
        </li>
    </ul>
)

export default ModelsList;