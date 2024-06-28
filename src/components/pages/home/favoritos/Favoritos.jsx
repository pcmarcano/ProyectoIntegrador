// src/components/favoritos/Favoritos.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import ActionAreaCard from '../listado/cards/Card';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const { isLogged, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

console.log (userId)

useEffect(() => {
  const buscarFavoritos = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios/19');
      if (!response.ok) {
        throw new Error('Error al obtener los favoritos');
      }
      const data = await response.json();
      console.log (data)
      setFavoritos(data.lugaresFavoritos);
    } catch (error) {
      console.error('Error buscando favoritos:', error);
      setError('Hubo un problema al cargar tus favoritos.');
    } finally {
      setLoading(false);
    }
  };


  if (isLogged) {
    buscarFavoritos();
  }
}, [isLogged]);

console.log (favoritos)


  if (!isLogged) {
    return <p>Por favor, inicia sesión para ver tus favoritos.</p>;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log (Favoritos)
  return (
    <div>
      {favoritos.length === 0 ? (
        <p>No tienes favoritos guardados.</p>
      ) : (
        <div>
          {favoritos.map((favorito) => (
            <ActionAreaCard key={favorito.id} datos={favorito} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
