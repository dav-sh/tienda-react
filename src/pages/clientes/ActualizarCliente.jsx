import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const ActualizarCliente = () => {
  const { id } = useParams(); // Obtiene el ID del cliente desde la URL
  const location = useLocation(); // Recupera el state desde la navegación
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const cliente = location.state?.cliente; // Datos del cliente pasado en el state

  // Estados para los campos del formulario
  const [razonSocial, setRazonSocial] = useState(cliente?.razon_social || "");
  const [nombreComercial, setNombreComercial] = useState(cliente?.nombre_comercial || "");
  const [direccionEntrega, setDireccionEntrega] = useState(cliente?.direccion_entrega || "");
  const [telefono, setTelefono] = useState(cliente?.telefono || "");
  const [email, setEmail] = useState(cliente?.email || "");

  // Obtener token local
  const tokenLocal = window.localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud al backend para actualizar los datos del cliente
      const response = await axios.put(
        `/clientes/${id}`,
        {
          razon_social: razonSocial,
          nombre_comercial: nombreComercial,
          direccion_entrega: direccionEntrega,
          telefono,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Cliente actualizado con éxito");
        navigate("/clientes"); // Redirigir a la lista de clientes
      }
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      alert("Hubo un problema al actualizar el cliente");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Actualizar Cliente</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="razonSocial">
            Razón Social:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="razonSocial"
            type="text"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreComercial">
            Nombre Comercial:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombreComercial"
            type="text"
            value={nombreComercial}
            onChange={(e) => setNombreComercial(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccionEntrega">
            Dirección de Entrega:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="direccionEntrega"
            type="text"
            value={direccionEntrega}
            onChange={(e) => setDireccionEntrega(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
            Teléfono:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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

export default ActualizarCliente;
