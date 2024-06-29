import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import ReservationIcon from "@mui/icons-material/EventNote";

registerLocale("es", es);

const DatePickerComponent = ({ selectedDate, handleDateChange }) => {

    const handleDateChangeInternal = (date) => {
        handleDateChange(date); // Llamar a la función pasada como prop
    };

    return (
        <div style={{ textAlign: "center", alignItems: "center" }}>
            <DatePicker
                id="datepicker"
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
    <div
        style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 15px",
            borderRadius: "5px",
            backgroundColor: "white",
            color: "#333333",
            cursor: "pointer",
            outline: "none",
            width: "200px",
        }}
        onClick={onClick}
    >
        <ReservationIcon style={{ marginRight: "8px" }} />
        {value || "Elige una fecha"}
    </div>
));

export default DatePickerComponent;