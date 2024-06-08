import React, { useState } from "react";
import Box from "@mui/material/Box";
import EspacioReserva from "./EspacioReserva";
import Calendario from "./Calendario";
import HorarioDia from "./HorarioDia";

const Reserva = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Box display="flex" flexDirection="row">
            <Box marginRight="1rem">
                <EspacioReserva />
            </Box>
            <Box>
                <Calendario handleDateChange={handleDateChange} />
                {selectedDate && <HorarioDia selectedDate={selectedDate} />}
            </Box>
        </Box>
    );
};

export default Reserva;
