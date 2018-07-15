import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Categoires = (props) => {
    return (
        <div className="col-md-2">
            <ul className="list-group">
                <li className="list-group-item text-white bg-dark">Categories</li>
                <li
                    className={`list-group-item ${props.active === 0 ? 'active' : ''}`}
                    onClick={()=>{props.handleClick(0, `api/pizza/`)}}>
                    pizza
                </li>
                {
                    props.categoires.length > 0 ?
                    props.categoires.map(category =>
                        <li className={`list-group-item ${props.active === category.id ? 'active' : ''}`}
                            key={category.id}
                            onClick={()=>{props.handleClick(category.id, `api/categoires/${category.id}/items`)}}>
                            {category.category}
                        </li>
                    )
                    : <li className="list-group-item"> No Avilable Categories. </li>
                }
            </ul>
        </div>
        )
};

Categoires.propTypes = {
    categoires: PropTypes.arrayOf(PropTypes.object)
};

export default Categoires;