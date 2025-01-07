import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useCarrito } from "../../context/CarritoContext";
import { CarritoProvider } from "../../context/CarritoContext";

const GetProductosUsuario = () => {
  const [token, setToken] = useState(null);
  const [productos, setProductos] = useState([]);
  const { carrito, agregarAlCarrito } = useCarrito(); // Usamos el contexto para agregar al carrito
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      console.log("GET productos");
      const tokenLocal = window.localStorage.getItem("token");
      console.log(`Token recuperado de localStorage: ${tokenLocal}`);
      setToken(tokenLocal);

      try {
        const response = await axios.get("/productos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        const data = await response.data;
        setProductos(data); // Actualiza el estado con los productos obtenidos
        console.log("Productos obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []); // Ejecuta una vez cuando se monta el componente

  // Función para agregar producto al carrito
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Productos Disponibles</h1>

      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Nombre</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Marca</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Stock</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Precio</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Acción</h2>
        </div>
        <ul className="mt-4">
          {productos.map((producto) => (
            <li
              key={producto.idProductos}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span className="w-1/4">{producto.nombre}</span>
              <span className="w-1/4">{producto.marca}</span>
              <span className="w-1/4">{producto.stock}</span>
              <span className="w-1/4">${producto.precio.toFixed(2)}</span>
              <div className="w-1/4">
                <button
                  onClick={() => handleAgregarAlCarrito(producto)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Agregar al carrito
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GetProductosUsuario;
