import {combineReducers} from 'redux';
import {TYPE_SMALL_NUMBERS_GET_NUMBER} from '../components/SimpleReactDemos/SmallNumber/actions/SmallNumbersActionTypes';

const smallNumbersState = {
    numbers: {
        1: '0',
        2: '0',
        3: '0',
        4: '0',
        5: '0',
        6: '0',
        7: '0',
        8: '0',
        9: '0',
    },
};
const smallNumbersReducer = (state = smallNumbersState, action) => {
    // console.log('smallnum reducer called with action ' + JSON.stringify(action));
    let newState = {...state, numbers: {...state.numbers}};
    switch (action.type) {
        case TYPE_SMALL_NUMBERS_GET_NUMBER:
            console.log(TYPE_SMALL_NUMBERS_GET_NUMBER + ' case in reducer');
            newState.numbers[action.number] = action.number;
            return newState;
        case undefined:
            newState.numbers = smallNumbersState.numbers;
            return newState;
        default:
            return state;
    }
};

export default combineReducers({smallNumbersReducer});
