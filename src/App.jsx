// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './Firebase/Firebase_auth';
import Home from './Component/Home.jsx';
import DetalleSupermercado from './Component/DetalleSupermercado.jsx';
import Login from './Component/Auth/Login.jsx';
import Header from './Component/Header.jsx';
import Footer from './Component/Footer.jsx';
import CrearCuenta from './Component/Auth/CrearCuenta.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar autenticación

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Actualiza el estado de autenticación
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/crearCuenta" element={<CrearCuenta />} />
        <Route path="/" element={<Home />} />
        <Route path="/detalle-supermercado/:id" element={<DetalleSupermercado />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;