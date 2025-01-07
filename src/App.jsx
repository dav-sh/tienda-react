import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CrearUsuario from "./pages/usuarios/CrearUsuario";
import { AuthProvider } from "./context/AuthContext";
import ObtenerUsuarios from "./pages/usuarios/ObtenerUsuarios";
import ProtectedRoute from "./ProtectedRoute";
import ActualizarUsuario from "./pages/usuarios/ActualizarUsuario";
import Navbar from "./components/Navbar";
import HomeUsuario from "./pages/HomeUsuario";
import GetProductos from "./pages/Productos/ObtenerProductos";
import RegistroProducto from "./pages/Productos/CrearProducto";
import ActualizarProducto from "./pages/Productos/ActualizarProducto";
import GetClientes from "./pages/clientes/ObtenerClientes";
import RegistroCliente from "./pages/clientes/CrearCliente";
import ActualizarCliente from "./pages/clientes/ActualizarCliente";
import GetRoles from "./pages/roles/ObtenerRoles";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AuthProvider>
        <Routes>
          {/* Rutas protegidas solo para OPERADOR */}
          <Route element={<ProtectedRoute allowedRoles={["OPERADOR"]} />}>
            <Route path="/usuarios" element={<ObtenerUsuarios />} />
            <Route path="/productos/:id" element={<ActualizarProducto/>} />
            <Route path="/productos/registrar" element={<RegistroProducto/>} />
            <Route path="/estado" element={<h1>Productos</h1>} />
            <Route path="/estado/:id" element={<h1>Productos</h1>} />
            <Route path="/clientes" element={<GetClientes/>} />
            <Route path="/clientes/registrar" element={<RegistroCliente/>} />
            <Route path="/cliente/:id" element={<ActualizarCliente/>} />
            <Route path="/categoria/:id" element={<h1>update categoria</h1>} />
            <Route path="/usuario/:id" element={<ActualizarUsuario />} />
            <Route path="/usuarios/registrar" element={<CrearUsuario />} />
            <Route path="/usuarios" element={<h1>usuarios</h1>} />
            <Route path="/usuarios/:id" element={<h1>update usuarios</h1>} />
            <Route path="/roles" element={<GetRoles/>} />
          </Route>

          {/* Rutas protegidas para OPERADOR y USUARIO */}
          <Route
            element={<ProtectedRoute allowedRoles={["OPERADOR", "USUARIO"]} />}
          >
            <Route path="/categoria" element={<h1>categoria</h1>} />
            <Route path="/productos" element={<GetProductos />} />
            <Route path="/ordenes" element={<h1>ordenes</h1>} />
            <Route path="/ordenes/:id" element={<h1>update ordenes</h1>} />
            <Route path="/" element={<HomeUsuario />} />
          </Route>

          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
