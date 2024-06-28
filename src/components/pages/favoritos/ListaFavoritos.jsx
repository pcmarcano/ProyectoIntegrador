import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Favoritos from '../home/favoritos/Favoritos';
import { AuthContext } from '../../context/AuthContext';
import ActionAreaCard from '../home/listado/cards/Card';
import "./Listado.css"

const ListaFavoritos = () => {
  const { isLogged, userId } = useContext(AuthContext);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actualizarLugares, setActualizarLugares] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);

  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        if (isLogged && userId) {
          setLoading(true);
          const response = await axios.get(`https://api.curso.spazioserver.online/usuarios/${userId}`);
          const favoritosIds = response.data.lugaresFavoritos;
          setFavoritos(favoritosIds);
        }
      } catch (error) {
        console.error('Error buscando favoritos:', error);
        setError('Hubo un problema al cargar tus favoritos.');
      } finally {
        setLoading(false);
      }
    };

    buscarFavoritos();
  }, [isLogged, userId, actualizarLugares]);
  useEffect(() => {
    // Buscar favoritos en componente
    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/usuarios/${userId}`
        );
        const favoritos = response.data.lugaresFavoritos.map(
          (favorito) => favorito.id
        );
        setIsFavorite(favoritos);
      } catch (error) {
        console.error("error buscando favoritos:", error);
      }
    };
    if (isLogged && userId) {
      buscarFavoritos();
    }
  }, [userId, actualizarLugares]);
console.log (favoritos)
  return (
      <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
      >
        <div style={{ padding: '10px' }}>
          {favoritos.length === 0 ? (
                  <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontFamily: "'Dosis', sans-serif",
                        fontWeight: "bold",
                        fontSize: "18px",
                        maxWidth: "400px",
                        margin: "50px auto",
                        padding: "20px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        backgroundColor: "white",
                      }}
                  >
                    <p>
                      No tienes favoritos guardados
                    </p>
                  </Box>
          ) : (
              <div className="listado-container">
                {favoritos.map((lugar) => (
                    <div>
                      <ActionAreaCard
                          key={lugar.id}
                          datos={lugar}
                          setActualizarLugares={setActualizarLugares}
                          actualizarLugares={actualizarLugares}
                          setIsFavorite={setIsFavorite}
                          isFavorite={isFavorite}
                      />
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default ListaFavoritos;
