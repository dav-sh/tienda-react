import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const ActualizarProducto = () => {
  const { id } = useParams(); // ID del producto desde la URL
  const location = useLocation(); // Datos del producto desde la navegación
  const navigate = useNavigate(); // Para redirigir tras actualizar
  const producto = location.state?.producto; // Datos del producto pasado por state

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    categoriaProductos_idCategoriaProductos: producto?.categoriaProductos_idCategoriaProductos || 1,
    usuarios_idUsuarios: producto?.usuarios_idUsuarios || 1,
    estados_idEstados: producto?.estados_idEstados || 1,
    nombre: producto?.nombre || "",
    marca: producto?.marca || "",
    codigo: producto?.codigo || "",
    stock: producto?.stock || 0,
    precio: producto?.precio || 0.0,
    fecha_creacion: producto?.fecha_creacion || new Date().toISOString(),
    foto: producto?.foto || null,
  });

  const [categorias, setCategorias] = useState([]); // Lista de categorías
  const tokenLocal = window.localStorage.getItem("token");

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categoria", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, [tokenLocal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stock" || name === "precio" || name === "categoriaProductos_idCategoriaProductos"  ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.put(
        `http://localhost:3000/api/productos/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Producto actualizado con éxito");
        navigate("/productos"); // Redirige a la lista de productos
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un problema al actualizar el producto.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Actualizar Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del Producto:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="marca" className="block text-gray-700 text-sm font-bold mb-2">
              Marca:
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="codigo" className="block text-gray-700 text-sm font-bold mb-2">
              Código:
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="precio" className="block text-gray-700 text-sm font-bold mb-2">
              Precio:
            </label>
            <input
              type="number"
              step="0.01"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="categoriaProductos_idCategoriaProductos" className="block text-gray-700 text-sm font-bold mb-2">
              Categoría:
            </label>
            <select
              id="categoriaProductos_idCategoriaProductos"
              name="categoriaProductos_idCategoriaProductos"
              value={formData.categoriaProductos_idCategoriaProductos}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {categorias.map((categoria) => (
                <option key={categoria.idCategoriaProductos} value={categoria.idCategoriaProductos}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default ActualizarProducto;
