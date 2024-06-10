import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendario = ({ handleDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom:"10px",
        }}
        >
            <h2 style={{
                color: "#1E3231",
                fontSize: "1.25rem",
            }}
            >Selecciona una fecha</h2>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date);
                    handleDateChange(date);
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                isClearable
                placeholderText="Elige una fecha"
                calendarClassName="custom-calendar"
                customInput={<CustomInput />}
            />
        </div>
    );
};

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
        type="button"
        onClick={onClick}
        ref={ref}
        style={{
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            color: "#333",
            cursor: "pointer",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            outline: "none",
            width: "150px",
        }}
    >
        {value || "Calendario"}
    </button>
));

export default Calendario;
