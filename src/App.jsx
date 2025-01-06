import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CrearUsuario from "./pages/usuarios/CrearUsuario";
import { AuthProvider } from "./context/AuthContext";
import ObtenerUsuarios from "./pages/usuarios/ObtenerUsuarios";
import ProtectedRoute from "./ProtectedRoute";
import ActualizarUsuario from "./pages/usuarios/ActualizarUsuario";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Rutas protegidas solo para OPERADOR */}
          <Route element={<ProtectedRoute allowedRoles={["OPERADOR"]} />}>
            <Route path="/usuarios" element={<ObtenerUsuarios />} />
            <Route path="/productos/:id" element={<h1>Productos</h1>} />
            <Route path="/estado" element={<h1>Productos</h1>} />
            <Route path="/estado/:id" element={<h1>Productos</h1>} />
            <Route path="/clientes" element={<h1>Clientes</h1>} />
            <Route path="/clientes/:id" element={<h1>update Clientes</h1>} />
            <Route path="/categoria/:id" element={<h1>update categoria</h1>} />
            <Route path="/usuario/:id" element={<ActualizarUsuario />} />
            <Route path="/usuarios/registrar" element={<CrearUsuario />} />
            <Route path="/usuarios" element={<h1>usuarios</h1>} />
            <Route path="/usuarios/:id" element={<h1>update usuarios</h1>} />
            <Route path="/roles" element={<h1>roles</h1>} />
          </Route>

          {/* Rutas protegidas para OPERADOR y USUARIO */}
          <Route
            element={<ProtectedRoute allowedRoles={["OPERADOR", "USUARIO"]} />}
          >
            <Route path="/categoria" element={<h1>categoria</h1>} />
            <Route path="/productos" element={<h1>Productos</h1>} />
            <Route path="/ordenes" element={<h1>ordenes</h1>} />
            <Route path="/ordenes/:id" element={<h1>update ordenes</h1>} />
            <Route path="/" element={<h1>Hello World</h1>} />
          </Route>

          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
