import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

const RegistroUsuario = () => {
  const [token, setToken] = useState(null)
  const [roles, setRoles] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      // const response = await fetch("http://localhost:3000/api/usuarios", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" ,
      //       "Authorization": `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await axios.post("/usuarios", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Usuario registrado con exito", response.data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };


  //Cuando se crea el componente llamaos a esta funcion
  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    console.log(`Token recuperado de localStorage: ${tokenLocal}`)
    setToken(tokenLocal)
    const fetchRoles = async () => {
        try {
        const response = await axios.get("/roles",{
          Authorization: {
            token: `Bearer ${tokenLocal}`
          }
        });
        const data = await response.data
        setRoles(data); // Suponiendo que la respuesta es un array de roles
        console.log(data+
          "Roles"
        );
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };

    fetchRoles();
  }, []); //Se sigue ejecutando hasta que token ready este listo y no sea false

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo Electrónico:
        <input
          type="email"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Nombre Completo:
        <input
          type="text"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroUsuario;
