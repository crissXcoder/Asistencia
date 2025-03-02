// components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ estudiantes, asistencias }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();
  
  // Obtener lista de fechas únicas de asistencia
  const fechasDisponibles = Object.keys(asistencias).sort((a, b) => new Date(b) - new Date(a));
  
  // Obtener datos de asistencia para la fecha seleccionada
  const asistenciaDelDia = asistencias[fechaSeleccionada] || {};
  
  // Preparar lista completa de estudiantes con su estado de asistencia
  const listaAsistencia = estudiantes.map(estudiante => {
    const asistenciaEstudiante = asistenciaDelDia[estudiante.cedula];
    
    return {
      cedula: estudiante.cedula,
      nombre: estudiante.nombre,
      estado: asistenciaEstudiante ? asistenciaEstudiante.estado : 'Ausente',
      hora: asistenciaEstudiante ? asistenciaEstudiante.hora : '-'
    };
  });
  
  // Calcular estadísticas
  const estadisticas = {
    total: listaAsistencia.length,
    presentes: listaAsistencia.filter(a => a.estado === 'Puntual' || a.estado === 'Tardío').length,
    puntuales: listaAsistencia.filter(a => a.estado === 'Puntual').length,
    tardios: listaAsistencia.filter(a => a.estado === 'Tardío').length,
    ausentes: listaAsistencia.filter(a => a.estado === 'Ausente').length
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Panel de Asistencia</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Registro de Asistencia
        </button>
      </div>
      
      <div className="mb-6">
        <label htmlFor="fecha" className="block text-gray-700 font-medium mb-2">Seleccionar Fecha:</label>
        <select
          id="fecha"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {fechasDisponibles.length > 0 ? (
            fechasDisponibles.map(fecha => (
              <option key={fecha} value={fecha}>
                {new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </option>
            ))
          ) : (
            <option value={fechaSeleccionada}>
              {new Date(fechaSeleccionada).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </option>
          )}
        </select>
      </div>
      
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold">{estadisticas.total}</p>
          <p className="text-gray-600">Total Estudiantes</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold">{estadisticas.puntuales}</p>
          <p className="text-gray-600">Puntuales</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold">{estadisticas.tardios}</p>
          <p className="text-gray-600">Tardíos</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold">{estadisticas.ausentes}</p>
          <p className="text-gray-600">Ausentes</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border text-left">Cédula</th>
              <th className="py-2 px-4 border text-left">Nombre</th>
              <th className="py-2 px-4 border text-left">Estado</th>
              <th className="py-2 px-4 border text-left">Hora</th>
            </tr>
          </thead>
          <tbody>
            {listaAsistencia.map(asistencia => (
              <tr key={asistencia.cedula}>
                <td className="py-2 px-4 border">{asistencia.cedula}</td>
                <td className="py-2 px-4 border">{asistencia.nombre}</td>
                <td className={`py-2 px-4 border ${
                  asistencia.estado === 'Puntual' ? 'text-green-600' :
                  asistencia.estado === 'Tardío' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {asistencia.estado}
                </td>
                <td className="py-2 px-4 border">{asistencia.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;