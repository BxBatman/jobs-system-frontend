import React, { Component } from "react";
import 'react-tagsinput/react-tagsinput.css';
import {Container, Row, Col, FormControl,InputGroup, Button, Form} from "react-bootstrap"
import Navigation from "./components/Navigation"
import TagsInput from 'react-tagsinput'

class CreateOffer extends Component {
    constructor(props) {
        super(props)
        this.state = {requirements: [], benefits:[]}
        this.handleChangeRequirements = this.handleChangeRequirements.bind(this)
        this.handleChangeBenefits = this.handleChangeBenefits.bind(this)
    }

    handleChangeRequirements(requirements) {
        this.setState({requirements})
    }

    handleChangeBenefits(benefits) {
        this.setState({benefits})
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col><Navigation/></Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form className="create-offer-form">
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="title" />
                            </Form.Group>
                            <Form.Group controlId="workType">
                                <Form.Label>Work type</Form.Label>
                                <Form.Control as="select">
                                    <option>Stationary</option>
                                    <option>Remote</option>
                                    <option>Partially stationary</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="workHours">
                                <Form.Label>Work hours</Form.Label>
                                <Form.Control type="workHours" placeholder="eg. 8:00-16:00" />
                            </Form.Group>
                            <Form.Group controlId="requirements">
                                <Form.Label>Requirements</Form.Label>
                                <TagsInput value={this.state.requirements} inputProps={{placeholder: "Add value "}}  onChange={this.handleChangeRequirements} />
                            </Form.Group>
                            <Form.Group controlId="benefits">
                                <Form.Label>Benefits</Form.Label>
                                <TagsInput value={this.state.benefits} inputProps={{placeholder: "Add value "}}  onChange={this.handleChangeBenefits} />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="4" />
                            </Form.Group>
                            <Form.Group controlId="salary">
                                <Form.Label>Salary per month [brutto]</Form.Label>
                                <Form.Control type="salary" placeholder="eg. 5 000" />
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