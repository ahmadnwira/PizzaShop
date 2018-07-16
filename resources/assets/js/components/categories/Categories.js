import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

const Categoires = (props) => {
    return (
        <div className="col-md-2">
            <ul className="list-group">
                <li className="list-group-item text-white bg-dark">Categories</li>
                <Category
                    key={0}
                    id = {0}
                    active={props.active}
                    txt="pizza"
                    url="api/pizza"
                    handleClick={props.handleClick}
                />
                {
                    props.categoires.length > 0 ?
                    props.categoires.map(category =>
                        <Category
                            key={category.id}
                            id={category.id}
                            active={props.active}
                            txt={category.category}
                            url={`api/categories/${category.id}/items`}
                            handleClick={props.handleClick}
                        />
                    )
                    : <li className="list-group-item"> No Avilable Categories. </li>
                }
            </ul>
        </div>
    )
};

Categoires.propTypes = {
    categoires: PropTypes.arrayOf(PropTypes.object),
    active: PropTypes.number.isRequired
};

export default Categoires;