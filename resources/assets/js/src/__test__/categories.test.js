import "isomorphic-fetch";
import React from 'react';
import Categories from '../categories/Categories';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import Category from "../categories/Category";

configure({ adapter: new Adapter() });

describe('<Categories />', ()=>{
    const component = shallow(
        <Categories
            categoires={[]}
            active={-1}
    />);

    it('should render <Category />s.', ()=>{
        expect(component.find('Category')).toHaveLength(1);
    });
});