import axios from "../api/axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Si estás usando React Router
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // Instancia de useNavigate para redirección

  // Función para obtener el token del localStorage al cargar la aplicación
  useEffect(() => {
    
      
        const cookies = Cookies.get();
        if (cookies.token) {
          setToken(cookies.token);
          console.log("Token recuperado de cookies: " + cookies.token);
        }
  
  
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      // const response = await fetch("http://localhost:3000/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(credentials),
      // });
      const response = await axios.post("/auth/login", credentials);

      if (response.status === 200) {
        const newToken = response.data.token;
        const user = response.data.user;
        
        console.log("Token guardado en localStorage:", newToken);
        // const usuario = {
        //   clientes_idClientes: user.clientes_idClientes,
        //   correo_electronico: user.correo_electronico,
        //   estados_idEstados: user.estados_idEstados,
        //   idUsuarios: user.idUsuarios,
        //   nombre_completo: user.nombre_completo,
        //   rol_idRol: user.rol_idRol,
        //   estados_idEstados: user.estados_idEstados,
        // }
        console.log("API Response:", user);
        // Guarda el token en localStorage
        window.localStorage.setItem("token", newToken);
        window.localStorage.setItem("userId", user.idUsuarios);
        window.localStorage.setItem("role_idRol", user.rol_idRol);
        window.localStorage.setItem("nombre", user.nombre_completo);
        console.log('Estan en local')
        // window.localStorage.setItem("user", usuario);

        // Actualiza el estado del token
        setToken(newToken);

        // Redirige a la página de roles
        if(parseInt(user.rol_idRol) === 1){
          navigate("/usuarios");
        }else if(parseInt(user.rol_idRol) === 2){
          navigate("/");
        }
      } else {
        console.log("No se puedo ingresar con credenciales");
        alert("Verifique sus credenciales");
      }
    } catch (error) {
      // Si el error es un 404, significa que el correo no fue encontrado
      if (error.response && error.response.status === 401) {
        console.error("error:", error.response.data.message);
        alert("Por favor verifique sus credenciales.");
      }

      // Otros errores
      else {
        console.error("Error al iniciar sesión:", error);
        alert(
          "Hubo un error al intentar iniciar sesión. Por favor intente más tarde."
        );
      }
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Elimina el token del localStorage
    localStorage.removeItem("token");

    // Actualiza el estado del token
    setToken(null);

    // Redirige a la página de inicio de sesión
    navigate("/usuarios");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
