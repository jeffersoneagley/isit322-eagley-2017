import React, {Component} from 'react';
import Debug from '../../../../Debug/Debug';
const logger = new Debug(false);
/**
 * A component for entering a new gist
 */
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

    render() {
        logger.log('render GetGist');
        return (
            <section className='panel panel-info'>

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
                    <button className='btn btn-primary' onClick={this.clickMe}>Create Gist</button>
                </div>
            </section>
        );
    };
}

export default GistCreatorDisplay;
