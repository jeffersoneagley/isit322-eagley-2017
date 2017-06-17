/**
 * Created by fish on 5/28/17.
 */
import React, {Component} from 'react';
import logo from '../../img/Fish_icon_grey.svg';
import '../../css/Header/Header.css';
// import '../../css/App.css';

class FishLogo extends Component {
    render() {
        return (
            <div className='col-xs-2'>
                <img src={logo} className='App-logo' alt='logo'/>
            </div>
        );
    }
}

export default FishLogo;
