import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useCarrito } from "../context/CarritoContext";

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate(); // Inicializar el hook de navegación

  // Función que maneja la redirección al formulario
  const handleFinalizarCompra = () => {
    // Redirigir al formulario de orden
    navigate("/formulario-orden");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Mi Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-lg text-gray-500">El carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-2">
            {carrito.map((producto, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow-md"
              >
                <span className="text-lg text-blue-600">{producto.nombre}</span>
                <button
                  onClick={() => eliminarDelCarrito(producto.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-200"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={vaciarCarrito}
              className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-400 transition duration-200"
            >
              Vaciar carrito
            </button>
            {/* Botón de finalizar compra con la redirección */}
            <button
              onClick={handleFinalizarCompra} // Llamamos a la función para redirigir
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-400 transition duration-200"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
