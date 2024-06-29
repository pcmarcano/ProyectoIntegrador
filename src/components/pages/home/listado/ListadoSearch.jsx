import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import Search from "../search/Search";
import { Box } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";

const ListadoSearch = () => {
  const { categorysFiltro, selectedDate } = useContext(SearchContext);
  const { isLogged, userId } = useContext(AuthContext);

  const [lugares, setLugares] = useState([]);
  const [lugaresFiltrados, setLugaresFiltrados] = useState([]);
  const [actualizarLugares, setActualizarLugares] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerLugares = async () => {
      try {
        const response = await axios.get("https://api.curso.spazioserver.online/lugares/listar");
        console.log("Lugares obtenidos:", response.data); // Log de lugares obtenidos
        setLugares(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    obtenerLugares();
  }, [actualizarLugares]);

  useEffect(() => {
    const handleFiltrar = async () => {
      try {
        const response = await fetch("http://localhost:8080/reservas");
        const reservas = await response.json();

        console.log("Reservas obtenidas:", reservas); // Log de reservas obtenidas

        const lugaresFiltradosTemp = lugares.map((lugar) => {
          // Filtrar reservas por lugar y fecha seleccionada
          const reservasPorLugar = reservas.filter(
              (reserva) =>
                  reserva.lugarId.toString() === lugar.id.toString() &&
                  reserva.fecha.substring(0, 10) === selectedDate // Truncar a yyyy-MM-dd
          );

          // Verificar cantidad de reservas
          const cantidadReservas = reservasPorLugar.length;

          // Verificar disponibilidad de horas
          const horasDisponibles = cantidadReservas < 17;

          // Filtrar lugar si hay disponibilidad y categoría seleccionada, o si no se seleccionó categoría
          const categoriaFiltrada = categorysFiltro.length === 0 || lugar.categorias.some(categoria =>
              categorysFiltro.includes(categoria.id)
          );

          console.log(`Filtrando lugar ${lugar.id} - Disponibilidad: ${horasDisponibles}, Categoría filtrada: ${categoriaFiltrada}`); // Log de filtrado por lugar

          return horasDisponibles && categoriaFiltrada ? { ...lugar, disponible: true } : null;
        }).filter(Boolean); // Filtrar lugares nulos (sin disponibilidad)

        console.log("Lugares filtrados:", lugaresFiltradosTemp); // Log de lugares filtrados

        setLugaresFiltrados(lugaresFiltradosTemp);
      } catch (error) {
        console.error("Error fetching reservas:", error);
      }
    };

    handleFiltrar();
  }, [lugares, selectedDate, categorysFiltro]);

  useEffect(() => {
    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(`https://api.curso.spazioserver.online/usuarios/${userId}`);
        const favoritos = response.data.lugaresFavoritos.map(favorito => favorito.id);
        setIsFavorite(favoritos);
      } catch (error) {
        console.error("Error buscando favoritos:", error);
      }
    };

    if (isLogged && userId) {
      buscarFavoritos();
    }
  }, [userId, isLogged, actualizarLugares]);

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