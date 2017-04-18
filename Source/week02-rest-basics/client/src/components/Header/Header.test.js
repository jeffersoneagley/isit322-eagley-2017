import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import {shallow} from 'enzyme';

describe('my basic rest test', function () {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('renders and reads the header object', () => {
        const wrapper = shallow(<Header />);
        const welcome = <h2>Welcome to React</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });
});