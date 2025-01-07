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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="correo_electronico" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="nombre_completo" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre Completo:
            </label>
            <input
              type="text"
              id="nombre_completo"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="fecha_nacimiento" className="block text-gray-700 text-sm font-bold mb-2">
              Fecha de Nacimiento:
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="rol_idRol" className="block text-gray-700 text-sm font-bold mb-2">
              Rol:
            </label>
            <select
              id="rol_idRol"
              name="rol_idRol"
              value={formData.rol_idRol}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {roles.map((role) => (
                <option key={role.idRol} value={role.idRol}>
                  {role.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default RegistroUsuario;
