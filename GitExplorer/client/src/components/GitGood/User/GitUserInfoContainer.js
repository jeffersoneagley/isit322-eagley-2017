/**
 * Created by fish on 6/11/17.
 */
import {getTypeGitUserResponse} from './GitUserActionTypes';
import {connect} from 'react-redux';
// import GetFooMobile from './views/GetFooMobile';
import GitUserInfoDisplay from './views/GitUserInfoDisplay';
import 'whatwg-fetch';

// let GetFoo = (process.env.BUILD_FOR_MOBILE === true) ?
//     GetFooMobile :
//     GetFooStandard;

const mapStateToProps = (state) => {
    return state.Git.UserInfo;
};

const mapDispatchToProps = (dispatch) => {
    return {

        getUser: (event) => {
            if (event !== undefined) {
                event.preventDefault();
            }
            const that = this;
            fetch('/api/git/user').then(function(response) {
                return response.json();
            }).then(function(data) {
                // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
                let json = typeof (data) === 'string' ? JSON.parse(data) : data;
                let body = json.body;

                // let fields = gitFieldGenerator.getFields(body);
                // that.setState({gitUser: body, fieldDefinitions: fields});
                dispatch(getTypeGitUserResponse(body));
            }).catch(function(ex) {
                // DISPLAY WITH LOGGER
                that.debug.log(ex);
            });
        },
    };
};

let GitUserInfoContainer = connect(mapStateToProps, mapDispatchToProps)(GitUserInfoDisplay);

export default GitUserInfoContainer;
