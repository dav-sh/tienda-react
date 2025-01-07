import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const GetCategorias = () => {
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [token, setToken] = useState(null); // Estado para almacenar el token

  useEffect(() => {
    const fetchCategorias = async () => {
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`);
      setToken(tokenLocal); // Establecer el token en el estado

      try {
        // Realiza la solicitud GET para obtener las categorías
        const response = await axios.get("/categoria", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });

        // Establece las categorías obtenidas en el estado
        const data = await response.data;
        setCategorias(data);
        console.log("Categorías obtenidas:", data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias(); // Llamar a la función para obtener las categorías
  }, []); // Se ejecuta una vez al cargar el componente

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Lista de Categorías</h1>

      {/* Botón Nueva Categoría */}
      <div className="flex justify-start mb-4">
        <Link
          to="/categoria/registrar"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Nueva Categoría
        </Link>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/2">Nombre de la Categoría</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/2">Fecha de Creación</h2>
        </div>
        <ul className="mt-4">
          {categorias.map((categoria) => (
            <li key={categoria.idCategoriaProductos} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="mr-4 w-1/2">{categoria.nombre}</span>
              <span className="w-1/2">{new Date(categoria.fecha_creacion).toLocaleDateString()}</span>
              <div>
                <Link
                  to={`/categoria/${categoria.idCategoriaProductos}`}
                  state={{ categoria }}
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

export default GetCategorias;
