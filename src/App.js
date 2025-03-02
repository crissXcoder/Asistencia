// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencias, setAsistencias] = useState({});

  // Simulación de cargar datos desde un archivo JSON
  useEffect(() => {
    // Esto después se reemplazaría con una llamada a API o fetch
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    const asistenciasGuardadas = localStorage.getItem('asistencias');
    
    if (estudiantesGuardados) {
      setEstudiantes(JSON.parse(estudiantesGuardados));
    }
    
    if (asistenciasGuardadas) {
      setAsistencias(JSON.parse(asistenciasGuardadas));
    }
  }, []);

  // Guardar datos cuando cambien
  useEffect(() => {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    localStorage.setItem('asistencias', JSON.stringify(asistencias));
  }, [estudiantes, asistencias]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Sistema de Asistencia de Clase</h1>
          <Routes>
            <Route path="/" element={<Login estudiantes={estudiantes} asistencias={asistencias} setAsistencias={setAsistencias} />} />
            <Route path="/register" element={<Register estudiantes={estudiantes} setEstudiantes={setEstudiantes} />} />
            <Route path="/dashboard" element={<Dashboard estudiantes={estudiantes} asistencias={asistencias} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;