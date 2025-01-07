import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role_idRol");
  const token = localStorage.getItem("token");
  const [roleMenu, setRoleMenu] = useState([]);
  const { carrito } = useCarrito();

  const handleLogout = () => {
    localStorage.removeItem("role_idRol");
    localStorage.removeItem("nombre");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setRoleMenu([]);
    navigate("/login"); // Redirige al login
  };

  // Opciones del menú basadas en el rol
  const menuItems = {
    1: [
      { path: "/usuarios", label: "Usuarios" },
      { path: "/productos", label: "Productos" },
      { path: "/clientes", label: "Clientes" },
      { path: "/roles", label: "Roles" },
      { path: "/categoria", label: "Categoría" },
      { path: "/ordenes", label: "Órdenes" },
    ],
    2: [
      { path: "/categoria", label: "Categoría" },
      { path: "/productos", label: "Productos" },
      { path: "/ordenes", label: "Órdenes" },
    ],
  };

  useEffect(() => {
    if (role && token) {
      setRoleMenu(menuItems[role] || []);
    }
  }, [role, token]);

  return (
    <nav className="bg-blue-500 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/">
            <h3 className="text-2xl font-bold text-white underline">
              Mi Aplicación
            </h3>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {roleMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-white hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}
          {token && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-300"
            >
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Mostrar carrito solo para el rol de usuario (role 2) */}
        {role === "2" && (
          <div className="relative">
            <Link to="/carrito" className="text-white hover:text-blue-300">
              Carrito
              {carrito.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                  {carrito.length}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
