// components/Register.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Register({ estudiantes, setEstudiantes }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: ''
  });
  
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Si llegamos desde Login con una cédula, la usamos
    if (location.state && location.state.cedula) {
      setFormData(prev => ({ ...prev, cedula: location.state.cedula }));
    }
  }, [location.state]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!formData.cedula || !formData.nombre || !formData.apellido || !formData.telefono || !formData.correo) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    // Validar que la cédula no exista ya
    if (estudiantes.some(est => est.cedula === formData.cedula)) {
      setError('Este número de cédula ya está registrado');
      return;
    }
    
    // Agregar nuevo estudiante
    const nuevoEstudiante = {
      ...formData,
      nombre: `${formData.nombre} ${formData.apellido}` // Combinamos nombre y apellido
    };
    
    setEstudiantes(prev => [...prev, nuevoEstudiante]);
    
    // Redirigir al login
    navigate('/');
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Registro de Estudiante</h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cedula" className="block text-gray-700 font-medium mb-2">Número de Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu número de cédula"
            readOnly={!!location.state && !!location.state.cedula}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu nombre"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700 font-medium mb-2">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu apellido"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu número de teléfono"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-1/2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;