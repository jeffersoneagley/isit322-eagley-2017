/**
 * Created by fish on 5/28/17.
 */
import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class BsMenuBar extends Component {

    render() {
        const navbarInstance = (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to='/'><NavItem>Git Explorer</NavItem></LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to='/'><NavItem eventKey={1}>Home</NavItem></LinkContainer>
                        <NavDropdown eventKey={3} title='React Basics' id='basic-nav-dropdown'>
                            <LinkContainer to='get-foo'><MenuItem eventKey={3.1}>
                                Foo API test
                            </MenuItem></LinkContainer>
                            <LinkContainer to='get-numbers'><MenuItem eventKey={3.2}>
                                SmallNumbers
                            </MenuItem></LinkContainer>
                        </NavDropdown>
                        <LinkContainer to='get-gist'><NavItem eventKey={2}>Gists</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
        return (
            <div>
                {navbarInstance}
            </div>
        );
    }
}

export default BsMenuBar;
