import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";


const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    try {
      const response = await fetch("https://backutn.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password,
          rol: "empleado",
          edad,
          pais,
          experiencia,
          telefono,
        }),
      });
      const result = await response.json();
      if (result.success) {
        showSuccessMessage();
      } else {
        showErrorMessage(result.message);
      }
    } catch (error) {
      showErrorMessage(error.message);
    }
  };
  const validateFields = () => {
    if (!nombre || !apellido || !email || !password || !edad || !pais || !experiencia || !telefono) {
      showErrorMessage("Por favor, completa todos los campos.");
      return false;
    }
    return true;
  };

  const showSuccessMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Por favor, inicia sesión.",
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/login");
    });
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error durante el registro",
      text: message,
    });
  };

  return (
    <Card className="custom-card reg" >
      <Card.Body>
        <div className="custom-form-container">
          <Form className="custom-form">
            <Form.Group controlId="formBasicNombre">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Nombre:</Form.Label>
              <Form.Control
                onChange={(event) => setNombre(event.target.value)}
                placeholder="ingrese su Nombre"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formBasicApellido">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Apellido:</Form.Label>
              <Form.Control
                onChange={(event) => setApellido(event.target.value)}
                placeholder="ingrese su Apellido"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Email:</Form.Label>
              <Form.Control
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ingrese su Email"
                type="email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Password:</Form.Label>
              <Form.Control
                onChange={(event) => setPassword(event.target.value)}
                placeholder="ingrese su Password"
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEdad">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Edad:</Form.Label>
              <Form.Control
                onChange={(event) => setEdad(event.target.value)}
                placeholder="ingrese su Edad"
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPais">
              <Form.Label style={{ textAlign: "start", display: "block" }}>País:</Form.Label>
              <Form.Control
                onChange={(event) => setPais(event.target.value)}
                placeholder="ingrese su País"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formBasicExperiencia">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Experiencia:</Form.Label>
              <Form.Control
                onChange={(event) => setExperiencia(event.target.value)}
                placeholder="ingrese sus años de experiencia"
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="formBasicTelefono">
              <Form.Label style={{ textAlign: "start", display: "block" }}>Teléfono:</Form.Label>
              <Form.Control
                onChange={(event) => setTelefono(event.target.value)}
                placeholder="ingrese su Teléfono"
                type="text"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleRegister}
              className="custom-button"
            >
              Registrarse
            </Button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Register;