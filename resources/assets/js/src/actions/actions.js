import * as types from './actionTypes';

export const fetchCategories = url => dispatch => {
    fetch(url)
        .then(response => response.json())
        .then(
            result => {
                dispatch({
                    type: types.fetchCategory,
                    response: result
                })
            },
            error => {}
        )
}

export const activeCategory = (id, url) => dispatch => {
    fetch(url)
        .then(response => response.json())
        .then(
            result => dispatch({
                type: types.activeCategory,
                response: result,
                active: id
            }),
            error => {}
        )
}

export const fetchPizza = url => {
    fetch(url)
        .then(response => response.json())
        .then(
            result => {
                return { ...state,
                    response: result
                }
            },
            error => ({})
        )
}
