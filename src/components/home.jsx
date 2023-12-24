import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';

function Home() {
  return (
    <div className="contenedorcaja">
      <div className="caja1">
        <h1>
          Hola, bienvenido a <span>M</span>i <span>E</span>mpresa
        </h1>
        <p>
          Has ingresado a la pagina de empleados de la empresa. Aqui vas a poder ver tus datos personales y las novedades que postean los administradores cada mes asi te mantienes informado. Bienvenido!
        </p>
        <div className="contenedorimg">
          <button className="btn imgcaja1">
            <img
              src="https://seeklogo.com/images/T/twitter-x-logo-101C7D2420-seeklogo.com.png?v=638258862800000000"
              alt=""
            />
          </button>
          <button className="btn imgcaja1">
            <img
              src="https://cdn.icon-icons.com/icons2/1233/PNG/512/1492718764-instagram_83597.png"
              alt=""
            />
          </button>
          <button className="btn imgcaja1">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384046.png" alt="" />
          </button>
          <button className="btn imgcaja1">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25305.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;