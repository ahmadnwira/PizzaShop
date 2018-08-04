import React from 'react';

import CategoryForm from "./forms/category";
import ItemsForm from './forms/items';
import PizzaForm from './forms/pizza';

const createForm = (props) => {
    switch (props.formName) {
        case "category":
            return <CategoryForm />
        case "item":
            return <ItemsForm />
        case "pizza":
            return <PizzaForm />
        default:
            return null
    }
}

export default createForm;