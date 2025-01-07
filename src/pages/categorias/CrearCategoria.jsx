import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CrearCategoria = () => {
  const [token, setToken] = useState(null);
  const [usuarios, setUsuarios] = useState([]); // Para obtener los usuarios
  const [estados, setEstados] = useState([]); // Para obtener los estados
  const navigate = useNavigate();  

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    usuarios_idUsuarios: 1,  // Esto debería ser seleccionado o pasado como parámetro
    estados_idEstados: 1, // Esto también debería ser seleccionado
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "usuarios_idUsuarios" || name === "estados_idEstados"  ? parseFloat(value) : value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);

    try {
      const response = await axios.post("/categoria", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Categoría creada con éxito", response.data);
      alert("Categoría creada con éxito", response.data);
      navigate("/categoria"); // Redirige al listado de categorías
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  // Al montar el componente, obtener los usuarios y estados
  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    console.log(`Token recuperado de localStorage: ${tokenLocal}`);
    setToken(tokenLocal);

    const fetchUsuarios = async () => {
      try {
        const usuariosResponse = await axios.get("/usuarios", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setUsuarios(usuariosResponse.data); // Guardar los usuarios
        console.log("Usuarios:", usuariosResponse.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    const fetchEstados = async () => {
      try {
        const estadosResponse = await axios.get("/estado", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setEstados(estadosResponse.data); // Guardar los estados
        console.log("Estados:", estadosResponse.data);
      } catch (error) {
        console.error("Error al obtener los estados:", error);
      }
    };

    fetchUsuarios();
    fetchEstados();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Crear Categoría</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de la Categoría:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="usuarios_idUsuarios" className="block text-gray-700 text-sm font-bold mb-2">
              Seleccionar Usuario:
            </label>
            <select
              id="usuarios_idUsuarios"
              name="usuarios_idUsuarios"
              value={formData.usuarios_idUsuarios}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {usuarios.map((usuario) => (
                <option key={usuario.idUsuarios} value={usuario.idUsuarios}>
                  {usuario.nombre_completo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="estados_idEstados" className="block text-gray-700 text-sm font-bold mb-2">
              Seleccionar Estado:
            </label>
            <select
              id="estados_idEstados"
              name="estados_idEstados"
              value={formData.estados_idEstados}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
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
              Crear Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearCategoria;
