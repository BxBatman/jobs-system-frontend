import React, { Component } from "react";
import 'react-tagsinput/react-tagsinput.css';
import {Container, Row, Col, FormControl,InputGroup, Button, Form} from "react-bootstrap"
import Navigation from "./components/Navigation"
import TagsInput from 'react-tagsinput'
import axios from "axios";

class CreateOffer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requirements: [],
            benefits:[],
            title: '',
            description: '',
            workType: '',
            salary:'',
            workHours:'',
            username: localStorage.getItem("Username")

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
        e.preventDefault();
        this.sendCreateOffer();
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
                        <Form className="create-offer-form" onSubmit={this.onCreateOfferSubmit}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" id="title"  onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Work type</Form.Label>
                                <Form.Control as="select" id="workType" onChange={this.handleChange}>
                                    <option>Stationary</option>
                                    <option>Remote</option>
                                    <option>Partially stationary</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Work hours</Form.Label>
                                <Form.Control type="workHours" id="workHours" placeholder="eg. 8:00-16:00" onChange={this.handleChange}/>
                            </Form.Group>
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
                                <Form.Control as="textarea" rows="4" id="description" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Salary per month [brutto]</Form.Label>
                                <Form.Control type="salary" id="salary" placeholder="eg. 5 000" onChange={this.handleChange} />
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