import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='mb-4'>
            <Container>
                <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/transactions">Transacciones</Nav.Link>
                        <Nav.Link as={Link} to="/funds">Fondos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
