import React, { useEffect, useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import axios from "./api/axios";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userRolId, setUserRolId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    const roleId = parseInt(window.localStorage.getItem("role_idRol"));
    setToken(tokenLocal)
    setUserRolId(roleId)
    const fetchRoles = async () => {
      try {
        const rolesResponse = await axios.get("/roles", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setRoles(rolesResponse.data); // Suponiendo que la respuesta es un array de roles
        console.log("Roles:", rolesResponse.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  roles.map((role) => console.log(role.idRol, userRolId));
  const userRole = roles.find((role) => role.idRol === parseInt(userRolId));
  console.log(userRole, "Este es mi rol actual");
  //  Obtén el rol del usuario

  // Si el rol del usuario no está permitido, redirige a una página de acceso denegado o login
  if (!userRole || !allowedRoles.includes(userRole.nombre)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children? children : <Outlet/>;
};

export default ProtectedRoute;
