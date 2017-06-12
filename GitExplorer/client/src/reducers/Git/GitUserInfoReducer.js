import {TYPE_GIT_GET_USER_RESPONSE} from '../../components/GitGood/User/GitUserActionTypes';

const initialState = {
    userData: {},
};
const GitUserInfoReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case TYPE_GIT_GET_USER_RESPONSE:
            newState = {...state, userData: action.userData};
            return newState;
        default:
            return state;
    }
};

export default GitUserInfoReducer;
