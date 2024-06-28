import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import ActionAreaCard from '../listado/cards/Card';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const { isLogged, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuarios/${userId}`);
        setFavoritos(response.data.lugaresFavoritos);
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
  }, [isLogged, userId]);

  if (!isLogged) {
    return <p style={{ padding: '10px' }}>Por favor, inicia sesión para ver tus favoritos.</p>;
  }

  if (loading) {
    return <p style={{ padding: '10px' }}>Cargando...</p>;
  }

  if (error) {
    return <p style={{ padding: '10px' }}>{error}</p>;
  }

  return (
      <div style={{ padding: '10px' }}>
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
