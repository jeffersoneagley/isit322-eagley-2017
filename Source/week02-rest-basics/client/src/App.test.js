import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

describe('my basic rest test', function () {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('renders and reads H1 text', () => {
        const wrapper = shallow(<App />);
        const welcome = <h2>Welcome to React</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('renders getnine target', () => {
        const wrapper = shallow(<App />);
        const nineSign = <p className="App-intro">nine: 0</p>;
        expect(wrapper.contains(nineSign)).toEqual(true);
    });

    it('renders getnine button click message', () => {
        const wrapper = shallow(<App />);
        wrapper.find('#buttonNine').simulate('click');
        const nineSign = <p className="App-intro">nine: 9</p>;
        expect(wrapper.contains(nineSign)).toEqual(true);
    });

    it('renders getFoo button click message', () => {
        const wrapper = shallow(<App />);
        wrapper.find('#buttonFoo').simulate('click', {
                target: {'foo': 'bar'}
            }
        );
        const expectedRes = <p className="App-intro">state: bar</p>;
        expect(wrapper.contains(expectedRes)).toEqual(true);
    });
});