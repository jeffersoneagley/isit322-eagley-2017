import React from 'react';
import ReactDOM from 'react-dom';
import GetFoo from '../src/components/SimpleReactDemos/GetFoo';
import Paragraph from '../src/components/Paragraph/Paragraph';
import {shallow} from 'enzyme';

describe('my basic rest test', function() {
    let simNames = [
        {name: 'foo', short: 'bar'},

    ];

    simNames.forEach((val) => {
        val.upperName = val.name.charAt(0).toUpperCase() + val.name.slice(1);
    });

    it('renders module without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GetFoo />, div);
    });

    let doGetTest = (val) => {
        it('renders get' + val.upperName + ' button click message', () => {
            const wrapper = shallow(<GetFoo />);
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
