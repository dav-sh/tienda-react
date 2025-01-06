import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CrearUsuario from "./pages/usuarios/CrearUsuario";
import { AuthProvider } from "./context/AuthContext";
import ObtenerUsuarios from "./pages/usuarios/ObtenerUsuarios";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={ <ProtectedRoute/> }>

          </Route>

          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usuarios" element={<ObtenerUsuarios />} />
          <Route path="/usuarios/:id" element={<ObtenerUsuarios />} />
          <Route path="/usuarios/registrar" element={<CrearUsuario />} />
          <Route path="/productos" element={<h1>Productos</h1>} />
          <Route path="/productos/:id" element={<h1>Productos</h1>} />
          <Route path="/estado" element={<h1>Productos</h1>} />
          <Route path="/estado/:id" element={<h1>Productos</h1>} />
          <Route path="/clientes" element={<h1>Clientes</h1>} />
          <Route path="/clientes/:id" element={<h1>update Clientes</h1>} />
          <Route path="/categoria" element={<h1>categoria</h1>} />
          <Route path="/categoria/:id" element={<h1>update categoria</h1>} />
          <Route path="/usuarios" element={<h1>usuarios</h1>} />
          <Route path="/usuarios/:id" element={<h1>update usuarios</h1>} />
          <Route path="/ordenes" element={<h1>ordenes</h1>} />
          <Route path="/ordenes/:id" element={<h1>update ordenes</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
