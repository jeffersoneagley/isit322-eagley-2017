import {getTypeFooResponse} from './actions/GetFooActionTypes';
import {connect} from 'react-redux';
import GetFooMobile from './views/GetFooMobile';
import GetFooStandard from './views/GetFooStandard';
import 'whatwg-fetch';

let GetFoo = (process.env.BUILD_FOR_MOBILE === true) ?
    GetFooMobile :
    GetFooStandard;

const mapStateToProps = (state) => {
    return state.GetFooReducer;
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchFoo: () => {
            fetch('/api/foo').then(function(response) {
                return response.json();
            }).then(function(json) {
                dispatch(getTypeFooResponse(json));
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
        },
    };
};

GetFoo = connect(mapStateToProps, mapDispatchToProps)(GetFoo);

export default GetFoo;
