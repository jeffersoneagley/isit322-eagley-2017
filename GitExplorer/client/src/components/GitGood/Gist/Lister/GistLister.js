/**
 * A component for display of a git user's info
 */
import React, {Component} from 'react';
import GistListRow from './GistListRow';
class GistList extends Component {

    getList = () => {
        if (!this.props.gistData) {
            return [
                (<tr key='noGistData'>
                    <td>GistLister has no gist data prop</td>
                </tr>)];
        }
        else if (!this.props.gistData.gistList) {
            return [
                (<tr key='noGistData'>
                    <td>GistLister gist data has no gist list</td>
                </tr>)];
        }
        else if (this.props.gistData.gistList &&
            this.props.gistData.gistList.length > 0) {
            return this.props.gistData.gistList.map((field, index) => {
                return <GistListRow gistData={field}
                                    index={index}
                                    getGistHeaderById={this.props.getGistHeaderById}
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

    render() {
        return (
            <div>
                <h2>Gist Lister</h2>
                <table className="table table-responsive table-striped">
                    {this.props.isRefreshingGistData ? <caption>loading..</caption> : true}
                    <tbody>
                    {this.getList()}
                    </tbody>
                </table>
            </div>
        );
    };
}

export default GistList;
