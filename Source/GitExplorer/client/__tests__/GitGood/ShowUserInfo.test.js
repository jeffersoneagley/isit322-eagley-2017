import React from "react";
import ReactDOM from "react-dom";
// import Paragraph from "../src/components/paragraph";
import ShowUserInfo from "../../src/components/GitGood/ShowUserInfo";
import {mount, shallow} from "enzyme";

describe('Test suite for ShowUserInfo functionality', function () {

    let data = {};

    beforeEach(function () {
        data = {
            gitUser     : {
                'username'    : 'testuser',
                'display_name': 'Test User'
            },
            userReceived: true,
            nameList    : ['username', 'display_name']
        }
    });

    it('renders component without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ShowUserInfo />, div);
    });

    for (var item in data.nameList) {
        it('Shows dummy user\'s ' + item, () => {
            let result = false;
            const wrapper = mount(<ShowUserInfo
                userReceived={data.gitUser}
                nameList={data.nameList}
                gitUser={data.gitUser}
                onGetUserButtonClicked={function () {
                    result = true;
                }}
            />);
            expect(wrapper.find(data.gitUser[data.nameList[item]]).count > 0).toEqual(true);
            expect(wrapper.find(data.nameList[item]).count > 0).toEqual(true);
        });
    }

    it('simulates button click', () => {
        let result = false;
        const wrapper = shallow(<ShowUserInfo
            userReceived={data.gitUser}
            nameList={data.nameList}
            gitUser={data.gitUser}
            onGetUserButtonClicked={function () {
                result = true;
            }}
        />);
        wrapper.find('button').simulate('click');
        expect(result).toEqual(true);
    });
});