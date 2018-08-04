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
                        <span
                            data-url={`/api/${props.model}/${elm.id}`}
                            className="btn btn-danger"
                            onClick={deleteItem}>Delete</span>
                    </li>
                ))
            }
        </ul>
        : null
    );
}

export default ModelControls;