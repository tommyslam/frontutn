import React from 'react';
import App2 from "../App.js";
import User from "../user.js";
import Emple from '../emple.js';

function parseJwt(token) {
  if (!token) return null;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')
  );

  return JSON.parse(jsonPayload);
}

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  return token && parseJwt(token).exp * 9000 > Date.now();
}

const Main = () => {
  const [tokenValid, setTokenValid] = React.useState(isTokenValid());
  const currentUser = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    const checkTokenValidity = () => {
      setTokenValid(isTokenValid());
    };

    const tokenInterval = setInterval(checkTokenValidity, 9000);

    return () => clearInterval(tokenInterval);
  }, []);

  return (
    <>
      {tokenValid ? (
        <>
          <div>
            Navegando como: {currentUser.nombre} - Rol: {currentUser.rol}
          </div>
          {currentUser.rol === "administrador" ? <App2 /> : <Emple />}
        </>
      ) : (
        <User />
      )}
    </>
  );
};

export default Main;
