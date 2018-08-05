import React from 'react';

const deleteItem = (e) => {
    fetch(e.target.dataset.url,
        {
        method: "DELETE",
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify({token: localStorage.getItem('token')}),
    })
}

const ModelControls = (props) => {
    return(
        props.data.length > 0 ?
        <ul className="mt-2">
            {
                props.data.map((elm, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between">
                        <p>{elm.name} {elm.category}</p>
                        <p>
                            <span
                                data-form={props.model}
                                data-item={elm.id}
                                className="btn btn-warning"
                                onClick={props.onEditClick}>Edit
                            </span>
                            <span
                                data-url={`/api/${props.model}/${elm.id}`}
                                className="btn btn-danger ml-1"
                                onClick={deleteItem}>Delete
                            </span>
                        </p>
                    </li>
                ))
            }
        </ul>
        : null
    );
}

export default ModelControls;