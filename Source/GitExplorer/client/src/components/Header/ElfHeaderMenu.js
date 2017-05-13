/**
 * Created by fish on 5/13/17.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";


class ElfHeaderMenu extends Component {

    render() {
        return (
            <ul className="elf-header-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/get-foo">BarFoo</Link></li>
                <li><Link to="/get-numbers">Numbers</Link></li>
                <li><Link to="/get-gist">Gists</Link></li>
            </ul>
        );
    }
}

export default ElfHeaderMenu;


