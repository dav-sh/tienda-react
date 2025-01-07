import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "../../api/axios";

const OrdenDetalles = () => {
  const { id } = useParams(); // Obtener el ID de la orden desde la URL
  const location = useLocation(); // Recibir datos pasados desde el estado
  const [orden, setOrden] = useState(location.state?.orden || null); // Usar datos pasados o null inicialmente
  const [loading, setLoading] = useState(!orden); // Mostrar loading si no se recibió estado inicial
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchOrdenDetalles = async () => {
      if (orden) return; // Si ya se tiene la orden, no hace falta hacer la solicitud

      console.log(`Obteniendo detalles de la orden ID: ${id}`);
      const tokenLocal = window.localStorage.getItem("token");
      setToken(tokenLocal);

      try {
        const response = await axios.get(`/ordenes/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        const data = await response.data;
        setOrden(data);
        setLoading(false);
        console.log("Detalles de la orden obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener los detalles de la orden:", error);
      }
    };

    fetchOrdenDetalles();
  }, [id, orden]);

  if (loading) {
    return <p className="text-center text-blue-500">Cargando detalles de la orden...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Detalles de la Orden</h1>

      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Información del Cliente</h2>
        <p><strong>Nombre:</strong> {orden.nombre_completo}</p>
        <p><strong>Dirección:</strong> {orden.direccion}</p>
        <p><strong>Teléfono:</strong> {orden.telefono}</p>
        <p><strong>Correo Electrónico:</strong> {orden.correo_electronico}</p>
        <p><strong>Fecha de Entrega:</strong> {new Date(orden.fecha_entrega).toLocaleDateString()}</p>
        <p><strong>Total de la Orden:</strong> ${orden.total_orden.toFixed(2)}</p>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Productos de la Orden</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID Producto</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2">Precio Unitario</th>
              <th className="border border-gray-300 px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.ordenDetalles.map((detalle) => (
              <tr key={detalle.idOrdenDetalles}>
                <td className="border border-gray-300 px-4 py-2">{detalle.productos_idProductos}</td>
                <td className="border border-gray-300 px-4 py-2">{detalle.cantidad}</td>
                <td className="border border-gray-300 px-4 py-2">${detalle.precio.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">${detalle.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdenDetalles;
