import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
const GetUsuarios = () => {
  const [token, setToken] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate()
  //Cuando se crea el componente llamaos a esta funcion

  const handleAction=()=>{
    navigate('/usuarios/registrar')
  }

  useEffect(() => {
    const fetchUsuarios = async () => {
      console.log("GET usuarios");
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`);
      setToken(tokenLocal);

      try {
        const response = await axios.get("/usuarios", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        const data = await response.data;
        setUsuarios(data); // Actualiza el estado con los usuarios obtenidos
        console.log("Usuarios obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchUsuarios();
  }, []); //Se sigue ejecutando hasta que token ready este listo y no sea false

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Lista de Usuarios</h1>

      <button
        onClick={handleAction}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Nuevo Usuario
      </button>

      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/2">Nombre</h2> 
          <h2 className="text-xl font-bold text-gray-700 w-1/2">Correo Electrónico</h2> 
        </div>
        <ul className="mt-4">
          {usuarios.map((usuario) => (
            <li key={usuario.idUsuarios} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="mr-4 w-1/2">{usuario.nombre_completo}</span> 
              <span className="w-1/2">{usuario.correo_electronico}</span>
              <div>
                <Link
                  to={`/usuario/${usuario.idUsuarios}`}
                  state={{ usuario }}
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
export default GetUsuarios;
