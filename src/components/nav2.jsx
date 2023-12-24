// Navbar.jsx
import React from "react";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbard() {

  return (
    <Navbar variant="tabs" defaultactivekey="/home" className="custom-navbar fixed-top" style={{ backgroundColor: 'rgb(98, 200, 166)' }}>
      <Navbar.Brand className="ml-auto">
        <img
          src="https://th.bing.com/th/id/OIP.exlZuTli8G4SEdlnKqsXTwHaE7?rs=1&pid=ImgDetMain"
          width="30"
          height="30"
          alt="Logo"
          className="custom-logo"
        />
      </Navbar.Brand>
      <Navbar.Brand as={Link} to="/">
        Empresa
      </Navbar.Brand>

    
      <Nav className="mr-auto">
      <Nav.Link as={Link} to="/login">
          Ingresa
        </Nav.Link>
        <Nav.Link as={Link} to="/register">
          Registrate
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Navbard;
