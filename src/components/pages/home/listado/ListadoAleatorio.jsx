import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ListadoAleatorio = () => {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(lugares);

  return (
    <div className="listado-container">
      {lugares.map((lugar) => (
        <ActionAreaCard key={lugar.id} datos={lugar} />
      ))}
    </div>
  );
};

export default ListadoAleatorio;
