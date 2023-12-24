import React from "react";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/nav.css';

function NavEmple() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

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
      <Navbar.Brand as={Link} to="/home">
        Empresa
      </Navbar.Brand>

    
      <Nav className="mr-auto">
      <Nav.Link as={Link} to="/vistaEmpleado">
          Mi perfil
        </Nav.Link>
        <Nav.Link as={Link} to="/info">
          Novedades
        </Nav.Link>
        <Nav.Link as={Link} to="/dudas">
          Informacion
        </Nav.Link>
      </Nav>
    
      <Button variant="outline-danger" onClick={handleLogout}>
        Salir
      </Button>
    </Navbar>
  );
}

export default NavEmple;
