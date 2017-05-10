import React from "react";
import ReactDOM from "react-dom";
import {mount} from "enzyme";
// import Paragraph from "../src/components/paragraph";
import mockData from "../../__mocks__/mock-data";
import GetUserInfo from "../../src/components/GitGood/GetUserInfo";
import fieldDefMocks from "../../__mocks__/mock-field-definitions";

describe('Test suite for GetUserInfo functionality', function () {
    let fieldDefinitions = [];
    let gitUser = {};

    function gitUserInit() {
        const tempGitUser = {};
        for (let value of fieldDefinitions) {
            if (fieldDefinitions.hasOwnProperty(value)) {
                tempGitUser[value.id] = value.sample;
            }
        }
        return tempGitUser;
    };

    beforeEach(function () {
        fieldDefinitions = fieldDefMocks;
        gitUser = gitUserInit();
    });


    let simNames = JSON.parse(mockData('/api/user').body);

    it('renders component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GetUserInfo />, div);
    });

    // function getDefault(id, value) {
    //     it.only('Renders' + value + ' paragraph containing ' + value, () => {
    //         const wrapper = mount(<GetUserInfo/>);
    //         const testCase = <p className="ElfFormParagraph" id={id}>{value}</p>;
    //         // console.log(wrapper.find('[class=EfFormParagraph]'));
    //         // console.log('deeeeeeeeerppp');
    //         expect(wrapper.containsMatchingElement(testCase)).toEqual(true);
    //     })
    // }


    it('simulates button click', () => {
        let result = false;
        const wrapper = mount(<GetUserInfo
            fields={fieldDefinitions}
            gitUser={gitUser}
            onGetUserButtonClicked={function () {
                result = true;
            }}
        />);
        wrapper.find('button').simulate('click');
        expect(result).toEqual(true);
    });

    // it.only('Renders paragraph containing avatar_url', () => {
    //     const wrapper = mount(<GetUserInfo />);
    //     const testCase = <p id="avatar_url" className="EflFormParagraph"/>;
    //     wrapper.find('button').forEach((w) => {
    //         w.simulate('click')
    //     });
    //     // console.log(wrapper.debug());
    //     expect(wrapper.containsMatchingElement(testCase)).toEqual(true);
    // });

    // it('calls component render tests', () => {
    //     getDefault('avatar_url', 'https://avatars3.githubusercontent.com/u/1811478?v=3');
    //
    //
    // });


});