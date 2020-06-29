import React, {Component} from "react";
import {Navbar, Nav, Form, FormControl, Button, NavDropdown, Modal} from "react-bootstrap";
import axios from "axios";
import Image from "react-bootstrap/Image";
import logo from'./output-onlinepngtools.png'
class Navigation extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleCloseRegister = this.handleCloseRegister.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            showLogin: false,
            showRegister:false,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            loginEmail: localStorage.getItem("Username"),
            loginPassword: '',
            switchLogin: true

        };
    }

    handleCloseLogin() {
        this.setState({ showLogin: false });
    }

    handleLogin() {
        this.setState({ showLogin: true });
    }

    handleRegister() {
        this.setState({ showRegister: true });
    }

    handleCloseRegister() {
        this.setState({ showRegister: false });
    }

    handleLogout(){
        this.setState({
            switchLogin: true
        })
        localStorage.clear();
        window.location.reload();
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    componentDidMount() {
        if (localStorage.getItem("Authentication") != null) {
            this.setState({
                switchLogin: false
            })
        }
    }

    onUserCreateSubmit = (e) => {
        e.preventDefault();
        this.sendCreateUser();

    }

    sendCreateUser() {
        axios.post("http://localhost:8080/users/sign-up", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber
        }).then(response => {
            this.handleCloseRegister();
        }).catch(error => {
            console.log(error);
        })

    }

    onLoginSubmit =(e) => {
        e.preventDefault();
        this.login();
    }
    login() {
        axios.post("http://localhost:8080/authenticate", {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }).then(res => {
            localStorage.setItem("Authentication", res.data.jwttoken);
            localStorage.setItem("Role", res.data.role);
            localStorage.setItem("Username", res.data.email)
            this.setState({
                switchLogin: false
            })
            this.handleCloseLogin();
            window.location.reload();
    })}


    render() {
        return (
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                <Image src={logo} style={{color: 'white'}} fluid />
                <Nav className="mr-auto">
                    <Nav.Link href="/">Jobs</Nav.Link>
                    {this.state.switchLogin ? null : <Nav.Link href="/myOffers">My Offers</Nav.Link>}
                    {this.state.switchLogin ? null : <Nav.Link href="/createOffer">Create offer</Nav.Link>}
                </Nav>
                {this.state.switchLogin ? <NavDropdown className="navigation-dropdown" id="nav-dropdown" title="Log in">
                     <NavDropdown.Item id="nav-dropdown-item" onClick={this.handleLogin}>Log in</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.handleRegister}>Register</NavDropdown.Item>
                </NavDropdown> : <NavDropdown className="navigation-dropdown" id="nav-dropdown" title={this.state.loginEmail}>
                    <NavDropdown.Item id="nav-dropdown-item" onClick={this.handleLogout}>Log out</NavDropdown.Item>
                </NavDropdown> }




                <Modal show={this.state.showLogin} onHide={this.handleCloseLogin}>
                    <Modal.Header closeButton>
                        Log in
                    </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.onLoginSubmit}>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control id="loginEmail" type="text" placeholder="Enter email" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id="loginPassword" type="password" placeholder="Password" onChange={this.handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                </Modal>


                <Modal show={this.state.showRegister} onHide={this.handleCloseRegister}>
                    <Modal.Header closeButton>
                        Register
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onUserCreateSubmit}>

                            <Form.Group >
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control name="lastName" id="lastName" placeholder="Enter last name" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" id="email" placeholder="Enter email" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Navbar>


        );
    }
}
export default Navigation;