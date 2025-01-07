import React, { createContext, useContext, useState } from "react";

// Creamos el contexto para el carrito
const CarritoContext = createContext();

// El provider del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);  // Estado local del carrito

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Proporcionamos el contexto para usar en otros componentes
  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para acceder al carrito en otros componentes
export const useCarrito = () => {
  return useContext(CarritoContext);
};
