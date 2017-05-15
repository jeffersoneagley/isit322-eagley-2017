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

    clickHandler_gistIdSelected = (id) => {
        return (event) => {
            this.props.getGistHeaderById(id, event);
        };
    };

    getForm = (field, index) => {
        console.log(field.files);
        return <tr key={'keyGistRow' + field.id}>
            <td>
                <button onClick={this.clickHandler_gistIdSelected(field.id)}>
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

    getList = () => {
        if (this.props.gistData.gistList &&
            this.props.gistData.gistList.length > 0) {
            return this.props.gistData.gistList.map((field, index) => {
                return this.getForm(field, index);
            });
        } else {
            return [
                (<tr key='noGistData'>
                    <td>No gist data loaded yet</td>
                </tr>)];
        }
    };

    render() {
        return (
            <table>
                <caption>Gist List</caption>
                <tbody>
                {this.getList()}
                </tbody>
            </table>
        );
    };
}

export default GistList;
