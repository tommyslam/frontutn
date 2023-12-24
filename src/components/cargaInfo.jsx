import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cargainfo.css'

function CargaInfo() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState('');
  const [texto, setTexto] = useState("");
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [infoList, setInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const add = () => {
    if (!nombre || !fecha || !texto) {
      Swal.fire({
        icon: "error",
        title: "Campo incompleto",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    Axios.post("https://backutn.vercel.app/createText", {
      nombre: nombre,
      fecha: fecha,
      texto: texto
    })
      .then(() => {
        getInfo();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso!</strong>",
          html: "<i>El texto de <strong>" + nombre + "</strong> fue registrado con éxito!!!</i>",
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

  const updateInfo = () => {
    Axios.put("https://backutn.vercel.app/updateinfo", {
      id: id,
      nombre: nombre,
      fecha: fecha,
      texto: texto
    }).then(() => {
      getInfo();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>La información de <strong>" + nombre + "</strong> fue actualizada con éxito!!!</i>",
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
};

  const editarInfo = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setFecha(val.fecha);
    setTexto(val.texto);
    setId(val.id);
  };

  const getInfo = () => {
    Axios.get("https://backutn.vercel.app/info")
      .then((response) => {
        if (response.data) {
          const formattedData = response.data.map(item => {
            return {
              ...item,
              fecha: new Date(item.fecha).toISOString().split('T')[0] 
            };
          });

          setInfo(formattedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const limpiarCampos = () => {
    setNombre("");
    setFecha("");
    setTexto("");
    setId("");
    setEditar(false);
  };

  const deleteInfo = (val) => {
    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar el texto de <strong>" + val.nombre + "</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`https://backutn.vercel.app/deleteinfo/${val.id}`).then((res) => {
          getInfo();
          limpiarCampos();
          Swal.fire({
            icon: 'success',
            title: 'Texto eliminado.',
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el texto!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header" style={{ backgroundColor: 'rgb(98, 200, 166)'}}>
          Carga de novedades
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Asunto:</span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese el asunto"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">Fecha de carga:</span>
            <input
              type="date"
              onChange={(event) => {
                setFecha(event.target.value);
              }}
              className="form-control"
              value={fecha}
              placeholder="Ingrese una fecha"
              aria-label="Fecha"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">Desarrollo:</span>
            <input
              type="text"
              onChange={(event) => {
                setTexto(event.target.value);
              }}
              className="form-control"
              value={texto}
              placeholder="Ingrese un texto"
              aria-label="Texto"
              aria-describedby="basic-addon3"
            />
          </div>
        </div>

        <div className="card-footer text-muted">
          {editar ?
            <div>
              <button className='btn  m-2' onClick={updateInfo} style={{ backgroundColor: 'rgb(98, 200, 200)'}}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            : <button className='btn' style={{ backgroundColor: 'rgb(98, 200, 166)'}} onClick={add}>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Asunto</th>
          <th scope="col">Fecha</th>
          <th scope="col">Desarrollo</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {infoList.map((val, key) => (
          <tr key={val.id}>
            <td>{val.nombre}</td>
            <td>{val.fecha}</td>
            <td>{val.texto}</td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  onClick={() => {
                    editarInfo(val);
                  }}
                  className="btn btn-info"
                  style={{ backgroundColor: 'lightblue', borderRadius: '5px' }}
                >
                  Editar texto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteInfo(val);
                  }}
                  className="btn btn-danger"
                  style={{ backgroundColor: 'lightcoral', borderRadius: '5px' }}
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default CargaInfo;
