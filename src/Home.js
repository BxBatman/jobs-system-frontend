import React, { Component } from "react";
import {Container, Row, Col, FormControl, InputGroup, Button, Modal, Form, Navbar} from "react-bootstrap"
import Navigation from "./components/Navigation"
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from "axios";


class Home extends Component {

    constructor() {
        super();
        this.state = {
            jobs: [],
            showDetails: false,
            title: '',
            description: '',
            requirements: [],
            benefits: [],
            workType: '',
            workHours: '',
            salary: '',
            firstName: '',
            lastName: ''

        }
        this.onShowDetails = this.onShowDetails.bind(this);
        this.handleCloseDetails = this.handleCloseDetails.bind(this);
    }

    handleCloseDetails() {
        this.setState({ showDetails: false });
    }

    componentDidMount() {
        axios.get("http://localhost:8080/jobs", {
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

    render() {
        return (
           <Container fluid>
               <Row>
                   <Col><Navigation/></Col>
               </Row>
               <Row>
                   <Col md={{ span: 6, offset: 3 }}>
                       <InputGroup className="mb-3">
                           <FormControl
                               placeholder="Recipient's username"
                               aria-label="Recipient's username"
                               aria-describedby="basic-addon2"
                           />
                           <InputGroup.Append>
                               <Button variant="outline-secondary">Button</Button>
                           </InputGroup.Append>
                       </InputGroup>
                   </Col>
               </Row>
               <Row>
                  <Col md={{ span: 8, offset: 2 }}>
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
export default Home;