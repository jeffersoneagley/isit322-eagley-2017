/**
 * Created by fish on 5/21/17.
 */
import React, {Component} from 'react';
/**
 * A component for display of a git user's info
 */
class GistListRow extends Component {

    static DEFAULT_MESSAGES = {
        NOT_FOUND: {
            button: 'Gist ID missing',
            files: 'No files found for gist? that\'s strange',
            url: 'No URL(s) given',
        },
        DUMMY: {
            button: 'No data was given',
            files: 'No files, because this this a dummy row',
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
            <td>{GistListRow.DEFAULT_MESSAGES.DUMMY.url}</td>
        </tr>;
    };

    processGistIdIndexHasButton = (gistData, index, clickHandler) => {
        let buttonText = <div>
            {typeof(index) === 'number' ? (index + ' - ') : ''}
            {(gistData.id !== undefined ?
                (<span>ID<br/>{gistData.id}</span>) :
                GistListRow.DEFAULT_MESSAGES.NOT_FOUND.button)}
        </div>;
        if (clickHandler !== undefined) {
            return (<button onClick={clickHandler}>
                {buttonText}
            </button>);
        } else {
            return buttonText;
        }
    };

    getForm = (gistData, index, clickHandler) => {
        if (gistData !== undefined) {
            return <tr key={'keyGistRow' + gistData.id}>
                <td>
                    {this.processGistIdIndexHasButton(gistData, index, clickHandler)}
                </td>
                <td>
                    Files:
                    <ul>{gistData.files ?
                        this.getFileMetaList(gistData.files) :
                        GistListRow.DEFAULT_MESSAGES.NOT_FOUND.files
                    }</ul>
                </td>
                <td><a href={gistData.html_url} target="new">
                    {
                        gistData && gistData.html_url ?
                            this.autoTruncate(gistData.html_url, 25) :
                            GistListRow.DEFAULT_MESSAGES.NOT_FOUND.url
                    }
                </a></td>
            </tr>;
        } else {
            return GistListRow.defaultForm();
        }
    };

    clickHandler_gistIdSelected = (event) => {
        if (event !== undefined && event.preventDefault) {
            event.preventDefault();
        }
        this.props.getGistHeaderById(this.props.gistData.id, event);
    };

    render() {
        return this.getForm(this.props.gistData, this.props.index, this.clickHandler_gistIdSelected);
    };
}

export default GistListRow;
