import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../src/components/Header/ElfHeader';
import {shallow} from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';
;
describe('Header test suite', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const newHeader = <Router><Header/></Router>;
    ReactDOM.render(newHeader, div);

  });

  it('renders and reads the header object', () => {
    const wrapper = shallow(<Router><Header /></Router>);
    const head = wrapper.find(Header).first().dive();
    const welcome = <h2>Welcome to Jefferson's Git Explorer</h2>;
    // console.log(head.find('h2').length > 0);
    expect(head.containsMatchingElement(welcome)).toEqual(true);
  });
});
