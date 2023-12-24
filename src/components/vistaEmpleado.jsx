// VistaEmpleados.js

import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";

import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/vistaEmpleados.css';  // Importa el archivo CSS externo

function VistaEmpleados() {
  const [empleadosList, setEmpleados] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const getEmpleados = useCallback(() => {
    Axios.get("https://backutn.vercel.app/empleados")
      .then((response) => {
        const filteredEmpleados = response.data.filter(
          (empleado) => empleado.id === currentUser.id
        );
        setEmpleados(filteredEmpleados);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser.id]);

  useEffect(() => {
    getEmpleados();
  }, [getEmpleados]);

  return (
    <div className="container center">
      <Card className="body">
        <Card.Header className="header">Datos de mi perfil</Card.Header>
        <Card.Body>
          {empleadosList.map((val) => (
            <Card key={val.id} className="custom-cards" style={{ width: '400px' }}>
              <Card.Body>
                <Card.Title>{val.nombre} {val.apellido}</Card.Title>
                <Card.Text className="cardtext" style={{ width: '400px' }}>
                  <strong><span>Edad:</span></strong> {val.edad}<br />
                  <strong><span>País:</span></strong> {val.pais}<br />
                  <strong><span>Rol:</span></strong> {val.rol}<br />
                  <strong><span>Experiencia:</span></strong> {val.experiencia}<br />
                  <strong><span>Teléfono:</span></strong> {val.telefono}<br />
                  <strong><span>Valor Hora:</span></strong> {val.valor_hora}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default VistaEmpleados;
