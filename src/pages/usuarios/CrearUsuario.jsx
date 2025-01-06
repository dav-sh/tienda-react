import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RegistroUsuario = () => {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();  
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
      const response = await axios.post("/usuarios", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Usuario registrado con éxito", response.data);
      alert("Usuario registrado con éxito", response.data)
      navigate("/usuarios"); 
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  // Cuando se crea el componente, llamamos a esta función
  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    console.log(`Token recuperado de localStorage: ${tokenLocal}`);
    setToken(tokenLocal);

    const fetchRoles = async () => {
      try {
        const rolesResponse = await axios.get("/roles", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setRoles(rolesResponse.data); // Suponiendo que la respuesta es un array de roles
        console.log("Roles:", rolesResponse.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };

    fetchRoles();
  }, []); // Solo se ejecuta una vez al montar el componente

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

      {/* Agregando el selector de roles */}
      <label>
        Rol:
        <select
          name="rol_idRol"
          value={formData.rol_idRol}
          onChange={handleChange}
          required
        >
          {roles.map((role) => (
            <option key={role.idRol} value={role.idRol}>
              {role.nombre}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroUsuario;
