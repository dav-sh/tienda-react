import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RegistroProducto = () => {
  const [token, setToken] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    categoriaProductos_idCategoriaProductos: 1,
    usuarios_idUsuarios: 1,
    estados_idEstados: 1,
    nombre: "",
    marca: "",
    codigo: "",
    stock: 0,
    precio: 0.0,
    fecha_creacion: new Date().toISOString(),
    foto: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "stock" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      const response = await axios.post("http://localhost:3000/api/productos", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Producto registrado con éxito:", response.data);
      alert("Producto registrado con éxito");
      navigate("/productos");
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert("Hubo un error al registrar el producto. Verifica los datos enviados.");
    }
  };

  useEffect(() => {
    const tokenLocal = window.localStorage.getItem("token");
    setToken(tokenLocal);

    const fetchCategorias = async () => {
      try {
        const categoriasResponse = await axios.get("http://localhost:3000/api/categoria", {
          headers: {
            Authorization: `Bearer ${tokenLocal}`,
          },
        });
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Registro de Producto</h2>
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
              Registrar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroProducto;
