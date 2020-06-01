import React, {Component} from "react";
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from "react-bootstrap";
class Navigation extends Component {

    render() {
        return (
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#jobs">Jobs</Nav.Link>
                </Nav>
                <NavDropdown className="navigation-dropdown" id="nav-dropdown" title="Log in">
                    <NavDropdown.Item id="nav-dropdown-item" href="login">Log in</NavDropdown.Item>
                    <NavDropdown.Item href="register">Register</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        );
    }
}
export default Navigation;