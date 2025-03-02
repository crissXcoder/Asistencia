// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ estudiantes, asistencias, setAsistencias }) {
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!cedula.trim()) {
      setError('Por favor ingresa tu número de cédula');
      return;
    }

    // Verificar si el estudiante existe
    const estudianteExistente = estudiantes.find(est => est.cedula === cedula);
    
    if (!estudianteExistente) {
      // Si no existe, redirigir al registro
      navigate('/register', { state: { cedula } });
      return;
    }

    // Si existe, registrar asistencia
    registrarAsistencia(cedula, estudianteExistente.nombre);
  };

  const registrarAsistencia = (cedula, nombre) => {
    const ahora = new Date();
    const fecha = ahora.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = ahora.getHours() + ':' + ahora.getMinutes();
    
    // Determinar estado de asistencia
    let estado = "Ausente";
    
    if (ahora.getHours() < 8) {
      estado = "Puntual";
    } else if (ahora.getHours() < 15 || (ahora.getHours() === 15 && ahora.getMinutes() <= 20)) {
      estado = "Tardío";
    }
    
    // Actualizar el registro de asistencias
    setAsistencias(prev => {
      const nuevasAsistencias = { ...prev };
      
      if (!nuevasAsistencias[fecha]) {
        nuevasAsistencias[fecha] = {};
      }
      
      nuevasAsistencias[fecha][cedula] = {
        nombre,
        estado,
        hora
      };
      
      return nuevasAsistencias;
    });
    
    setSuccess(`Asistencia registrada como: ${estado}`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Registro de Asistencia</h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cedula" className="block text-gray-700 font-medium mb-2">Número de Cédula</label>
          <input
            type="text"
            id="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu número de cédula"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Registrar Asistencia
        </button>
      </form>
    </div>
  );
}

export default Login;