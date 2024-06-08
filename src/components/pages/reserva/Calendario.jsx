import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendario = ({ handleDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div>
            <h2>Selecciona una fecha:</h2>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    handleDateChange(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                isClearable
            />
        </div>
    );
};

export default Calendario;
