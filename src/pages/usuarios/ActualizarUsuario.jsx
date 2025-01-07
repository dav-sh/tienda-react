import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const ActualizarUsuario = () => {
  const { id } = useParams(); // Obtiene el ID del usuario desde la URL
  const location = useLocation(); // Recupera el state desde la navegación
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const usuario = location.state?.usuario; // Datos del usuario pasado en el state

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(usuario?.nombre_completo || "");
  const [email, setEmail] = useState(usuario?.correo_electronico || "");
  const [password, setPassword] = useState(""); // Contraseñas no deben ser precargadas
  const [telefono, setTelefono] = useState(usuario?.telefono || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(usuario?.fecha_nacimiento || "");
  const [rol, setRol] = useState(usuario?.rol_idRol || "");
  const [estado, setEstado] = useState(usuario?.estados_idEstados || "");
  const [cliente, setCliente] = useState(usuario?.clientes_idClientes || "");

  // Estados para almacenar roles y estados
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);

  // Obtener token local
  const tokenLocal = window.localStorage.getItem("token");

  // Efecto para cargar roles y estados desde el backend
  useEffect(() => {
    const fetchRolesYEstados = async () => {
      try {
        const rolesResponse = await axios.get("/roles", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setRoles(rolesResponse.data);

        const estadosResponse = await axios.get("/estado", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setEstados(estadosResponse.data);
      } catch (error) {
        console.error("Error al cargar roles y estados:", error);
      }
    };

    fetchRolesYEstados();
  }, [tokenLocal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud al backend
      const response = await axios.put(
        `/usuarios/${id}`,
        {
          nombre_completo: nombre,
          correo_electronico: email,
          password: password || usuario?.password, // Si no se cambió, envía la existente
          telefono,
          fecha_nacimiento: fechaNacimiento,
          rol_idRol: rol,
          estados_idEstados: estado,
          clientes_idClientes: cliente,
          fecha_creacion: usuario?.fecha_creacion, // Reutiliza la fecha original
        },
        {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Usuario actualizado con éxito");
        navigate("/usuarios"); // Redirigir a la lista de usuarios
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un problema al actualizar el usuario");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Actualizar Usuario</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre Completo:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaNacimiento">
            Fecha de Nacimiento:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rol">
            Rol:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="" disabled>
              Seleccione un rol
            </option>
            {roles.map((r) => (
              <option key={r.idRol} value={r.idRol}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
            Estado:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="" disabled>
              Seleccione un estado
            </option>
            {estados.map((e) => (
              <option key={e.idEstados} value={e.idEstados}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cliente">
            Cliente:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cliente"
            type="number"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
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

export default ActualizarUsuario;
