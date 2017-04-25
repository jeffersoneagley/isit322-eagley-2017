import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import {shallow} from "enzyme";

describe('my basic rest test', function () {
    var simNames = [
        {name: 'foo', short: 'bar'}

    ];
    simNames.forEach((val) => {
        val.upperName = val.name.charAt(0).toUpperCase() + val.name.slice(1);
    });

    it('renders App without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    var doGetTest = (val) => {
        it('renders get' + val.upperName + " button click message", () => {
            const wrapper = shallow(<App />);
            wrapper.find('#button' + val.upperName).simulate('click');
            const numberElement = <p id={"para" + val.name}>
                {val.name}: {val.short}
            </p>;
            expect(wrapper.find('#para' + val.name)).toEqual(true);
        })
    };

    simNames.forEach((val) => {
        doGetTest(val);
    });
});