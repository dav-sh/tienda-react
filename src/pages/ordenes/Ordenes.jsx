import React from "react";
import { useNavigate } from "react-router-dom";
import ObtenerOrdenesCliente from "./ObtenerOrdenesCliente";
import OperadorOrdenes from "./ObtenerOrdenesOperador";

const Ordenes = () => {
  const navigate = useNavigate();

  const idRol = parseInt(localStorage.getItem("role_idRol"), 10);
  console.log(idRol, "Estoy en ordenes");

  if (idRol === null) {
    navigate("/unauthorized");
  }

  return <>{idRol === 1 ? <OperadorOrdenes /> : <ObtenerOrdenesCliente />}</>;
};

export default Ordenes;
