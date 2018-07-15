import "isomorphic-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../Main';

const fetch = require('node-fetch');

describe('<Main />', ()=>{
    it('renders correctly.', ()=>{
        ReactDOM.render(<Main />, document.createElement('div'));
    });
});