import React, { Component } from "react";
import {Container, Row, Col, FormControl,InputGroup, Button} from "react-bootstrap"
import Navigation from "./components/Navigation"


class Home extends Component {

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
           </Container>
        );
    }
}
export default Home;