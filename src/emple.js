import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer.jsx";
import  NavEmple from "./components/navEmple.jsx";
import Home from "./components/home.jsx";
import VistaEmpleados from "./components/vistaEmpleado.jsx";
import Info from "./components/info.jsx";
import Dudas from "./components/dudas.jsx";

function Emple() {
  return (
    <>
      <NavEmple/>

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vistaEmpleado" element={<VistaEmpleados />} />
        <Route path="/info" element={<Info />} />
        <Route path="/dudas" element={<Dudas/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default Emple;