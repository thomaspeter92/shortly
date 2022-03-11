import React from "react";
import { Form,Container,Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";


const Footer = () => {


    return (

        <footer className="bg-dark text-light mt-5">
            <Container style={{textAlign: 'left'}} className="py-5">
                <Row>
                    <Col>
                        <h5 style={{textAlign: 'center'}}>About Us</h5>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                        </p>
                    </Col>
                    <Col>
                        <h5 style={{textAlign: 'center'}}>Contact</h5>
                        <p>
                            <FontAwesomeIcon icon={faPhone}/>
                            <span className="mx-2">+8210123456789</span>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className="mx-2">info@shortly.com </span>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <span className="mx-2">123 Shortly Street, Gangnam-gu, Seoul</span>
                        </p>
                        
                    </Col>
                    <Col>
                        <h5 style={{textAlign: 'center'}}>Subscribe</h5>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter your email to subscribe to our newsletter</Form.Label>
                                <Form.Control  type="text" placeholder="Enter you email"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check type="checkbox" label="Agree to privacy policy"/>
                            </Form.Group>
                            <Form.Group>
                                <Button className="px-5" variant="outline-info">Join</Button>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="bg-info py-2">
                <Row>
                    <p className="m-0">&#169; Shortly 2022 by Thomas Buckley</p>
                </Row>
            </Container>
        </footer>

    )
}

export default Footer