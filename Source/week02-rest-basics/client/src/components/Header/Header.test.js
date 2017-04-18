import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import {shallow} from 'enzyme';

describe('Header test suite', function () {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const newHeader = <Header/>;
        ReactDOM.render(newHeader, div);
        
    });

    it('renders and reads the header object', () => {
        const wrapper = shallow(<Header />);
        const welcome = <h2>Welcome to Jefferson's React site</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });
});