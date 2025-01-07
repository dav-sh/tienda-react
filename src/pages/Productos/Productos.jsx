import React from "react";
import { useNavigate } from "react-router-dom";
import GetProductos from '../Productos/ObtenerProductos'
import GetProductosUsuario from "./ProductosClientes";

const Productos = () => {
  const navigate = useNavigate();

  const idRol = parseInt(localStorage.getItem("role_idRol"), 10);
  console.log(idRol, "Estoy en ordenes");

  if (idRol === null) {
    navigate("/unauthorized");
  }

  return <>{idRol === 1 ? <GetProductos /> : <GetProductosUsuario />}</>;
};

export default Productos;
