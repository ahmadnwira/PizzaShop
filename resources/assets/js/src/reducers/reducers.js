import {combineReducers} from 'redux';

const categoriesReducer = (state={}, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
            return [...state, ...action.response];
        default:
            return [...state]
    }
}

const activeCategoryReducer = (state={}, action) => {
    switch (action.type) {
        case "ACTIVE_CATEGORY":
        return {...state, active: action.active, items: action.response};
        default:
            return {...state, active:0, items:[]}
    }
}

const pizzaReducer = (state=[], action) => {
    switch (action.type) {
        case "FETCH_PIZZA":
            return {...state, pizza: actions.response}
        default:
            return state
    }
}

const appReducer = combineReducers({
    activeCategoryItems: activeCategoryReducer,
    categories: categoriesReducer,
    pizza: pizzaReducer,
});

export default appReducer;