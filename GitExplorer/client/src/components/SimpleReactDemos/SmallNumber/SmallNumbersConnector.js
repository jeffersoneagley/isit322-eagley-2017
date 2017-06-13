import {getSmallNumbersNumber} from './actions/SmallNumbersActionTypes';
import {connect} from 'react-redux';
import SmallNumbersMobile from './views/SmallNumbersMobile';
import SmallNumbersStandard from './views/SmallNumbers';

let SmallNumbers = (process.env.BUILD_FOR_MOBILE === true) ?
    SmallNumbersMobile :
    SmallNumbersStandard;

const mapStateToProps = (state) => {
    return {
        numbers: state.SmallNumbersReducer.smallNumbersReducer.numbers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSmallNumber: (number) => {

            dispatch(getSmallNumbersNumber(number));
        },
    };
};

SmallNumbers = connect(mapStateToProps, mapDispatchToProps)(SmallNumbers);

export default SmallNumbers;

