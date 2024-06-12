import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import Search from "../search/Search";
import { Box } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const ListadoSearch = () => {
  const { categorysFiltro } = useContext(SearchContext);

  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
  const [lugares, setLugares] = useState([]);
  const navigate = useNavigate();
  const [actualizarLugares, setActualizarLugares] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);
  const { isLogged, userId } = useContext(AuthContext);

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => {
        setLugares(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [categorysFiltro, actualizarLugares]);

  useEffect(() => {
    if (lugares.length > 0) {
      handleFiltrar();
    }
  }, [lugares, categorysFiltro]);

  const handleFiltrar = () => {
    if (categorysFiltro.length > 0) {
      const lugaresFiltrados = lugares.filter((lugar) =>
        lugar.categorias.some((categoria) =>
          categorysFiltro.some((filtro) => categoria.id === filtro)
        )
      );
      setLugaresFiltrados(lugaresFiltrados);
    } else {
      setLugaresFiltrados(lugares);
    }
  };

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
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Search />
      <div className="listado-container">
        {lugaresFiltrados.map((lugar) => (
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
    </Box>
  );
};

export default ListadoSearch;
