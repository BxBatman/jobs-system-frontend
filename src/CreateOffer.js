import React, { Component } from "react";
import 'react-tagsinput/react-tagsinput.css';
import {Container, Row, Col, FormControl,InputGroup, Button, Form} from "react-bootstrap"
import Navigation from "./components/Navigation"
import TagsInput from 'react-tagsinput'
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';


class CreateOffer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requirements: [],
            benefits:[],
            title: '',
            description: '',
            workType: 'Stationary',
            salary:'',
            workHours:'',
            username: localStorage.getItem("Username"),
            validated: false

        }
        this.handleChangeRequirements = this.handleChangeRequirements.bind(this)
        this.handleChangeBenefits = this.handleChangeBenefits.bind(this)
    }

    handleChangeRequirements(requirements) {
        this.setState({requirements})
    }

    handleChangeBenefits(benefits) {
        this.setState({benefits})
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    onCreateOfferSubmit = (e) => {

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({
            validated: true
        })

        if (form.checkValidity() === true) {
            e.preventDefault();
            this.sendCreateOffer();
        }

    }

    sendCreateOffer() {
        axios.post("http://localhost:8080/jobs/create", {
            title: this.state.title,
            description: this.state.description,
            requirements: this.state.requirements,
            benefits: this.state.benefits,
            workType: this.state.workType,
            workHours: this.state.workHours,
            salary: this.state.salary,
            username: this.state.username
        }).then(response => {
            this.props.history.push("/");
            NotificationManager.success("Job offer created !")
        }).catch(error => {
            console.log(error);
        })
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col><Navigation/></Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form noValidate validated={this.state.validated} className="create-offer-form" onSubmit={this.onCreateOfferSubmit}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" id="title"  onChange={this.handleChange} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter the title
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Work type</Form.Label>
                                <Form.Control as="select" id="workType" onChange={this.handleChange}>
                                    <option>Stationary</option>
                                    <option>Remote</option>
                                    <option>Partially stationary</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Work hours</Form.Label>
                                <Form.Control required type="workHours" id="workHours" placeholder="eg. 8:00-16:00" onChange={this.handleChange}/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter the hours
                                </Form.Control.Feedback>
                            </Form.Group>
                                </Form.Row>
                            <Form.Group>
                                <Form.Label>Requirements</Form.Label>
                                <TagsInput value={this.state.requirements} inputProps={{placeholder: "Add value "}}  onChange={this.handleChangeRequirements} />
                            </Form.Group>
                            <Form.Group controlId="benefits">
                                <Form.Label>Benefits</Form.Label>
                                <TagsInput value={this.state.benefits} inputProps={{placeholder: "Add value "}}  onChange={this.handleChangeBenefits} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control required as="textarea" rows="4" id="description" onChange={this.handleChange} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter description
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salary per month [brutto]</Form.Label>
                                <Form.Control required type="salary" id="salary" placeholder="eg. 5 000" onChange={this.handleChange} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter salary
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

}
export default CreateOffer;