import React, {Component} from 'react';
import logo from '../../img/Fish_icon_grey.svg';
import '../../css/Header/Header.css';
import '../../css/App.css';

class ElfHeader extends Component {

    render() {
        return (
            <div className='app-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <h2>Welcome to Jefferson's Git Explorer</h2>
            </div>
        );
    }
}

export default ElfHeader;
