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
        }>Delete Gists <span className='glyphicon glyphicon-list'></span></button>;
    };

    getModeStageFirst() {
        return <div className='panel panel-info'>
            <div className='panel-body col-xs-7 col-sm-9'>
                {this.getSelectedGistCount()} gists selected
            </div>
            <div className='panel-footer col-xs-5 col-sm-3'>
                <div className='col-sm-6 col-xs-12'>
                    {this.getCancelButton()}
                </div>
                <div className='col-sm-6 col-xs-12'>
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

    getModeStageFinalPostMortem(stat) {
        stat = JSON.parse(JSON.stringify(stat));

        return <div className='alert alert-success fade in col-xs-12'>
            <div className='col-xs-8 col-sm-10'>
                <h4 className='alert-link'>Results</h4>
                <div>
                    <span>Gists deleted: {stat['totals'].gistsProcessed} </span>
                    <span className='badge'>Successes {stat['totals'].successes}
                        / {stat['totals'].gistsProcessed}</span>
                    <span className='badge'>Failures {stat['totals'].failures}
                        / {stat['totals'].gistsProcessed}</span>
                </div>
            </div>
            <div className='col-xs-4 col-sm-2'>
                <button
                    className='btn btn-success btn-block'
                    onClick={this.props.onClickDeleteStage}
                >Ok
                </button>
            </div>
        </div>;
    }

    getModeStageFinalProcessing = () => {
        return <div className='alert alert-info fade in col-xs-12'>
            <h4>Working, please wait</h4>
            <div className="progress-bar progress-bar-striped active col-xs-12" role="progressbar"
                aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                processing...
            </div>
        </div>;
    };

    getCurrentMode = () => {
        switch (this.props.gistEditorDeleteMode) {
        case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED:
            return this.getModeOff();
        case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
            return this.getModeStageFirst();
        case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
            return this.getModeStageSecond();
        case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL:
            return (this.props.deleteResultStatistics ) ?
                this.getModeStageFinalPostMortem(this.props.deleteResultStatistics) :
                this.getModeStageFinalProcessing();
        default:
            return this.getModeOff();
        }
    };

    render() {
        return this.getCurrentMode();
    }
}

export default  GistListDeleteMenuDisplay;