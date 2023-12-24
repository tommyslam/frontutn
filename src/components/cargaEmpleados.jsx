import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

function CargaEmpleados() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState("");
  const [rol, setRol] = useState("");
  const [experiencia, setExperiencia] = useState('');
  const [valor_hora, setValorHora] = useState('');
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [empleadosList, setEmpleados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  useEffect(() => {
    getEmpleados();
  }, []);

  const add = () => {
    if (!nombre || !apellido || !edad || !pais || !rol || !experiencia || !valor_hora || !telefono) {
      Swal.fire({
        icon: "error",
        title: "Campo incompleto",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      apellido:apellido,
      edad: edad,
      pais: pais,
      rol: rol,
      experiencia: experiencia,
      valor_hora: valor_hora,
      telefono: telefono, 
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
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        })
      });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      pais: pais,
      rol: rol,
      experiencia: experiencia,
      valor_hora: valor_hora,
      telefono: telefono 
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con éxito!!!</i>",
        icon: 'success',
        timer: 3000
      })
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const deleteEmple = (val) => {
    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: '',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then((res) => {
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            icon: 'success',
            title: val.nombre + ' fue eliminado.',
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const limpiarCampos = () => {
    setExperiencia("");
    setNombre("");
    setApellido("");
    setRol("");
    setEdad("");
    setPais("");
    setValorHora("");
    setId("");
    setEditar(false);
    setTelefono("");
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setApellido(val.apellido);
    setEdad(val.edad);
    setRol(val.rol);
    setPais(val.pais);
    setExperiencia(val.experiencia);
    setValorHora(val.valor_hora);
    setId(val.id);
    setTelefono(val.telefono);

  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setEditar(true); 
  };
  
  return (
    <>
      {mostrarFormulario && (
        <div className="container">
          <div className="card text-center">
            <div className="card-header" style={{ backgroundColor: 'rgb(98, 200, 166)'}}>Datos del empleado</div>
            <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido:</span>
            <input
              type="text"
              onChange={(event) => {
                setApellido(event.target.value);
              }}
              className="form-control"
              value={apellido}
              placeholder="Ingrese un apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input
              type="number"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese una edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese un país"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Teléfono:</span>
  <input
    type="tel"
    value={telefono}
    onChange={(event) => {
      setTelefono(event.target.value);
    }}
    className="form-control"
    placeholder="Ingrese un número de teléfono"
    aria-label="Teléfono"
    aria-describedby="basic-addon1"
  />
</div>

          <div className="input-group mb-3">
  <label className="input-group-text" htmlFor="rol">Rol:</label>
  <select
    className="form-select"
    id="rol"
    value={rol}
    onChange={(event) => {
      setRol(event.target.value);
    }}
  >
    <option value="empleado">Empleado</option>
    <option value="administrador">Administrador</option>
  </select>
</div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Experiencia:</span>
            <input
              type="number"
              value={experiencia}
              onChange={(event) => {
                setExperiencia(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la experiencia"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Valor Hora:</span>
  <input
    type="text"
    value={valor_hora}
    onChange={(event) => {
      setValorHora(event.target.value);
    }}
    className="form-control"
    placeholder="Ingrese el valor por hora"
    aria-label="Valor Hora"
    aria-describedby="basic-addon1"
  />
</div>
        </div>
        <div className="card-footer text-muted">
              {editar ? (
                <div>
                  <button className="btn btn- m-2" style={{ backgroundColor: 'rgb(98, 200, 166)'}} onClick={() => {
                        update();
                        toggleFormulario(false);
                      }}>
                    Actualizar
                  </button>
                  <button
                      type="button"
                      onClick={() => {
                        toggleFormulario(false);
                        limpiarCampos();
                      }}
                      className="btn btn- m-2" style={{ backgroundColor: 'rgb(98, 200, 166)'}}>Cancelar</button>
                </div>
              ) : (
                <button className="btn btn-success" onClick={add}>
                  Registrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Rol</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Telefono</th>
            <th scope="col">Valor Hora</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => (
            <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.apellido}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.rol}</td>
                <td>{val.experiencia}</td>
                <td>{val.telefono}</td>
                <td>{val.valor_hora}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                      type="button"
                      onClick={() => {
                        toggleFormulario();
                        editarEmpleado(val);
                      }}
                      className="btn btn-info" style={{ backgroundColor: 'rgb(98, 200, 166)'}}>Editar</button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteEmple(val);
                      }}
                      className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
                </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CargaEmpleados;
