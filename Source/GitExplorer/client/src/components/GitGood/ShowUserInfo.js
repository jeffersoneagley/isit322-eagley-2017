import React, {Component} from 'react';
import Debug from '../Debug/Debug';
import ElfElements from '../Elf/ElfElement';
import GitFieldGenerator from './GitFieldGenerator';

const gitFieldGenerator = new GitFieldGenerator();
const logger = new Debug(false);
let fieldDefinitions = [];
/**
 * A component for display of a git user's info
 */
class ShowUserInfo extends Component {
  /**
   * Make a new ShowUserInfo object
   * @param props: expects onGetUserButtonClicked, fieldDefinitions, & gitUser state
   */
  constructor(props) {
    super(props);

    logger.log(
        'ShowUserInfo props.' + JSON.stringify(this.props.fields, null, 4));
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
          <ElfElements {...field}
                       value={this.props.gitUser[field.id] || field.sample}
                       onChange={this.props.onChange}
          />
        </div>
    );
  };

  /**
   * calls getform for each field passed
   */
  fillFields = () => {
    try {
      if (this.props.gitUser) {
        fieldDefinitions = gitFieldGenerator.getFields(this.props.gitUser);
        if (fieldDefinitions !== undefined) {
          logger.log(typeof (fieldDefinitions));
          return fieldDefinitions.map((field, index) => {
            return this.getForm(field, index);
          });
        }
      }
    } catch (exc) {

      console.log(this.props.gitUser);
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
