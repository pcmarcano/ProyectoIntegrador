import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ListadoAleatorio = () => {
  const [lugares, setLugares] = useState([]);
  const [actualizarLugares, setActualizarLugares] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);
  const { isLogged, userId } = useContext(AuthContext);

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [actualizarLugares]);

  useEffect(() => {
    // Buscar favoritos en componente
    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(
          `https://api.curso.spazioserver.online/usuarios/${userId}`
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

  return (
    <div className="listado-container">
      {lugares.map((lugar) => (
        <ActionAreaCard
          key={lugar.id}
          datos={lugar}
          setActualizarLugares={setActualizarLugares}
          actualizarLugares={actualizarLugares}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
        />
      ))}
    </div>
  );
};

export default ListadoAleatorio;
