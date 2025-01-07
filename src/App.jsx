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
import GetCategorias from "./pages/categorias/ObtenerCategorias";
import CrearCategoria from "./pages/categorias/CrearCategoria";
import ActualizarCategoria from "./pages/categorias/ActualizarCategoria";
import ObtenerOrdenesCliente from "./pages/ordenes/ObtenerOrdenesCliente";
import OrdenDetalles from "./pages/ordenes/OrdenDetalles";
import OperadorOrdenes from "./pages/ordenes/ObtenerOrdenesOperador";
import Ordenes from "./pages/ordenes/Ordenes";
import CarritoPage from "./pages/Carrito";
import { CarritoProvider } from "./context/CarritoContext";
import Productos from "./pages/Productos/Productos";
import FormularioOrden from "./pages/FormularioOrden";

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider> 
      <Navbar />
      <AuthProvider>
        <Routes>
          {/* Rutas protegidas solo para OPERADOR */}
          <Route element={<ProtectedRoute allowedRoles={["OPERADOR"]} />}>
            <Route path="/usuarios" element={<ObtenerUsuarios />} />
            <Route path="/productos/:id" element={<ActualizarProducto />} />
            <Route path="/productos/registrar" element={<RegistroProducto />} />
            <Route path="/estado" element={<h1>Productos</h1>} />
            <Route path="/estado/:id" element={<h1>Productos</h1>} />
            <Route path="/clientes" element={<GetClientes />} />
            <Route path="/clientes/registrar" element={<RegistroCliente />} />
            <Route path="/cliente/:id" element={<ActualizarCliente />} />
            <Route path="/categoria/registrar" element={<CrearCategoria />} />
            <Route path="/categoria/:id" element={<ActualizarCategoria />} />
            <Route path="/usuario/:id" element={<ActualizarUsuario />} />
            <Route path="/usuarios/registrar" element={<CrearUsuario />} />
            <Route path="/usuarios" element={<h1>usuarios</h1>} />
            <Route path="/usuarios/:id" element={<h1>update usuarios</h1>} />
            <Route path="/roles" element={<GetRoles/>} />
            {/* <Route path="/ordenes" element={<OperadorOrdenes />} /> */}
          </Route>

          {/* Rutas protegidas para OPERADOR y USUARIO */}
          <Route
            element={<ProtectedRoute allowedRoles={["OPERADOR", "USUARIO"]} />}
          >
            <Route path="/categoria" element={<GetCategorias />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/orden/:id" element={<OrdenDetalles />} />
            <Route path="/" element={<HomeUsuario />} />
            <Route path="/carrito" element={<CarritoPage />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={[ "USUARIO"]} />}
          >
            <Route path="/formulario-orden" element={<FormularioOrden />} />
          </Route>

          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
      </CarritoProvider> 
    </BrowserRouter>
  );
}

export default App;
