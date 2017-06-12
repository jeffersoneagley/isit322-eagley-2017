/**
 * A component for display of a git user's info
 */
import React, {Component} from 'react';
import GistListRow from './GistListRow';
class GistList extends Component {

    getList = (gistMetaList) => {
        if (gistMetaList === undefined) {
            return [
                (<tr key='noGistData'>
                    <td>GistLister gist data has no gist list</td>
                </tr>)];
        }
        else if (gistMetaList &&
            gistMetaList.length !== undefined &&
            gistMetaList.length > 0) {
            return gistMetaList.map((field, index) => {
                return <GistListRow gistData={field}
                                    index={index}
                    // getGistHeaderById={this.props.getGistHeaderById}
                                    key={'gistListRow_' + index}
                />;
            });
        } else {
            return [
                <tr key='noGistData'>
                    <td>GistLister had unidentified error</td>
                </tr>];
        }
    };

    getBadge = (gistMetaList) => {
        if (gistMetaList !== undefined && gistMetaList.length !== undefined) {
            return gistMetaList.length || '';
        } else {
            return '';
        }
    };

    render() {
        this.props.checkGistList();

        return (
            <div>
                <h2>Gist Lister<span className="badge">{this.getBadge(this.props.gistListMetaData)}</span></h2>
                <table className="table table-responsive table-striped">
                    {this.props.isGistListRefreshing ? <caption>loading..</caption> : true}
                    <tbody>
                    {this.getList(this.props.gistListMetaData)}
                    </tbody>
                </table>
            </div>
        );
    };
}

export default GistList;
