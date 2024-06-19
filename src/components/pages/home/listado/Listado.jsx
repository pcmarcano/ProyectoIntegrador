import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Box from "@mui/material/Box";

const Listado = () => {
  const [lugares, setLugares] = useState([]);
  const [isFavorite, setIsFavorite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const { isLogged, userId } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://api.curso.spazioserver.online/lugares/listar")
        .then((response) => response.json())
        .then((data) => setLugares(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
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
  }, [userId]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
    if (showAll) {
      setCurrentPage(1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(lugares.length / itemsPerPage);
  const displayItems = showAll
      ? lugares
      : lugares.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
      );

  return (
      <Box sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      >
        <div className="listado-container">
          {displayItems.map((lugar) => (
              <ActionAreaCard
                  key={lugar.id}
                  datos={lugar}
                  isFavorite={isFavorite}
                  setIsFavorite={setIsFavorite}
              />
          ))}
        </div>
        <div className="pagination">
          {!showAll && (
              <>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Atrás
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageClick(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                      {i + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Siguiente
                </button>
              </>
          )}
          <button onClick={handleShowAll}>
            {showAll ? "4 por página" : "Ver todo"}
          </button>
        </div>
      </Box>
  );
};

export default Listado;