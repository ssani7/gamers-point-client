import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        const proceed = window.confirm("Are sure to log out?")
        if (proceed) {
            signOut(auth)
        }
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/home'>React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/products/all'>Inventory</Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                user ? <>
                                    <Nav.Link as={Link} to='/manageProducts'>
                                        Manage Inventory
                                    </Nav.Link>
                                    <Nav.Link as={Link} to='/addProducts'>
                                        Add Products
                                    </Nav.Link>
                                    <Nav.Link as={Link} to='/myProducts'>
                                        My Products
                                    </Nav.Link>
                                    <Nav.Link onClick={handleSignOut}>
                                        Sign out
                                    </Nav.Link>
                                </> :
                                    <>
                                        <Nav.Link as={Link} to='/register'>
                                            Sign In
                                        </Nav.Link>
                                    </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;