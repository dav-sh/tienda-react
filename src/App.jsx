import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/productos" element={<h1>Productos</h1>} />
        <Route path="/clientes" element={<h1>Clientes</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
