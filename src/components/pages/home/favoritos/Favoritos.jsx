
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import ActionAreaCard from '../listado/cards/Card';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const {isLogged, usuario} = useContext(AuthContext);


useEffect(() => {
  const buscarFavoritos = async () => {
    try {
      const respuesta = await axios.get(`/api/favoritos/${usuario.id}`);
      setFavoritos(respuesta.data);
    } catch (error) {
      console.error('error buscando favoritos: ', error);
    }
  };

  if (isLogged && usuario.id) {
    buscarFavoritos();
  }
}, [isLogged, usuario.id]);

return (
  <div>
    <h1>Favoritos</h1>
    {favoritos.length === 0 ? (
      <p>No tienes favoritos guardados.</p>
    ) : (
      <div>
        {favoritos.map((favorito) => (
          <ActionAreaCard key={favorito.lugarId} datos={favorito.lugar} />
        ))}
      </div>
    )}
  </div>
);
};

export default Favoritos;