import React, { Component } from "react";
import {Container, Row, Col, FormControl, InputGroup, Button, Modal, Form, Navbar} from "react-bootstrap"
import Navigation from "./components/Navigation"
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import salary from "./components/salary.png"
import no from "./components/no.png"
import Image from "react-bootstrap/Image";


class Home extends Component {

    constructor() {
        super();
        this.state = {
            jobs: [],
            showDetails: false,
            showMustLogIn: false,
            title: '',
            description: '',
            requirements: [],
            benefits: [],
            workType: '',
            workHours: '',
            salary: '',
            firstName: '',
            lastName: '',
            isLogged: localStorage.getItem("Username") !== ''
        }
        this.onShowDetails = this.onShowDetails.bind(this);
        this.handleCloseDetails = this.handleCloseDetails.bind(this);
        this.handleCloseMustLogIn = this.handleCloseMustLogIn.bind(this);
    }

    handleCloseDetails() {
        this.setState({ showDetails: false });
    }

    handleCloseMustLogIn() {
        this.setState({ showMustLogIn: false });
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

        }).catch(error => {
            this.setState({
                showMustLogIn: true
            })
        })
    };

    render() {


        return (
           <Container fluid>
               <Row>
                   <Col><Navigation/></Col>
               </Row>
               <Row>
                   <Col  md={{ span: 8, offset: 2 }}>
                       <Jumbotron style={{marginTop: '60px', color:'#1b1e21', backgroundColor: '#c6c8ca'}} >
                           <h1>Welcome to job site!</h1>
                           <p style={{textAlign: 'center'}}>
                               You can browse to find your dream job or post your job offer.
                           </p>
                           {this.state.isLogged ? null : <p style={{textAlign: 'center'}}>
                               Just register ! It's simple and free !
                           </p> }
                       </Jumbotron>
                   </Col>
               </Row>
               <Row>
                   <Col md={{ span: 6, offset: 3 }}>
                       {this.state.isLogged ? null : <InputGroup className="mb-3">
                           <FormControl
                               placeholder="Recipient's username"
                               aria-label="Recipient's username"
                               aria-describedby="basic-addon2"
                           />
                           <InputGroup.Append>
                               <Button variant="outline-secondary">Button</Button>
                           </InputGroup.Append>
                       </InputGroup>
                       }
                   </Col>
               </Row>

               <Row>
                  <Col md={{ span: 8, offset: 2 }}>
                   <ListGroup>
                       {this.state.jobs.map((job, i) => <ListGroupItem variant="dark" key={i}

                                                                       onClick={() => this.onShowDetails(job)}>
                         <Row>
                          <Col style={{textAlign: "left"}}><Image src={no} style={{color: 'white'}} fluid />  {job.id}: {job.title}</Col>
                             <Col md="auto"><Image src={salary} style={{color: 'white'}} fluid /></Col>
                           <Col xs lg="2">{job.salary} zł</Col>
                         </Row>
                       </ListGroupItem>)}
                           </ListGroup>
                  </Col>
               </Row>


               <Modal size="lg" style={{fontSize: '20px',minHeight: '200px'}} show={this.state.showDetails} onHide={this.handleCloseDetails}>
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
                        <Col>Salary: {this.state.salary}<Image src={salary} style={{color: 'white'}} /></Col>
                       </Row>
                   </Modal.Body>
               </Modal>



               <Modal show={this.state.showMustLogIn} onHide={this.handleCloseMustLogIn}>
                   <Modal.Header closeButton>
                       <Modal.Title>No access !</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>Log in or create account to see this offer. It's fast and easy !</Modal.Body>
                   <Modal.Footer>
                       <Button variant="primary" onClick={this.handleCloseMustLogIn}>
                           Ok
                       </Button>
                   </Modal.Footer>
               </Modal>

           </Container>
        );
    }
}
export default Home;