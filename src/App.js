import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer.jsx";
import CustomNavbar from "./components/Nav.jsx";
import Home from "./components/home.jsx";
import CargaEmpleados from "./components/cargaEmpleados";
import VistaEmpleados from "./components/vistaEmpleado.jsx";
import CargaInfo from "./components/cargaInfo.jsx";
import Info from "./components/info.jsx";
import Dudas from "./components/dudas.jsx";

function App2() {
  return (
    <>
      <CustomNavbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cargaEmpleados" element={<CargaEmpleados />} />
        <Route path="/vistaEmpleado" element={<VistaEmpleados />} />
        <Route path="/cargaInfo" element={<CargaInfo />} />
        <Route path="/info" element={<Info />} />
        <Route path="/dudas" element={<Dudas />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App2;
