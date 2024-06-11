import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import Search from "../search/Search";
import { Box } from "@mui/material";

const ListadoSearch = () => {
  const { categorysFiltro } = useContext(SearchContext);

  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
  const [lugares, setLugares] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => {
        setLugares(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [categorysFiltro]);

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
          <ActionAreaCard key={lugar.id} datos={lugar} />
        ))}
      </div>
    </Box>
  );
};

export default ListadoSearch;
