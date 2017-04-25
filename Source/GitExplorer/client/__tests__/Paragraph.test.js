import React from "react";
import {shallow} from "enzyme";
import Paragraph from "../src/components/paragraph";

describe('Test suite for Paragraph component', function () {

    const testCases = {
        standard: {
            nameList: [
                'foo',
                'derp'
            ],
            state   : {
                'foo' : 'bar',
                'derp': 'herp'
            }
        }
    };

    it('1. Renders a Paragraph component without crashing', () => {
            const wrapper = shallow(<Paragraph />);

            expect(wrapper.exists()).toEqual(true);
        }
    );

    it('2. Renders a Paragraph component with test case without crashing', () => {

            console.log(testCases);
            const wrapper = shallow(
                <Paragraph nameList={testCases.standard.nameList}
                           stator={testCases.standard.state}/>);

            expect(wrapper.exists()).toEqual(true);
        }
    );

    it('3. Renders a standard test case and checks result are correct', () => {

            const wrapper = shallow(
                <Paragraph nameList={testCases.standard.nameList}
                           stator={testCases.standard.state}/>);

            for (var testInput in testCases.standard.state) {
                expect(wrapper.find('#para' + testInput)
                    .contains(testInput)).toEqual(true);
                expect(wrapper.find('#para' + testInput)
                    .contains(testCases.standard.state[testInput])).toEqual(true);
            }
        }
    );

});