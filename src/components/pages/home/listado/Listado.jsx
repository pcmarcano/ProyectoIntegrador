import React, { useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados

const Listado = () => {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    // Llamada a la API
    fetch("http://18.228.226.201/lugares/listar")
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

export default Listado;
