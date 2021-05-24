import * as React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


/* HOOK REACT EXAMPLE */
const Navbah = (props: NavbahProps) => {
    //     <nav className="navbar">
    //     <h4>Recipe Register</h4>

    //     <span className="dark-blue-text">
    //             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
    //                 <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
    //             </svg>
    //         </span>
    //     <NavLink to={`/login`}>Login</NavLink>
    //     <NavLink to={`/register`}>Register</NavLink>
    // </nav>
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Recipe Registry</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavLink to={`/addrecipe`} className='text-dark'>Add Recipe</NavLink>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <NavLink to={`/login`} className='mx-3'>Login</NavLink>
                    <NavLink to={`/register`}>Register</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

interface NavbahProps { }

export default Navbah;