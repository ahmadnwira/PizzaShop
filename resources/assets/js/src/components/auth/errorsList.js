import React from 'react';
import PropTypes from 'prop-types';

const ErrorsList = (props) => {
    const list = props.errors.map((error, i) => <li key={i}> {error} </li>);
    return (
        <ul className="mt-2 alert alert-danger">
            {list}
        </ul>
    );
}

ErrorsList.prototype = {
    errors: PropTypes.array
}

export default ErrorsList;