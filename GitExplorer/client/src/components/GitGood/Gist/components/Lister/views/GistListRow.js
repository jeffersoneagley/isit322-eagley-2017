/**
 * Created by fish on 5/21/17.
 */
import React, {Component} from 'react';
import GistListRowDeleteSelectorContainer from '../../GistDelete/GistListRowDeleteSelectorContainer.js';

/**
 * A component for display of a git user's info
 */
class GistListRow extends Component {
    static DEFAULT_MESSAGES = {
        NOT_FOUND: {
            button: 'Gist ID missing',
            files: 'No files found for gist? that\'s strange',
            description: 'Gist not found',
            updated_at: 'No date updated given',
            created_at: 'No date created given',
            url: 'No URL(s) given',
        },
        DUMMY: {
            button: 'No data was given',
            description: 'Default Gist data for tests',
            files: 'No files, because this this a dummy row',
            updated_at: Date.now(),
            created_at: 'No date updated given',
            url: 'If you are seeing this, please refresh and contact the site admin.',
        },
    };

    getFileListItem = (fileMetaData) => {
        return (<li key={'keyGistFile' + fileMetaData.filename}>
            <small>
                {fileMetaData.filename || ''}
                ({fileMetaData.type || ''})
            </small>
        </li>);
    };

    getFileMetaList = (fileMetaList) => {
        let res = [];
        for (let lineItem in fileMetaList) {
            if (fileMetaList.hasOwnProperty(lineItem)) {
                res.push(this.getFileListItem(fileMetaList[lineItem]));
            }
        }
        return res;
    };

    autoTruncate = (text, length = 8) => {
        if (text.length > length) {
            return text.substring(0, length - 1) + '...';
        } else {
            return text;
        }
    };

    static defaultForm = () => {
        return <tr key={'keyGistRowNoData' + Date.now()}>
            <th>{GistListRow.DEFAULT_MESSAGES.DUMMY.button}</th>
            <td>{GistListRow.DEFAULT_MESSAGES.DUMMY.files}</td>
            <td>{GistListRow.DEFAULT_MESSAGES.DUMMY.description}</td>
            <td>{GistListRow.DEFAULT_MESSAGES.DUMMY.url}</td>
            <td>'delete mode disabled</td>
        </tr>;
    };

    processButtonOrDiv = (content, clickHandler) => {
        if (clickHandler !== undefined) {
            return (<button className="btn btn-info btn-block" onClick={clickHandler}>
                {content}
            </button>);
        } else {
            return content;
        }
    };

    getRowData = (gistData) => {
        return <div>
            <div className="col-sm-3 col-xs-12">
                Description:
                {gistData.description ?
                    gistData.description :
                    GistListRow.DEFAULT_MESSAGES.NOT_FOUND.description
                }
            </div>
            <div className="col-sm-3 col-xs-12">
                Files:
                <ul>{gistData.files ?
                    this.getFileMetaList(gistData.files) :
                    GistListRow.DEFAULT_MESSAGES.NOT_FOUND.files
                }</ul>
            </div>
            <div className="col-sm-3 col-xs-12">
                <p>created {gistData.created_at ?
                    gistData.created_at :
                    GistListRow.DEFAULT_MESSAGES.NOT_FOUND.created_at
                }</p>
                <p>updated {gistData.updated_at ?
                    gistData.updated_at :
                    GistListRow.DEFAULT_MESSAGES.NOT_FOUND.updated_at
                }</p>
            </div>
        </div>;
    };

    getDeleteController = () => {
        try {
            return <GistListRowDeleteSelectorContainer
                gist={this.props.gistData}
            />;
        } catch (exc) {
            console.log(exc);
            return <p>Delete functions temporarily broken</p>;
        }
    };

    getForm = (gistData, index, clickHandler) => {
        let gistHeader = (gistData.id !== undefined ?
            (<div>ID:
                <small>{gistData.id}</small>
            </div>) :
            GistListRow.DEFAULT_MESSAGES.NOT_FOUND.button);
        if (gistData !== undefined) {
            return <tr key={'keyGistRow' + gistData.id} className="row">
                <td>
                    <div className="col-xs-9 col-sm-12">
                        <div className='container-fluid hidden-xs'>
                            <h3 className='page-header'>{gistHeader}</h3>
                            {this.getRowData(gistData)}
                            <div className='col-sm-3 hidden-xs'>
                                {this.processButtonOrDiv(
                                    <span>Open<span className='glyphicon glyphicon-open-file'></span></span>,
                                    clickHandler,
                                )}
                                {this.getDeleteController()}
                            </div>
                        </div>
                        <div className='container-fluid hidden-sm hidden-lg hidden-md'>
                            {this.processButtonOrDiv(
                                <div>
                                    <h3>{gistHeader}</h3>
                                    {this.getRowData(gistData)}
                                </div>
                                , clickHandler)}
                        </div>
                    </div>
                    <div className='col-xs-3 hidden-sm hidden-lg hidden-md'>
                        {this.getDeleteController()}
                    </div>
                </td>
            </tr>;
        } else {
            return GistListRow.defaultForm();
        }
    };

    clickHandler_gistIdSelected = (event) => {
        if (event !== undefined && event.preventDefault) {
            event.preventDefault();
        }
        this.props.getGistById(this.props.gistData.id, event);
    };

    render() {
        return this.getForm(this.props.gistData, this.props.index, this.clickHandler_gistIdSelected);
    };
}

export default GistListRow;
