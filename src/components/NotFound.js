// components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
      <p className="mb-6">La página que estás buscando no existe.</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;