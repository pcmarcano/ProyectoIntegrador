import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import EspacioReserva from "./EspacioReserva";
import Calendario from "./Calendario";
import HorarioDia from "./HorarioDia";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Reserva = () => {
    const { isLogged, user, userId } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHoras, setSelectedHoras] = useState([]);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
    const [selectedLugarId, setSelectedLugarId] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleLugarIdChange = (lugarId) => {
        setSelectedLugarId(Number(lugarId));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 640);
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

        if (user && user.id) {
            setSelectedUsuarioId(user.id);
        }
    }, [isLogged, user, navigate]);

    useEffect(() => {
        setSelectedLugarId(Number(id));
    }, [id]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedHoras([]);
    };

    const handleHoraChange = (horas) => {
        setSelectedHoras(horas);
    };

    const handleReservaClick = () => {
        // console.log("Datos de la reserva:", {
        //     usuarioId: selectedUsuarioId || userId,
        //     lugarId: selectedLugarId,
        //     fecha: selectedDate,
        //     franjasHorarias: selectedHoras,
        // });

        if (!selectedDate || selectedHoras.length === 0 || !selectedLugarId) {
            alert("Selecciona una fecha y al menos una franja horaria para continuar.");
            return;
        }

        const reservasData = selectedHoras.map((hora) => ({
            usuarioId: selectedUsuarioId || userId,
            lugarId: selectedLugarId,
            fecha: selectedDate,
            horaInicio: hora.horaInicio,
            horaFin: hora.horaFin,
        }));

        navigate(`/confirmacion/${id}`, { state: { reservasData } });
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
                <EspacioReserva onLugarIdChange={handleLugarIdChange} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isMobileView ? "auto" : "auto",
                    marginTop: isMobileView ? "-70px" : "0px",
                }}
            >
                <Calendario handleDateChange={handleDateChange} />
                {selectedDate && (
                    <HorarioDia
                        key={selectedDate}
                        selectedDate={selectedDate}
                        selectedHoras={selectedHoras}
                        handleHoraChange={handleHoraChange}
                    />
                )}
                <button
                    onClick={handleReservaClick}
                    style={{
                        marginTop: "1rem",
                        marginBottom: "10px",
                        backgroundColor: "#00B5AD",
                        color: "#FFFFFF",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontFamily: "'Dosis', sans-serif",
                        fontSize: "1rem",
                        transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007A75";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#00B5AD";
                    }}
                >
                    Reservar ahora
                </button>
            </Box>
        </Box>
    );
};

export default Reserva;