import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbard from "./components/nav2";
import Login from "./components/login";
import Register from "./components/register";
import BodyMain from "./components/bodymain";
import './css/user.css';

function User() {
  return (
    <>
        <Navbard/>
        <BodyMain/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default User;
