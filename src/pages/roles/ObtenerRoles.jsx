import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const GetRoles = () => {
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [token, setToken] = useState(null); // Estado para almacenar el token

  useEffect(() => {
    const fetchRoles = async () => {
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`);
      setToken(tokenLocal); // Establecer el token en el estado

      try {
        // Realiza la solicitud GET para obtener los roles
        const response = await axios.get("/roles", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });

        // Establece los roles obtenidos en el estado
        const data = await response.data;
        setRoles(data);
        console.log("Roles obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };

    fetchRoles(); // Llamar a la función para obtener los roles
  }, []); // Se ejecuta una vez al cargar el componente

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Lista de Roles</h1>

      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/2">Nombre del Rol</h2>
        </div>
        <ul className="mt-4">
          {roles.map((role) => (
            <li key={role.idRol} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="mr-4 w-1/2">{role.nombre}</span>
              <div>
                <Link
                  to={`/roles/${role.idRol}`}
                  state={{ role }}
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

export default GetRoles;
