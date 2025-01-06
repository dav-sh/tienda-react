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
    <div>
      <h1>Actualizar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div>
          <label>Rol:</label>
          <select
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
        <div>
          <label>Estado:</label>
          <select
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
        <div>
          <label>Cliente:</label>
          <input
            type="number"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ActualizarUsuario;
