import React from "react";
import { FilterList } from "@mui/icons-material"; // Importar el icono de filtrar de MUI
import "./Search.css";

const Search = () => {
  return (
    <div className="search-container">
      <h2>
        Encuentra, explora y descubre espacios de manera rápida y sencilla
      </h2>
      <div>
        <FilterList className="filter-icon" />
        <span>Filtrar</span>
        <input
          type="text"
          placeholder="Category1..."
          className="search-input"
        />
        <input
          type="text"
          placeholder="Category2..."
          className="search-input"
        />
        <input
          type="text"
          placeholder="Category3..."
          className="search-input"
        />
        <button className="search-button">Buscar</button>
      </div>
    </div>
  );
};

export default Search;
