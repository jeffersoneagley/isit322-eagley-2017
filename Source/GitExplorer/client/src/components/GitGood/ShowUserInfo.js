import React, {Component} from "react";
import Debug from "../Debug/Debug";
import ElfElements from "../Elf/ElfElement";
const logger = new Debug(true);

class ShowUserInfo extends Component {
    constructor(props) {
        super(props);

        logger.log('ShowUserInfo props.' + JSON.stringify(this.props.userData, null, 4));
    };

    getForm = (field, index) => {
        return (
            <div className="ElfFormRow" key={field.id}>
                <label className="ElfFormLabel" htmlFor={field.id}>{field.label}:</label>
                <ElfElements {...field}
                             value={this.props.gitUser[field.id]}
                             onChange={this.props.onChange}
                />
            </div>
        )
    };


    // processUserData = () => {
    //     if (this.props && this.props.userReceived) {
    //         return <Paragraph stator={this.props.gitUser} nameList={this.props.nameList}/>;
    //     } else {
    //         return <p>No user data received yet</p>;
    //     }
    // };

    render() {
        logger.log('render getuserinfo');
        return (
            <form className="Form">
                <h3>ShowUserInfo</h3>
                {
                    this.props.fields.map((field, index) => {
                        return this.getForm(field, index)
                    })
                }
                <button onClick={this.props.onGetUserButtonClicked}>Get User</button>
            </form>
        );
    };
}

export default ShowUserInfo;
