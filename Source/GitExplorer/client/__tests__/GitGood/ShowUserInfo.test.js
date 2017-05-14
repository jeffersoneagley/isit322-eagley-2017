import React from 'react';
import ReactDOM from 'react-dom';
// import Paragraph from "../src/components/paragraph";
import ShowUserInfo from '../../src/components/GitGood/ShowUserInfo';
import fieldDefMocks from '../../__mocks__/mock-field-definitions';
import {mount} from 'enzyme';

describe('Test suite for ShowUserInfo functionality', function() {

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

    beforeEach(function() {
        fieldDefinitions = fieldDefMocks;
        gitUser = gitUserInit();
    });

    it('renders component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ShowUserInfo />, div);
    });

    // for (let item in data.nameList) {
    //
    //     it('Shows dummy user\'s ' + item, () => {
    //         let result = false;
    //         const wrapper = mount(<ShowUserInfo
    //             fields={fieldDefinitions}
    //             gitUser={gitUser}
    //             onGetUserButtonClicked={function () {
    //                 result = true;
    //             }}
    //         />);
    //         expect(wrapper.find(data.gitUser[data.nameList[item]]).count > 0).toEqual(true);
    //         expect(wrapper.find(data.nameList[item]).count > 0).toEqual(true);
    //     });
    // }

    it('simulates button click', () => {
        let result = false;
        const wrapper = mount(<ShowUserInfo
            fields={fieldDefinitions}
            gitUser={gitUser}
            onGetUserButtonClicked={function() {
                result = true;
            }}
        />);
        wrapper.find('button').simulate('click');
        expect(result).toEqual(true);
    });
});
