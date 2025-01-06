import axios from "../api/axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Si estás usando React Router

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // Instancia de useNavigate para redirección

  // Función para obtener el token del localStorage al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Tenia guardado esto en localstorage: ", storedToken);
    if (storedToken) {
      setToken(storedToken);
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
      const response = await axios.post("/auth/login",
        credentials
      );

      if (response.status === 200) {
        const newToken = response.data.token; // Suponiendo que la API devuelve el token en 'token'
        const user = response.data.user; // Suponiendo que la API devuelve el token en 'token'
        console.log("API Response:", response.data);
        console.log("Token guardado en localStorage:", newToken);

        // Guarda el token en localStorage
        window.localStorage.setItem("token", newToken);
        window.localStorage.setItem("user", user);

        // Actualiza el estado del token
        setToken(newToken);


        // Redirige a la página de roles
        navigate("/usuarios");
      } else {
        console.log("No se puedo ingreasr por credenciales");
        alert("message Verifique sus credenciales");
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

export const useAuth = () => {
  return useContext(AuthContext);
};
