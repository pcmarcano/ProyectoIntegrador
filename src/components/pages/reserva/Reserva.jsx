import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import EspacioReserva from "./EspacioReserva";
import Calendario from "./Calendario";
import HorarioDia from "./HorarioDia";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Reserva = () => {
  const { isLogged } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 570);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 570);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isLogged) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLogged, navigate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (!isLogged) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Dosis', sans-serif",
          fontWeight: "bold",
          fontSize: "18px",
          maxWidth: "400px",
          margin: "50px auto",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <p>
          No tienes permiso para ver esta página. Por favor, inicia sesión.
          Serás redirigido en 5 segundos...
        </p>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobileView ? "column" : "row",
        justifyContent: "center",
        alignItems: isMobileView ? "center" : "flex-start",
      }}
    >
      <Box
        sx={{
          marginRight: isMobileView ? "0px" : "50px",
          marginLeft: isMobileView ? "0px" : "15px",
          marginTop: isMobileView ? "-50px" : "0px",
          width: isMobileView ? "100%" : "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <EspacioReserva />
      </Box>
      <Box
        sx={{
          width: isMobileView ? "100%" : "auto",
          marginTop: isMobileView ? "-70px" : "0px",
        }}
      >
        <Calendario handleDateChange={handleDateChange} />
        {selectedDate && <HorarioDia selectedDate={selectedDate} />}
      </Box>
    </Box>
  );
};

export default Reserva;
