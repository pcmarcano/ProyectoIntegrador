import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./cards/Card";
import "./Listado.css"; // Archivo CSS para estilos personalizados
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Listado = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const rolAdmin = import.meta.env.VITE_ADMIN;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.rol !== rolAdmin) {
      navigate("/login");
    }
  }, [user, rolAdmin, navigate]);
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    // Llamada a la API
    fetch("http://localhost:8080/lugares/listar")
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
