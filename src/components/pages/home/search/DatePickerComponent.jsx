import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerComponent = ({ setSelectedOption2, selectedOption2 }) => {
  const handleDateChange = (newValue) => {
    setSelectedOption2(newValue);
  };

  console.log(selectedOption2);

  return (
    <DemoContainer size="small" components={["DatePicker"]}>
      <LocalizationProvider
        sx={{ backgroundColor: "white" }}
        dateAdapter={AdapterDayjs}
        adapterLocale="es"
      >
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Fecha de Reserva"
            value={selectedOption2}
            onChange={handleDateChange}
            sx={{
              backgroundColor: "white",
              borderRadius: "5%",
              margin: "1rem",
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </DemoContainer>
  );
};

export default DatePickerComponent;
