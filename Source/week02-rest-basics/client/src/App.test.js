import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header';
import {shallow} from 'enzyme';

describe('my basic rest test', function () {
    var simNames = [
        {name: 'one', short: '1'},
        {name: 'two', short: '2'},
        {name: 'three', short: '3'},
        {name: 'four', short: '4'},
        {name: 'five', short: '5'},
        {name: 'six', short: '6'},
        {name: 'seven', short: '7'},
        {name: 'eight', short: '8'},
        {name: 'nine', short: '9'}//,
        //{name: 'foo', short: 'bar'}

    ];
    simNames.forEach((val) => {
        val.upperName = val.name.charAt(0).toUpperCase() + val.name.slice(1);
    })

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('renders and reads H1 text', () => {
        const wrapper = shallow(<Header />);
        const welcome = <h2>Welcome to React</h2>;
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    var doGetTest = (val) => {
        it('renders get' + val.upperName + " button click message", () => {
            const wrapper = shallow(<App />);
            wrapper.find('#button' + val.upperName).simulate('click');
            //console.log(wrapper.find('#para' + val.name));
            const numberElement = <p id={"para" + val.name}>
                {val.name}: {val.short}
            </p>;
            expect(wrapper.contains(numberElement)).toEqual(true);
        })
    };

    simNames.forEach((val) => {
        doGetTest(val);
    });

    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonOne').simulate('click');
    //     const numberElement = <p className="App-intro" id="paraone">one: 1</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonTwo').simulate('click');
    //     const numberElement = <p className="App-intro">two: 2</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonThree').simulate('click');
    //     const numberElement = <p className="App-intro">three: 3</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonFour').simulate('click');
    //     const numberElement = <p className="App-intro">four: 4</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonFive').simulate('click');
    //     const numberElement = <p className="App-intro">five: 5</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonSix').simulate('click');
    //     const numberElement = <p className="App-intro">six: 6</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonSeven').simulate('click');
    //     const numberElement = <p className="App-intro">seven: 7</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonEight').simulate('click');
    //     const numberElement = <p className="App-intro">eight: 8</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });
    //
    // it('renders getnine button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonNine').simulate('click');
    //     const numberElement = <p className="App-intro">nine: 9</p>;
    //     expect(wrapper.contains(numberElement)).toEqual(true);
    // });

    // it('renders getFoo button click message', () => {
    //     const wrapper = shallow(<App />);
    //     wrapper.find('#buttonFoo').simulate('click', {
    //             target: {'foo': 'bar'}
    //         }
    //     );
    //     const expectedRes = <p className="App-intro">state: bar</p>;
    //     expect(wrapper.contains(expectedRes)).toEqual(true);
    // });
});