import React from 'react';
import {shallow} from 'enzyme';
import Paragraph from '../src/components/Paragraph/Paragraph';
import SmallNumbers from '../src/components/SmallNumber/SmallNumbers';

describe('Checking for functionality per SmallNumber assignment', function() {
    var simNames = [
        {name: 'one', short: '1'},
        {name: 'two', short: '2'},
        {name: 'three', short: '3'},
        {name: 'four', short: '4'},
        {name: 'five', short: '5'},
        {name: 'six', short: '6'},
        {name: 'seven', short: '7'},
        {name: 'eight', short: '8'},
        {name: 'nine', short: '9'}
    ];
    simNames.forEach((val) => {
        val.upperName = val.name.charAt(0).toUpperCase() + val.name.slice(1);
    });

    var doGetTest = (val) => {
        it('renders get' + val.upperName + ' button click message', () => {
            const wrapper = shallow(<SmallNumbers />);
            wrapper.find('#button' + val.upperName).simulate('click');
            const para = wrapper.find(Paragraph).dive();

            expect(para.find('#para' + val.name).contains(val.name)).toEqual(true);
            expect(para.find('#para' + val.name).contains(val.short)).toEqual(true);
        });
    };

    simNames.forEach((val) => {
        doGetTest(val);
    });
});
