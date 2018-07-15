import React from 'react';
import PropTypes from 'prop-types';

const Categoires = (props) => {
    return (
            <div className="col-md-2">
                <ul className="list-group">
                    <li className="list-group-item text-white bg-dark">Categories</li>
                    {
                        props.categoires.length > 0 ?
                        props.categoires.map(category =>
                            <li className="list-group-item"
                                key={category.id}
                                onClick={()=>{props.handleClick(category.id)}}>
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