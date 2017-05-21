/**
 * Created by fish on 5/16/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {shallow} from 'enzyme';
import GistListRow from '../../../src/components/GitGood/Gist/Lister/GistListRow';
import ElfDebugEnzyme from '../../../EfDebugEnzyme';
import MockGistData from '../../../__mocks__/mock-gist-single';
let elfDebugEnzyme = new ElfDebugEnzyme(false, 'GistLister');

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
        // elfDebugEnzyme.showData = true;
        const wrapper = shallow(<GistListRow gistData={MockGistData.normal}/>);
        elfDebugEnzyme.getAll(wrapper);
        expect(wrapper.find('td').length).toEqual(3);
        // elfDebugEnzyme.showData = false;
    });

    it('[mock gist (valid)][no index] produces button?', () => {
        // console.log(MockGistData.normal);
        // elfDebugEnzyme.showData = true;
        const wrapper = shallow(<GistListRow gistData={MockGistData.normal}/>);
        elfDebugEnzyme.getAll(wrapper);
        expect(wrapper.find('button').length).toEqual(1);
        // elfDebugEnzyme.showData = false;
    });

    for (let file in MockGistData.normal.files) {
        if (MockGistData.normal.files.hasOwnProperty(file)) {
            it('[mock gist (valid)][no index] file list includes ' + file + '?', () => {
                // console.log(MockGistData.normal);
                // elfDebugEnzyme.showData = true;
                const wrapper = shallow(<GistListRow gistData={MockGistData.normal}/>);
                elfDebugEnzyme.getAll(wrapper);
                expect(
                    wrapper.someWhere(w => w.text().includes(MockGistData.normal.files[file].filename)),
                ).toEqual(true);
                // elfDebugEnzyme.showData = false;
            });
        }
    }

    it('renders mock data with an index of 0', () => {
        // console.log(MockGistData.normal);
        const wrapper = shallow(<GistListRow gistData={MockGistData.normal} index={0}/>);
        elfDebugEnzyme.getAll(wrapper);
        expect(wrapper.someWhere(w => w.text().includes('0 - '))).toEqual(true);
    });

    let bigNumber = 5000000;

    it('renders mock data with an index of ' + bigNumber + ' [unreasonably large number]', () => {
        // console.log(MockGistData.normal);
        const wrapper = shallow(<GistListRow gistData={MockGistData.normal} index={bigNumber}/>);
        elfDebugEnzyme.getAll(wrapper);
        expect(wrapper.someWhere(w => w.text().includes(bigNumber + ' - '))).toEqual(true);
    });

    it('[mock gist (valid)[no files][index 1] displays text to indicate gist has no files?', () => {
        let myMock = MockGistData.normal;
        myMock.files = undefined;
        // console.log(MockGistData.normal);
        const wrapper = shallow(<GistListRow gistData={myMock} index={1}/>);
        elfDebugEnzyme.getAll(wrapper);
        expect(
            wrapper.someWhere(w => w.text().includes(GistListRow.DEFAULT_MESSAGES.NOT_FOUND.files)),
        ).toEqual(true);
    });

});
