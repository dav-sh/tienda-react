import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const ObtenerOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await axios.get("/ordenes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setOrdenes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        setError("Hubo un problema al obtener las órdenes.");
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, []);

  const actualizarEstado = async (idOrden, nuevoEstado) => {
    const ordenSeleccionada = ordenes.find((orden) => orden.idOrden === idOrden);

    if (!ordenSeleccionada) {
      console.error("Orden no encontrada");
      return;
    }

    const ordenData = {
      usuarios_idUsuarios: ordenSeleccionada.usuarios_idUsuarios,
      estados_idEstados: nuevoEstado, // 1 para aprobado, puedes ajustarlo según el estado
      nombre_completo: ordenSeleccionada.nombre_completo,
      direccion: ordenSeleccionada.direccion,
      telefono: ordenSeleccionada.telefono,
      correo_electronico: ordenSeleccionada.correo_electronico,
      fecha_entrega: ordenSeleccionada.fecha_entrega,
      total_orden: ordenSeleccionada.total_orden,
      detalles_orden: ordenSeleccionada.ordenDetalles.map((detalle) => ({
        productos_idProductos: detalle.productos_idProductos,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        subtotal: detalle.subtotal,
      })),
    };

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put(
        `/ordenes/${idOrden}`,
        ordenData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Orden aprobada con éxito.");
        setOrdenes((prev) => prev.filter((orden) => orden.idOrden !== idOrden)); // Elimina la orden de la lista
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
      alert("Hubo un problema al aprobar la orden.");
    }
  };

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Lista de Ordenes Pendientes</h1>

      <div className="mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Cliente</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Correo Electrónico</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Total Orden</h2>
          <h2 className="text-xl font-bold text-gray-700 w-1/4">Acciones</h2>
        </div>
        <ul className="mt-4">
          {ordenes.map((orden) => (
            <li
              key={orden.idOrden}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span className="mr-4 w-1/4">{orden.nombre_completo}</span>
              <span className="w-1/4">{orden.correo_electronico}</span>
              <span className="w-1/4">{orden.total_orden.toFixed(2)}€</span>
              <div className="w-1/4 flex justify-between">
                <button
                  onClick={() => actualizarEstado(orden.idOrden, 1)} // Estado 1 para aprobar
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Aprobar
                </button>
                <Link
                  to={`/orden/${orden.idOrden}`}
                  state={{ orden }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Ver Detalles
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ObtenerOrdenes;
