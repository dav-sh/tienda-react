import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const ActualizarCategoria = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    usuarioId: "",
    estadoId: "",
  });

  // Estados para almacenar las listas de usuarios y estados
  const [usuarios, setUsuarios] = useState([]);
  const [estados, setEstados] = useState([]);

  // Obtener token local
  const tokenLocal = window.localStorage.getItem("token");

  // Cargar las listas de usuarios y estados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener usuarios
        const usuariosResponse = await axios.get("/usuarios", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setUsuarios(usuariosResponse.data);

        // Obtener estados
        const estadosResponse = await axios.get("/estado", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setEstados(estadosResponse.data);
      } catch (error) {
        console.error("Error al cargar usuarios o estados:", error);
      }
    };

    fetchData();
  }, [tokenLocal]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "usuarioId" || name === "estadoId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud al backend
      const response = await axios.put(
        `/categoria/${id}`,
        {
          nombre: formData.nombre,
          usuarios_idUsuarios: formData.usuarioId,
          estados_idEstados: formData.estadoId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Categoría actualizada con éxito");
        navigate("/categoria"); // Redirigir a la lista de categorías
      }
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Hubo un problema al actualizar la categoría");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Actualizar Categoría</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre de la Categoría:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa el nombre de la categoría"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuarioId">
            Usuario Responsable:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="usuarioId"
            name="usuarioId"
            value={formData.usuarioId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccione un usuario
            </option>
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuarios} value={usuario.idUsuarios}>
                {usuario.nombre_completo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estadoId">
            Estado de la Categoría:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="estadoId"
            name="estadoId"
            value={formData.estadoId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Seleccione un estado
            </option>
            {estados.map((estado) => (
              <option key={estado.idEstados} value={estado.idEstados}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarCategoria;
