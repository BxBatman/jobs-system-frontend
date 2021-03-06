import React, { Component } from "react";
import 'react-tagsinput/react-tagsinput.css';
import {Container, Row, Col, FormControl, InputGroup, Button, Form, Modal} from "react-bootstrap"
import Navigation from "./components/Navigation"
import TagsInput from 'react-tagsinput'
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import salary from "./components/salary.png";
import Image from "react-bootstrap/Image";

class ManageJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requirements: [],
            benefits:[],
            title: '',
            description: '',
            showDetails: false,
            workType: '',
            salary:'',
            role: localStorage.getItem("Role"),
            jobs: [],
            workHours:''
        }

        this.onShowDetails = this.onShowDetails.bind(this);
        this.handleCloseDetails = this.handleCloseDetails.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    handleCloseDetails() {
        this.setState({ showDetails: false });
    }



    onShowDetails = (i) => {
        axios.get("http://localhost:8080/jobs/" + i.id, {
        }).then(response => {
            console.log(response);
            this.setState({
                title: response.data.title,
                description: response.data.description,
                requirements: response.data.requirements,
                benefits: response.data.benefits,
                workType: response.data.workType,
                workHours: response.data.workHours,
                salary: response.data.salary,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                showDetails: true
            })

        }).catch(error => console.log(error))
    };

    onDelete = (i) => {
        axios.delete("http://localhost:8080/jobs/" + i.id, {
        }).then(response => {
            window.location.reload();
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        if (this.state.role !== "ROLE_ADMIN") {
            this.props.history.push("/");
        }
        axios.get("http://localhost:8080/jobs", {}).then(response => {
            const newJobs = response.data.map(c=>{
                return {
                    id: c.id,
                    title: c.title,
                    salary: c.salary
                }
            });

            const newState = Object.assign({}, this.state,{
                jobs: newJobs,
            });

            this.setState(newState);

        }).catch(error => console.log(error))
    };


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col><Navigation/></Col>
                </Row>
                <Row style={{marginTop: '40px'}}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <ListGroup>
                            {this.state.jobs.map((job, i) =>
                                <ListGroupItem variant="dark" key={i}>

                                    <Row>
                                        <Col style={{textAlign: "left"}}>Oferta #{job.id}: {job.title}</Col>
                                        <Col md="auto"><Image src={salary} style={{color: 'white'}} fluid /> {job.salary}zł</Col>
                                        <Col xs lg="3">
                                            <Button className="pull-right" bsSize="small" onClick={() => this.onShowDetails(job)}
                                                    bsStyle="primary">Details</Button>
                                            <Button className="pull-right"bsSize="small" onClick={() => this.onDelete(job)}
                                                    bsStyle="danger" style={{backgroundColor: 'red', marginLeft: '10px'}}>Delete</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>)}
                        </ListGroup>
                    </Col>
                </Row>

                <Modal show={this.state.showDetails} onHide={this.handleCloseDetails}>
                    <Modal.Header closeButton>
                        {this.state.title}
                    </Modal.Header>
                    <Modal.Body>
                        Author:
                        <Row style={{marginBottom: '20px'}}><Col>{this.state.firstName} {this.state.lastName}</Col>
                        </Row>
                        Description:
                        <Row style={{marginBottom: '20px', textAlign: 'justify'}}>
                            <Col>{this.state.description}</Col>
                        </Row>

                        Work Type:
                        <Row style={{marginBottom: '20px', textAlign: 'justify'}}>
                            <Col>{this.state.workType}</Col>
                        </Row>

                        Work Hours:
                        <Row style={{marginBottom: '20px', textAlign: 'justify'}}>
                            <Col>{this.state.workHours}</Col>
                        </Row>

                        Requirements:
                        {this.state.requirements.map((requirement, i) =>
                            <Col md="auto" style={{textAlign: "left"}}>- {requirement}</Col>
                        )}
                        <Row style={{marginTop: '20px'}}></Row>
                        Benefits:
                        {this.state.benefits.map((benefit, i) =>
                            <Col md="auto" style={{textAlign: "left"}}>- {benefit}</Col>
                        )}
                        <Row style={{marginTop: '20px'}}>
                            <Col>Email: {this.state.email}</Col>
                        </Row>

                        <Row style={{marginTop: '20px'}}>
                            <Col>Phone number: {this.state.phoneNumber}</Col>
                        </Row>

                        <Row style={{marginTop: '20px'}}>
                            <Col>Salary: {this.state.salary}<Image src={salary} style={{color: 'white'}} /></Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }

}
export default ManageJobs;