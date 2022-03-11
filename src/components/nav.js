import React from "react"
import { Navbar, Container, Nav, Button } from "react-bootstrap"

const MainNav = ({showModal}) => {

    return (

        <Navbar className="py-3" bg="dark" variant="dark">
            <Container className="">
                <Navbar.Brand href="#home">Shortly</Navbar.Brand>
                <Nav className="mw-auto">
                    <Button onClick={() => showModal(true)} variant="outline-info">Sign Up</Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MainNav