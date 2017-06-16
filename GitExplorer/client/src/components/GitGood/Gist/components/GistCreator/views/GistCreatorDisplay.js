/**
 * A component for entering a new gist
 */
import React, {Component} from 'react';
import Debug from '../../../../../Debug/Debug';
import {CREATE} from '../../actions/GitGistActionTypes';
const logger = new Debug(false);
class GistCreatorDisplay extends Component {
    constructor(props) {
        super(props);
        this.formElements = {
            gistContent: 'gists are great',
            gistTitle: 'new gist.json',
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

    lockButton = () => {
        if (this.props.createIsProcessing) {
            return <button className='btn btn-primary'
                           disabled
            >
                <div className='progress-bar progress-bar-striped active'
                     onClick={this.clickMe}
                     aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'
                     style={{width: '100%', height: '100%'}}
                >
                    Creating Gist <span className="glyphicon glyphicon-cloud-upload"> </span>
                </div>
            </button>;
        } else {
            return <button className='btn btn-primary' onClick={this.clickMe}>
                Create
                Gist
            </button>;
        }
    };

    getPanelCreateGist = () => {
        return <section className='panel panel-info'>

            <h3 className='panel-heading'>Create a gist</h3>
            <article className="panel-body">
                <div className="input-group">
                    <label htmlFor="#newGistTitle" className='control-label col-xs-12 col-sm-4'>Title</label>
                    <input id="#newGistTitle" type="text" className="form-control col-xs-12 col-xs-8"
                           defaultValue={this.formElements.gistTitle}
                           onChange={(event) => {
                               this.formElements.gistTitle = event.target.value;
                           }}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="#newGistDescription"
                           className='control-label col-xs-12'>Description</label>
                    <input id="#newGistDescription" type="text" className="form-control col-xs-12"
                           defaultValue={this.formElements.gistDescription}
                           onChange={(event) => {
                               this.formElements.gistDescription = event.target.value;
                           }}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="#newGistContent"
                           className='control-label col-xs-12 col-sm-4'>Content</label>
                    <textarea id="#newGistContent" type="text" rows={5} className="form-control col-xs-12 col-xs-8"
                              defaultValue={this.formElements.gistContent}
                              onChange={(event) => {
                                  this.formElements.gistContent = event.target.value;
                              }}
                    />
                </div>
            </article>
            <div className='panel-footer'>
                {this.lockButton()}
            </div>
        </section>;
    };

    getPanelFooterResponseConfirm = () => {
        return <div className='panel-footer'>
            <button className="btn btn-lg btn-primary" onClick={this.props.onConfirmPromptOk}>
                Ok!
            </button>
        </div>;
    };

    getPanelResponseSuccess = () => {
        return <section className='panel panel-success'>
            <div className='panel-heading'>
                <h3>Your new gist was created!!</h3>
                <subtitle>{this.props.selectedGist.id}</subtitle>
            </div>
            <article>
                Response:
                {this.props.create.responseMessage}
            </article>
            {this.getPanelFooterResponseConfirm()}
        </section>;
    };

    getPanelResponseFailure = () => {
        return <section className='panel panel-danger'>
            <div className='panel-heading'>
                <h3>Oh no!</h3>
                <subtitle>Something went wrong</subtitle>
            </div>
            <article>

                Response:
                {this.props.create.responseMessage}
            </article>
            {this.getPanelFooterResponseConfirm()}
        </section>;
    };

    getPanelType = () => {
        switch (this.props.create.responseType) {
            case CREATE.RESPONSE_TYPES.SUCCESS:
                return this.getPanelResponseSuccess();
            case CREATE.RESPONSE_TYPES.FAILURE:
                return this.getPanelResponseFailure();
            case CREATE.RESPONSE_TYPES.STARTUP:
            default:
                return this.getPanelCreateGist();
        }
    };

    render() {
        logger.log('render GetGist');
        console.log(this.props.isProcessing);
        return this.getPanelType();
    };
}

export default GistCreatorDisplay;
