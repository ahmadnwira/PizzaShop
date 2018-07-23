import {createStore} from 'redux';
import appReducer from './reducers/reducers';

import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const STORE = createStore(appReducer, applyMiddleware(thunk));

export default STORE;
