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
    <div>
      <h1>Lista de Usuarios</h1>
      <button onClick={handleAction}>Nuevo Usuario</button>
      <ul id={window.localStorage.getItem("userId")}>
        {usuarios.map((usuario) => (
          <li key={usuario.idUsuarios}>
            {usuario.nombre_completo} - {usuario.correo_electronico}
            <Link to={`/usuario/${usuario.idUsuarios}`} state={{ usuario }}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetUsuarios;
