import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {useForm} from 'react-hook-form'
function LoginPage() {

  const { login } = useContext(AuthContext); // Obtiene la función setToken del contexto
  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
});



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(JSON.stringify(formData))
        login(formData)
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };





  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        Correo electronico
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        Contraseña
        <input type="password" name="password" value={formData.password} onChange={handleChange}/>
        <button>Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default LoginPage;
