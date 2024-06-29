import React, { useState } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import es from "date-fns/locale/es";

registerLocale("es", es);

const Calendario = ({ handleDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChangeInternal = (date) => {
        setSelectedDate(date);
        handleDateChange(format(date, 'yyyy-MM-dd'));
    };

    return (
        <div style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "10px",
        }}
        >
            <h2 style={{
                color: "#1E3231",
                fontSize: "1.25rem",
            }}
            >Selecciona una fecha</h2>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChangeInternal}
                dateFormat="dd/MM/yyyy"
                locale="es"
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
        {value || "Elige una fecha"}
    </button>
));

export default Calendario;