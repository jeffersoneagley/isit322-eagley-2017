/**
 * Created by fish on 5/21/17.
 */
import React, {Component} from 'react';
/**
 * A component for display of a git user's info
 */
class GistList extends Component {

    getFileListItem = (fileMetaData) => {
        return <li key={'keyGistFile' + fileMetaData.filename}>
            <small>
                {fileMetaData.filename || ''}
                ({fileMetaData.type || ''})
            </small>
        </li>;
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

    getForm = (field, index, clickHandler) => {
        return <tr key={'keyGistRow' + field.id}>
            <td>
                <button onClick={clickHandler(field.id)}>
                    {index !== undefined ? index : 'something has gone terribly wrong, please refresh'}
                    - ID: <br/>
                    {field.id || 'error in getting ID'}
                </button>
            </td>
            <td>
                Files:
                <ul>{field.files ? this.getFileMetaList(field.files) : 'no files'}</ul>
            </td>
            <td><a href={field.html_url} target="new">
                {this.autoTruncate(field.html_url, 25) || 'no url given'}
            </a></td>
        </tr>
            ;
    };

    render() {
        return this.getForm(this.props.field, this.props.index, this.props.clickHandler_gistIdSelected);
    };
}

export default GistList;
