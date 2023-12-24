import React from "react";
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'

function Home() {
    const [nombre,setNombre] = useState("");
  const [email,setEmail] = useState();
  const [pais,setPais] = useState("");




  const agregar = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      email: email,
      password: password
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!</strong>",
          html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado con éxito!!!</i>",
          icon: 'success',
          timer: 3000
        });
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
        })
      });
  };


  return (
    <div className="contenedorcaja">
      <div className="login-container">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} id="registroForm">
          <label className="ancho" htmlFor="nombre">
            NOMBRE:
          </label>
          <input type="text" id="nombre" name="nombre" required />

          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input type="number" value={edad}
           onChange={(event)=>{
            setEdad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

          <label className="ancho" htmlFor="password">
            PASSWORD:
          </label>
          <input type="password" id="password" name="password" required />

          <button type="submit" onClick={agregar}>Enviar</button>
        </form>

        <div id="mensajeExito"></div>
        <div id="mensajeError"></div>
      </div>
    </div>
  );
  }
  
  export default Home;