import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Header.css'

const Header = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        const proceed = window.confirm("Are sure to log out?")
        if (proceed) {
            signOut(auth);
            localStorage.removeItem('accessToken');
        }
    }
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/home' className='header-logo fs-1'>Gamers Point</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
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
                                        <Nav.Link as={Link} to='/login'>
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