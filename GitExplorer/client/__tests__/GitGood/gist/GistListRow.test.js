/**
 * Created by fish on 5/16/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {shallow} from 'enzyme';
import GistListRow from '../../../src/components/GitGood/Gist/Lister/GistListRow';
import ElfDebugEnzyme from '../../../EfDebugEnzyme';
import MockGistData from '../../../__mocks__/mock-gist-single';
let elfDebugEnzyme = new ElfDebugEnzyme(true, 'GistLister');

describe('GistListRow test Suite', function() {

    it('renders the GistLister component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GistListRow />, div);
    });

    it('renders and reads default GistListRow', () => {
        const wrapper = shallow(<GistListRow />);
        elfDebugEnzyme.getAll(wrapper);
        const dummy = GistListRow.defaultForm();
        expect(wrapper.contains(dummy)).toEqual(true);
    });

    it('renders GistLister a single default TR Element, no more, no less', () => {
        const wrapper = shallow(<GistListRow />);
        elfDebugEnzyme.getElement(wrapper, 'tr');
        expect(wrapper.find('tr').length).toEqual(1);
    });

    it('renders and reads data from mock gist', () => {
        // console.log(MockGistData.normal);
        const wrapper = shallow(<GistListRow gist={MockGistData.normal}/>);
        elfDebugEnzyme.getAll(wrapper);
        const dummy = GistListRow.defaultForm();
        expect(wrapper.contains(dummy)).toEqual(true);
    });

    it('renders mock data with an index of 0', () => {
        // console.log(MockGistData.normal);
        const wrapper = shallow(<GistListRow gist={MockGistData.normal} index={0}/>);
        elfDebugEnzyme.getAll(wrapper);
        const dummy = GistListRow.defaultForm();
        expect(wrapper.contains(dummy)).toEqual(true);
    });

    it('renders mock data with an index of 500,000', () => {
        // console.log(MockGistData.normal);
        const wrapper = shallow(<GistListRow gist={MockGistData.normal} index={500000}/>);
        elfDebugEnzyme.getAll(wrapper);
        const dummy = GistListRow.defaultForm();
        expect(wrapper.contains(dummy)).toEqual(true);
    });

});
