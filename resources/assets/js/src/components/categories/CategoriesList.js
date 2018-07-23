import React from 'react';
import PropTypes from 'prop-types';

import Category from './Category';

const CategoriesList = (props) => {
    return (
        <div className="col-md-2">
            <ul className="list-group">
                <li className="list-group-item text-white bg-dark">Categories</li>

                <Category
                    active={props.active}
                    key={0}
                    id={0}
                    category="pizza"
                    onClick={ () => props.onCategoryClick(0, "/api/pizza") }
                />

                {
                    props.categories.map(category =>
                        <Category
                            active={props.active}
                            key={category.id}
                            {...category}
                            onClick={() => props.onCategoryClick(
                                category.id,
                                `/api/categories/${category.id}/items`
                            )}
                        />
                    )
                }
            </ul>
        </div>
    )
};

CategoriesList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    // onCategoryClick: PropTypes.func.isRequired
};

export default CategoriesList;