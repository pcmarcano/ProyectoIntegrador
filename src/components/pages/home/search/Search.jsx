import React, { useContext, useEffect, useState } from "react";
import { FilterList } from "@mui/icons-material";
import "./Search.css";
import { Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Categorias from "../formulario/Categorias";
import DatePickerComponent from "./DatePickerComponent";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [categorys, setCategorys] = useState([]);
  const [search, setSearch] = useState("white");
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
  const navigate = useNavigate();
  const { categoriaFiltroID, setCategorysFiltro } = useContext(SearchContext);

  console.log(categoriaFiltroID);

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleBuscar = () => {
    setCategorysFiltro(categoriaFiltroID);
    navigate("/listSearch");
  };

  return (
    <div className="search-container">
      <h2>
        Encuentra, explora y descubre espacios de manera rápida y sencilla
      </h2>
      <div style={{ width: "90vw" }}>
        {!isMobile && (
          <div className="filter-container">
            <FilterList className="filter-icon" />
            <span
              style={{ fontSize: isMobile ? "0.5rem" : "1rem" }}
              className="filter-text"
            >
              Filtrar
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: isMobile ? "column" : "row",
            width: isMobile ? "90%" : "50vw",
            marginTop: isMobile ? "1rem" : "0",
          }}
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
            onClick={handleBuscar}
          >
            <SearchIcon />
          </Button>
        </div>
      </div>

      <div>
        {lugaresFiltrados.map((lugar) => (
          <div key={lugar.id}>
            <h2>{lugar.nombre}</h2>
            <p>{lugar.descripcion}</p>
            <div>
              {lugar.fotos.map((foto) => (
                <img
                  key={foto.id}
                  src={foto.rutaFoto}
                  alt={lugar.nombre}
                  width="100"
                />
              ))}
            </div>
            <div>
              {lugar.caracteristicas.map((caracteristica) => (
                <span key={caracteristica.id}>{caracteristica.nombre}, </span>
              ))}
            </div>
            <div>
              {lugar.categorias.map((categoria) => (
                <span key={categoria.id}>{categoria.nombre}, </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
