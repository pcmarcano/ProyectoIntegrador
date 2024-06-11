import React, { useState } from "react";
import { FilterList } from "@mui/icons-material";
import "./Search.css";
import { Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Categorias from "../formulario/Categorias";
import DatePickerComponent from "./DatePickerComponent";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [categorys, setCategorys] = useState([]);
  const [search, setSearch] = useState("white");
  const [selectedOption2, setSelectedOption2] = React.useState(null);

  return (
    <div className="search-container">
      <h2>
        Encuentra, explora y descubre espacios de manera rápida y sencilla
      </h2>
      <div style={{ width: "90vw" }}>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "90vw",
          }}
          /* className="input-container" */
        >
          <div>
            <Categorias setCategorys={setCategorys} search={search} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <DatePickerComponent
              setSelectedOption2={setSelectedOption2}
              selectedOption2={selectedOption2}
            />
          </div>

          <Button
            style={{ width: "5rem" }}
            variant="contained"
            className="search-button"
            color="warning"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
