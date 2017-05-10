import React, {Component} from "react";
import Debug from "../Debug/Debug";
import ElfElements from "../Elf/ElfElement";
const logger = new Debug(false);

class ShowUserInfo extends Component {
    constructor(props) {
        super(props);

        logger.log('ShowUserInfo props.' + JSON.stringify(this.props.fields, null, 4));
    };

    getForm = (field, index) => {
        logger.log(index, field);
        return (
            <div className="ElfFormRow" key={field.id}>
                <label className="ElfFormLabel" htmlFor={field.id}>{field.label}:</label>
                <ElfElements {...field}
                             value={this.props.gitUser[field.id] || field.sample}
                             onChange={this.props.onChange}
                />
            </div>
        )
    };

    fillFields = () => {
        if (this.props.fields !== undefined) {
            logger.log(typeof (this.props.fields));
            return this.props.fields.map((field, index) => {
                return this.getForm(field, index)
            })
        }
    };

    clickMe = (event) => {
        console.log('clicked');
        this.props.onGetUserButtonClicked(event);
    };

    render() {
        logger.log('render getuserinfo');
        return (
            <form className="Form">
                <h3>ShowUserInfo</h3>
                {this.fillFields()}
                <button onClick={this.clickMe}>Get User</button>
            </form>
        );
    };
}

export default ShowUserInfo;
