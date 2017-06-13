/**
 * Created by fish on 6/12/17.
 */
import React, {Component} from 'react';
import {GIST_DELETE_ACTION_TYPES} from '../../actions/GitGistActionTypes';
/**
 * A component for prompting user to delete gists
 */
class GistListDeleteMenuDisplay extends Component {

    getCancelButton = () => {
        let that = this;
        return <button className='btn btn-primary btn-block' onClick={() => {
            that.props.onClickCancelStage(this.props.gistEditorDeleteMode);
        }
        }>Cancel</button>;
    };

    getSelectedGistCount = () => {
        let count = 0;
        for (let gist in this.props.gistList) {
            if (this.props.gistList.hasOwnProperty(gist)) {
                if (this.props.gistList[gist].isMarkedForDelete) {
                    count++;
                }
            }
        }
        return count;
    };

    getButtonDeleteSelected = () => {
        let that = this;
        return <button className='btn btn-warning btn-block' onClick={() => {
            that.props.onClickDeleteStage();
        }
        }>Delete</button>;
    };

    getButtonConfirmDeleteSelected = () => {
        let that = this;
        return <button className='btn btn-danger btn-block' onClick={() => {
            that.props.onClickDeleteStage();
        }
        }>Delete <span className='badge'>{this.getSelectedGistCount()}</span> Gists
        </button>;
    };

    getModeOff = () => {
        let that = this;
        return <button className='btn btn-secondary btn-block' onClick={() => {
            that.props.onClickDeleteStage();
        }
        }>Delete Gists</button>;
    };

    getModeStageFirst() {
        return <div className='alert alert-info'>
            <div className='col-xs-8 col-sm-9'>
                {this.getSelectedGistCount()} gists selected
            </div>
            <div className='col-xs-4 col-sm-3'>
                <div className='col-xs-6'>
                    {this.getCancelButton()}
                </div>
                <div className='col-xs-6'>
                    {this.getButtonDeleteSelected()}
                </div>
            </div>
        </div>;
    }

    getModeStageSecond() {
        return <div className='alert alert-danger fade in'>
            <p className='alert-link'>Are you sure you want to delete these gists?</p>
            {this.getCancelButton()}
            {this.getButtonConfirmDeleteSelected()}
        </div>;
    }

    getCurrentMode = () => {
        switch (this.props.gistEditorDeleteMode) {
            case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED:
                return this.getModeOff();
            case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
                return this.getModeStageFirst();
            case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
                return this.getModeStageSecond();
            default:
                return this.getModeOff();
        }
    };

    render() {
        return this.getCurrentMode();
    }
}

export default  GistListDeleteMenuDisplay;