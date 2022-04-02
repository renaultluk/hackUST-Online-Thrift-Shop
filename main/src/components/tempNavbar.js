import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';

export default function TempNavbar() {
    
    const { currentUser, loadingUser, logout } = useAuth();

    return (
    <>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">

            {currentUser && !loadingUser &&
                <Navbar.Text>
                    <a href={`/profile/${currentUser.uid}`}>
                        <Image
                        alt=""
                        src={currentUser?.photoURL}
                        width="30"
                        height="30"
                        />
                        {currentUser?.displayName}
                    </a> 
                    <Button variant="primary" onClick={logout}>Logout</Button>
                </Navbar.Text>
            }

            {!currentUser && !loadingUser &&
                <Navbar.Text>
                <Button variant="primary" href="/login">Login/Signup</Button>
                </Navbar.Text>

            }
        
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  )
}
