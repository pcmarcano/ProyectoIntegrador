import React from 'react';
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const DatePickerComponent = ({ setSelectedOption2, selectedOption2 }) => {
    const handleDateChange = (newValue) => {
        setSelectedOption2(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DatePicker
                label="Fecha de Reserva"
                value={selectedOption2}
                onChange={handleDateChange}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    border: "0px",
                    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePickerComponent;
