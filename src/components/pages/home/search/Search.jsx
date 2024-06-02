import React from "react";
import { FilterList } from "@mui/icons-material";
import "./Search.css";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="search-container">
      <h2>
        Encuentra, explora y descubre espacios de manera rápida y sencilla
      </h2>
      <div style={{ width: "80vw" }}>
        <div className="filter-container">
          <FilterList className="filter-icon" />
          <span
            style={{ fontSize: isMobile ? "0.5rem" : "1rem" }}
            className="filter-text"
          >
            Filtrar
          </span>
        </div>
        <div
          style={{
            display: isMobile ? "flex" : "border-box",
            alignItems: "center",
            marginTop: "1rem",
          }}
          /* className="input-container" */
        >
          <input
            type="text"
            placeholder="Category1..."
            className="search-input"
          />
          {!isMobile && (
            <>
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
            </>
          )}
          <button className="search-button">Buscar</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
