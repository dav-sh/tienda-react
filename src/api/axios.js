import axios from 'axios';
axios.defaults.withCredentials = true;  // Esto asegura que las cookies se envíen con cada solicitud

axios.defaults.baseURL = 'http://localhost:3000/api';  // Configura la URL base de tu API
