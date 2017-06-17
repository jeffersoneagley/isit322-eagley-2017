/**
 * Created by fish on 5/28/17.
 */
import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class BsMenuBar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to='/'><NavItem>Git Explorer</NavItem></LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title='React Basics' id='basic-nav-dropdown'>
                            <LinkContainer to='get-foo'><MenuItem>
                                Foo API test
                            </MenuItem></LinkContainer>
                            <LinkContainer to='get-numbers'><MenuItem>
                                SmallNumbers
                            </MenuItem></LinkContainer>
                        </NavDropdown>
                        <LinkContainer to='get-user'><NavItem>User profile</NavItem></LinkContainer>
                        <LinkContainer to='get-gist'><NavItem>Gists</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default BsMenuBar;
