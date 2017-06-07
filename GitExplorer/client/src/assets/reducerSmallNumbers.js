/**
 * Created by fish on 6/6/17.
 */


const smallNumbersState = {
    numbers: {
        nine: '0',
        eight: '0',
    },
};

const smallNumbersReducer = (state = smallNumbersState, action) => {
    switch (action.type) {
        case 'NUMBER_NINE':
            return {...state, numbers{...state.numbers, nine: 9}};

        case 'NUMBER_EIGHT':
            return {...state, numbers{...state.numbers, eight: 8}};

        default:
            return state;
    }
};

export default smallNumbersReducer;