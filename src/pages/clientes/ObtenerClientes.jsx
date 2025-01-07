import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const GetClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  const handleAction = () => {
    navigate('/clientes/registrar'); // Redirige a la página para registrar clientes
  };

  useEffect(() => {
    const fetchClientes = async () => {
      console.log("GET clientes");
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`);

      try {
        const response = await axios.get("/clientes", { // Cambia a la URL correcta
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        const data = await response.data;
        setClientes(data); // Actualiza el estado con los clientes obtenidos
        console.log("Clientes obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Lista de Clientes</h1>

      <button
        onClick={handleAction}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Nuevo Cliente
      </button>

      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/5">Razón Social</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/5">Nombre Comercial</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/5">Dirección</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/5">Teléfono</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/5">Email</h2>
        </div>
        <ul className="mt-4">
          {clientes.map((cliente) => (
            <li key={cliente.idClientes} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="mr-4 w-1/5">{cliente.razon_social}</span>
              <span className="mr-4 w-1/5">{cliente.nombre_comercial}</span>
              <span className="mr-4 w-1/5">{cliente.direccion_entrega}</span>
              <span className="mr-4 w-1/5">{cliente.telefono}</span>
              <span className="mr-4 w-1/5">{cliente.email}</span>
              <div>
                <Link
                  to={`/cliente/${cliente.idClientes}`}
                  state={{ cliente }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetClientes;
