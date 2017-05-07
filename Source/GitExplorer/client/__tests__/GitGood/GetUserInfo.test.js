import React from "react";
import ReactDOM from "react-dom";
import {mount} from "enzyme";
// import Paragraph from "../src/components/paragraph";
import mockData from "../../__mocks__/mock-data";
import GetUserInfo from "../../src/components/GitGood/GetUserInfo";

describe('Test suite for GetUserInfo functionality', function () {
    var simNames = JSON.parse(mockData('/api/user').body);

    it('renders component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GetUserInfo />, div);
    });

    function getDefault(id, value) {
        it.only('Renders' + value + ' paragraph containing ' + value, () => {
            const wrapper = mount(<GetUserInfo/>);
            const testCase = <p className="ElfFormParagraph" id={id}>{value}</p>;
            console.log(wrapper.find('[class=EfFormParagraph]'));
            console.log('deeeeeeeeerppp');
            expect(wrapper.containsMatchingElement(testCase)).toEqual(true);
        })
    }

    it('Renders paragraph containing avatar_url', () => {
        const wrapper = mount(<GetUserInfo/>);
        const testCase = <p id="avatar_url" className="EflFormParagraph"/>
        expect(wrapper.containsMatchingElement(testCase)).toEqual(true);
    });

    it('calls component render tests', () => {
        getDefault('avatar_url', 'ai-unknown');
    });


    // broken due to some weird setState error

    // var doGetTest = (val) => {
    //     it('renders user data: ' + val + " with correct data", () => {
    //         const wrapper = shallow(<GetUserInfo />);
    //         const para = wrapper.find(Paragraph); //.dive();
    //         wrapper.render();
    //
    //         expect(para.find('#para' + val).contains(val)).toEqual(true);
    //         expect(para.find('#para' + val).contains(simNames[val])).toEqual(true);
    //     })
    // };

    // for (var val in simNames) {
    //     console.log(val + ' in simNames')
    //     doGetTest(val);
    // }
    // ;


});