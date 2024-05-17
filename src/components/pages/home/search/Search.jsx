import React from "react";
import { FilterList } from "@mui/icons-material"; // Importar el icono de filtrar de MUI
import "./Search.css";

const Search = () => {
  return (
    <div className="search-container">
      <h2>
        Encuentra, explora y descubre espacios de manera rápida y sencilla
      </h2>
      <div class="filter">
        <div>
          <FilterList className="filter-icon" />
        </div>
        <div>
          <span>Filtrar</span>
        </div>
        <input
          type="text"
          placeholder="Category1..."
          className="search-input"
        />
        <input
          id="element2"
          type="text"
          placeholder="Category2..."
          className="search-input 2"
        />
        <input
          id="element3"
          type="text"
          placeholder="Category3..."
          className="search-input 3"
        />
        <button className="search-button">Buscar</button>
      </div>
    </div>
  );
};

export default Search;
