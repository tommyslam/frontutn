import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/info.css';

function Dudas() {
  return (
    <div className="contenedorcaja">
      <div className="">
        <h1>
          <span>S</span>ección de <span>I</span>nformación
        </h1>
        <h3>Esta sección contiene datos a tener en cuenta sobre la aplicación</h3> <br/>
        <p style={{ textAlign: 'left' }}>-Apenas se registra, sus datos de "valor hora" ingresan con el básico global de los empleados, luego el administrador es el encargado de cambiar su valor hora depende su experiencia, rol y valores adicionales.</p><br />
        <p style={{ textAlign: 'left' }}>-Para cambios de contraseña o email contactarse con el administrador, solicitar al programador el manejo de los datos de tal valor.</p> <br />
        <p style={{ textAlign: 'left' }}>-La aplicación está en desarrollo, proximamente se podrán ver datos correspondientes de cada usuario que facilitan el manejo de sus datos y seguridad.</p><br />
        <p style={{ textAlign: 'left' }}>-Dada la mención del punto anterior, proximamente enviaremos el resumen salarial mensual, y guardaremos un registro de todos los papeles en formato PDF.</p> <br/>
      </div>
    </div>
  );
}

export default Dudas;