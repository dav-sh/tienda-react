import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const GetUsuarios = () => {
  const [token, setToken] = useState(null)
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    rol_idRol: 2,
    estados_idEstados: 1,
    correo_electronico: "",
    nombre_completo: "",
    password: "",
    telefono: "",
    fecha_nacimiento: "",
    fecha_creacion: new Date().toISOString(),
    clientes_idClientes: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Cuando se crea el componente llamaos a esta funcion
  useEffect(() => {
    const fetchUsuarios = async () => {
      console.log("GET usuarios");
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`)
      setToken(tokenLocal)
      
      try {
        
        const response = await axios.get("http://localhost:3000/api/usuarios", {
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
  }, [token]); //Se sigue ejecutando hasta que token ready este listo y no sea false

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.idUsuarios}>
            {usuario.nombre_completo} - {usuario.correo_electronico}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetUsuarios;
