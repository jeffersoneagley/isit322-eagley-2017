import {TYPE_GET_FOO} from '../components/SimpleReactDemos/GetFoo/actions/GetFooActionTypes';

const initialState = {
    fooData: {
        file: 'Get Nine Result will be placed here',
        foo: 'Waiting for server',
    },
};
const GetFooReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
    case TYPE_GET_FOO:
        newState = {...state, fooData: action.fooData};
        return newState;
    default:
        return state;
    }
};

export default GetFooReducer;
