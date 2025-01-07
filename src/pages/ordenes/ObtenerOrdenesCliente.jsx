import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const ObtenerOrdenesCliente = () => {
  const [token, setToken] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      console.log("GET órdenes");
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`);
      setToken(tokenLocal);

      try {
        const response = await axios.get("/ordenes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        const data = await response.data;
        setOrdenes(data); // Actualiza el estado con las órdenes obtenidas
        console.log("Órdenes obtenidas:", data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchOrdenes();
  }, []); // Ejecutar solo una vez al cargar el componente

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Lista de Órdenes</h1>
      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/6">ID Orden</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Cliente</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Fecha de Entrega</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/6">Total</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/6">Acción</h2>
        </div>
        <ul className="mt-4">
          {ordenes.map((orden) => (
            <li key={orden.idOrden} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="w-1/6">{orden.idOrden}</span>
              <span className="w-1/4">{orden.nombre_completo}</span>
              <span className="w-1/4">{new Date(orden.fecha_entrega).toLocaleDateString()}</span>
              <span className="w-1/6">${orden.total_orden.toFixed(2)}</span>
              <div className="w-1/6 flex gap-2">
                <Link
                  to={`/orden/${orden.idOrden}`}
                  state={{ orden }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Ver Detalles
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ObtenerOrdenesCliente;
