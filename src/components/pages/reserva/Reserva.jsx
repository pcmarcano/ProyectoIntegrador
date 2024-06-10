import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EspacioReserva from "./EspacioReserva";
import Calendario from "./Calendario";
import HorarioDia from "./HorarioDia";

const Reserva = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 570);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 570);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                    marginTop:isMobileView ? "-70px" : "0px",
                }}
            >
                <Calendario handleDateChange={handleDateChange} />
                {selectedDate && <HorarioDia selectedDate={selectedDate} />}
            </Box>
        </Box>
    );
};

export default Reserva;
