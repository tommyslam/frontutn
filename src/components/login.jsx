import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css";
import Swal from "sweetalert2"; 
import App2 from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backutn.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setLoginSuccessful(true);
        navigate("/home");
      } else {
        setLoginSuccessful(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Credenciales incorrectas",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      {loginSuccessful ? (
        <App2 />
      ) : (
<Card className="custom-card">
  <Card.Body>
    <Form className="custom-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ textAlign: "left", display: "block" }}>Email:</Form.Label>
        <Form.Control
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ingrese su Email"
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ textAlign: "left", display: "block" }}>Password:</Form.Label>
        <Form.Control
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="ingrese su Password"
          type="password"
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={handleLogin}
        className="custom-button"
      >
        Ingresar
      </Button>
    </Form>
  </Card.Body>
</Card>
      )}
    </>
  );
};

export default Login;
