import React, { useState } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate } from "react-router-dom"; 
import { useCarrito } from "../context/CarritoContext"; 

const FormularioOrden = () => {
  const { carrito } = useCarrito(); 
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState(null);
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const navigate = useNavigate(); 

  
  const totalOrden = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  const detallesOrden = carrito.map((producto) => ({
    productos_idProductos: producto.productos_idProductos,
    cantidad: producto.cantidad,
    precio: producto.precio,
    subtotal: producto.precio * producto.cantidad,
  }));

  
  const handleRegistrarCompra = async (e) => {
    console.log("Holaaaaaaaaaaaaaaaaaaa")
    e.preventDefault();
    const tokenLocal = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("userId"); 

    const data = {
      usuarios_idUsuarios: usuarioId,
      estados_idEstados: 1, 
      nombre_completo: nombreCompleto,
      direccion,
      telefono,
      correo_electronico: correoElectronico,
      fecha_entrega: fechaEntrega,
      total_orden: totalOrden,
      detalles_orden: detallesOrden,
    };
    console.log(data, 'En formulario')
    try {
        
      const response = await axios.post("/ordenes", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenLocal}`,
        },
      });
      console.log("Orden creada con éxito:", response.data);
      navigate("/confirmacion-compra"); 
    } catch (error) {
      console.error("Error al registrar la compra:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Formulario de Compra</h1>

      <form onSubmit={handleRegistrarCompra}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Nombre Completo</label>
          <input
            type="text"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(Integer.parseInt(e.target.value))}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Fecha de Entrega</label>
          <input
            type="date"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-400 transition duration-200"
          >
            Registrar Compra
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioOrden;
