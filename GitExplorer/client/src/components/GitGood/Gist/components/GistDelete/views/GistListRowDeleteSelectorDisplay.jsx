/**
 * Created by fish on 6/12/17.
 */
import React, {Component} from 'react';
import {GIST_DELETE_ACTION_TYPES as TYPES_DEL} from '../../actions/GitGistActionTypes';
/**
 * A component for display of a git user's info
 */
class GistListRowDeleteSelectorDisplay extends Component {

    activateDeleteModeButton = <button
        className='btn btn-block btn-warning'
        onClick={
            this.props.gistEditorDeleteMode === TYPES_DEL.TYPE_SET_MODE_DELETE_MENU_DISABLED ?
                this.props.onClickDeleteStage :
                this.props.onClickCancelStage
        }
    >
        {this.props.gistEditorDeleteMode === TYPES_DEL.TYPE_SET_MODE_DELETE_MENU_DISABLED ? 'Delete' : 'Cancel' }
    </button>;

    generateDisplay = (gist, isMarkedForDelete) => {
        switch (this.props.gistEditorDeleteMode) {
        case TYPES_DEL.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
            return this.generateDeleteInterfaceActive(gist, isMarkedForDelete);
        case TYPES_DEL.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
            return this.generateDeleteInterfaceLocked(gist, isMarkedForDelete);
        default:
            return this.generateDeleteInterfaceInactive();
        }
    };

    getBootstrapContextClass = (bootstrapItemType, onTrue, onFalse, booleanToggle, otherClasses = '') => {
        let ctx = booleanToggle ? onTrue : onFalse;
        return bootstrapItemType + ' ' + bootstrapItemType + '-' + ctx + ' ' + otherClasses;
    };

    getButtonClickHandlerDeleteListAddRemove = (isMarkedForDelete, gistId) => {

        isMarkedForDelete ?
            this.props.onDeleteListItemRemoveClickedList(gistId) :
            this.props.onDeleteListItemAddClicked(gistId);
    };

    generateDeleteInterfaceActive(gist, isGistMarkedForDeletion) {

        let that = this;
        return <div
            className={this.getBootstrapContextClass(
                'alert', 'danger', 'info', isGistMarkedForDeletion,
            )}>
            <h4>Delete gist?</h4>
            <button
                className={this.getBootstrapContextClass(
                    'btn', 'danger', 'warning', isGistMarkedForDeletion,
                    'btn-block',
                )}
                onClick={() => {
                    that.getButtonClickHandlerDeleteListAddRemove(isGistMarkedForDeletion, gist.id);
                }}
            >
                <h4><span className={
                    'glyphicon  glyphicon-' + (isGistMarkedForDeletion ? 'remove' : 'unchecked')
                }>
                </span></h4>
                <span>Delete?</span>
            </button>
        </div>;
    }

    generateDeleteInterfaceLocked(gist, isGistMarkedForDeletion) {
        return <div
            className={this.getBootstrapContextClass(
                'alert', 'danger', 'info', isGistMarkedForDeletion,
            )}>
            <h4>Delete gist?</h4>
            <button
                className={this.getBootstrapContextClass(
                    'btn', 'danger', 'success', isGistMarkedForDeletion,
                    'btn-block',
                )}
                disabled
            >
                <h4><span className={
                    'glyphicon  glyphicon-' + (isGistMarkedForDeletion ? 'remove' : 'unchecked')
                }>
                </span></h4>
                <span>{isGistMarkedForDeletion ?
                    <span>Will be deleted
                        <span className='glyphicon glyphicon-file'/>
                        <span className='glyphicon glyphicon-menu-right'/>
                        <span className='glyphicon glyphicon-trash'/>
                    </span> :
                    'Keep'}</span>
            </button>
        </div>;
    }

    generateDeleteInterfaceInactive() {
        return <div>
            {this.activateDeleteModeButton}
        </div>;
    }

    render() {
        let myGist = this.props.gist;
        let isMarkedForDelete = false;
        try {
            isMarkedForDelete = this.props.gistList[myGist.id].isMarkedForDelete || false;
        } catch (exc) {
            isMarkedForDelete = false;
        }
        return <div id={'gistListDeleteControl' + myGist.id}>
            {this.generateDisplay(myGist, isMarkedForDelete)}
        </div>;
    };

}

export default GistListRowDeleteSelectorDisplay;
