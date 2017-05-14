import React, {Component} from 'react';
import ShowUserInfo from './ShowUserInfo';
import Debug from '../Debug/Debug';

class GetUserInfo extends Component {
  constructor(props) {
    super(props);

    this.debug = new Debug();
    this.debug.shutUp();
  };

  render() {
    this.debug.log('render getuserinfo');
    return (
        <ShowUserInfo
            fields={this.props.fieldDefinitions}
            gitUser={this.props.gitUser}
            onGetUserButtonClicked={this.props.onGetUserButtonClicked}
        />
    );
  };
}

export default GetUserInfo;
