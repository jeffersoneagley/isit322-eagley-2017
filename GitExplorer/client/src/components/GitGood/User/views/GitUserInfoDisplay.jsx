/**
 * A component for display of a git user's info
 */
import React, {Component} from 'react';
import FishElement from '../../FishElement';
import {Button} from 'react-bootstrap';
import gitFieldGenerator from '../../GitFieldGenerator';
const logger = new Debug(false);

class GitUserInfo extends Component {
    /**
     * Make a new ShowUserInfo object
     * @param props: expects onGetUserButtonClicked, fieldDefinitions, & gitUser state
     */
    constructor(props) {
        super(props);

        logger.log(
            'ShowUserInfo props.' + JSON.stringify(this.props.userData, null, 4));
    };

    /**
     * Creates an ElfElements element for the field passed to it
     * @param field an object passed, of the form {id, label, sample}
     * @param index not currently used
     * @returns {XML} EfFormRow with key, label, and result of ElfElement component
     */
    getForm = (field, index) => {
        logger.log(index, field);
        return (
            <div className="ElfFormRow" key={field.id}>
                <label className="ElfFormLabel"
                       htmlFor={field.id}>{field.label}:</label>
                <FishElement {...field}
                             value={this.props.gitUser[field.id] || field.sample}
                             onChange={this.props.onChange}
                             key={'elfElement_' + field.id}/>

            </div>
        );
    };

    /**
     * calls getform for each field passed
     */
    fillFields = (fields) => {
        try {
            if (fields) {
                let fieldDefinitions = gitFieldGenerator.getFields(fields);
                if (fieldDefinitions !== undefined) {
                    // logger.log(typeof (fieldDefinitions));
                    return fieldDefinitions.map((field, index) => {
                        return this.getForm(field, index);
                    });
                }
            }
        } catch (exc) {

            console.log(fields);
            console.log(exc);
        }
    };

    /**
     * clickhandler for ShowUserInfo's get user button,
     * logs to the console and calls passed clickhandler
     * @param event from onClick or similar
     */
    clickMe = (event) => {
        // console.log('clicked');
        this.props.getUser(event);
    };

    render() {
        logger.log('render getuserinfo');
        return (
            <div className="media">
                <h3>ShowUserInfo</h3>
                {this.fillFields(this.props.userData)}
                <Button bsClass="primary" onClick={this.clickMe}>Get User</Button>
            </div>
        );
    };
}

export default GitUserInfo;
