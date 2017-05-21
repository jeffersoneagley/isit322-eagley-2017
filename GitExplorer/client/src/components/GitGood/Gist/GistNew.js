import React, {Component} from 'react';
import Debug from '../../Debug/Debug';
const logger = new Debug(false);
/**
 * A component for entering a new gist
 */
class GetGist extends Component {
    constructor(props) {
        super(props);
        this.formElements = {
            gistContent: 'gists are great',
            gistTitle: 'new gist.txt',
            gistDescription: 'a gist made from GitExplorer',
        };
    }

    clickMe = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        console.log('clicked');
        let docs = {};
        docs[this.formElements.gistTitle] = {
            'content': this.formElements.gistContent,
        };
        this.props.onCreateGist(event, docs, this.formElements.gistDescription);
    };

    render() {
        logger.log('render GetGist');
        return (
            <form className="Form">
                <h3>Create gist</h3>
                <label >Title</label>
                <input id="#newGistTitle" type="text"
                       defaultValue={this.formElements.gistTitle}
                       onChange={(event) => {
                           this.formElements.gistTitle = event.target.value;
                       }}
                />
                <label >Description</label>
                <input id="#newGistDescription" type="text"
                       defaultValue={this.formElements.gistDescription}
                       onChange={(event) => {
                           this.formElements.gistDescription = event.target.value;
                       }}
                />
                <label >Content</label>
                <input id="#newGistContent" type="text"
                       defaultValue={this.formElements.gistContent}
                       onChange={(event) => {
                           this.formElements.gistContent = event.target.value;
                       }}
                />
                <button onClick={this.clickMe}>Create Gist</button>
            </form>
        );
    };
}

export default GetGist;
