import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RegistroCliente = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    razon_social: "",
    nombre_comercial: "",
    direccion_entrega: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      const response = await axios.post("/clientes", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cliente registrado con éxito", response.data);
      alert("Cliente registrado con éxito");
      navigate("/clientes"); // Redirige a la lista de clientes
    } catch (error) {
      console.error("Error al registrar el cliente:", error);
    }
  };

  // Cuando se crea el componente, llamamos a esta función
  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    console.log(`Token recuperado de localStorage: ${tokenLocal}`);
    setToken(tokenLocal);
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Registro Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="razon_social" className="block text-gray-700 text-sm font-bold mb-2">
              Razón Social:
            </label>
            <input
              type="text"
              id="razon_social"
              name="razon_social"
              value={formData.razon_social}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="nombre_comercial" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre Comercial:
            </label>
            <input
              type="text"
              id="nombre_comercial"
              name="nombre_comercial"
              value={formData.nombre_comercial}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="direccion_entrega" className="block text-gray-700 text-sm font-bold mb-2">
              Dirección de Entrega:
            </label>
            <input
              type="text"
              id="direccion_entrega"
              name="direccion_entrega"
              value={formData.direccion_entrega}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono:
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroCliente;
