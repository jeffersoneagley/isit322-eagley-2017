/**
 * Created by fish on 5/16/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {shallow} from 'enzyme';
import GistLister from '../../src/components/GitGood/Gist/GistLister';
import ElfDebugEnzyme from '../../EfDebugEnzyme';
let elfDebugEnzyme = new ElfDebugEnzyme(true, 'GistLister');

describe('GistLister test Suite', function() {

    it('renders the GistLister component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GistLister />, div);
    });

    it('renders and reads GistLister H2 text', () => {
        const wrapper = shallow(<GistLister />);
        elfDebugEnzyme.getAll(wrapper);
        const welcome = <h2>Gist Lister</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('renders GistLister a single default TR Element', () => {
        const wrapper = shallow(<GistLister />);
        elfDebugEnzyme.getElement(wrapper, 'tr');
        expect(wrapper.find('tr').length).toEqual(1);
    });

});
