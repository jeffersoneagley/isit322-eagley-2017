import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";

describe('my basic rest test', function () {

    it('renders App without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

});