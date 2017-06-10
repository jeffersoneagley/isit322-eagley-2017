// import React from 'react';
// import {connect} from 'react-redux';
import {getSmallNumbersNumber} from './SmallNumbersActionTypes';

class SmallNumbersActions {

    static clickHandlerCreator_GetNumber = (e, dispatch) => {
        console.log('clicked Smalln actions');
        console.log(e.target.value);
        dispatch(getSmallNumbersNumber(e.target.value));
    };
}
export default SmallNumbersActions;