import React, { Component } from "react";
import 'react-tagsinput/react-tagsinput.css';
import {Container, Row, Col, FormControl, InputGroup, Button, Form, Modal} from "react-bootstrap"
import Navigation from "./components/Navigation"
import TagsInput from 'react-tagsinput'
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class MyOffers extends Component {
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
            jobs: [],
            workHours:'',
            username: localStorage.getItem("Username")

        }

        this.onShowDetails = this.onShowDetails.bind(this);
        this.handleCloseDetails = this.handleCloseDetails.bind(this);
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


    componentDidMount() {
        axios.post("http://localhost:8080/jobs/userOffers", {
            username: this.state.username
        }).then(response => {
            console.log(response);
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
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                            <ListGroup>
                                {this.state.jobs.map((job, i) => <ListGroupItem variant="dark" key={i}
                                                                                onClick={() => this.onShowDetails(job)}>
                                    <Col>
                                        Oferta #{i}: {job.title}
                                    </Col>
                                    <Col>
                                        Zarobki: {job.salary}zł
                                    </Col>
                                </ListGroupItem>)}
                            </ListGroup>
                    </Col>
                </Row>

                <Modal show={this.state.showDetails} onHide={this.handleCloseDetails}>
                    <Modal.Header closeButton>
                        {this.state.title}
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.description}
                        {this.state.salary}
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }

}
export default MyOffers;