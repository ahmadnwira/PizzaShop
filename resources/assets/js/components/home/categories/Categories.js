import React from 'react';
import Category from './Category';

const Categories = (props) => {
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
                    props.categories.length > 0 ?
                    props.categories.map(category =>
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

export default Categories;