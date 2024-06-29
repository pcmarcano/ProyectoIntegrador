import React, { useContext, useState } from "react";
import { FilterList } from "@mui/icons-material";
import "./Search.css";
import { Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Categorias from "../formulario/Categorias";
import DatePickerComponent from "./DatePickerComponent";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Search = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [categorys, setCategorys] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const { saveCategoryStorage, saveDateSelection } = useContext(SearchContext);

    const handleBuscar = () => {
        saveCategoryStorage(categorys); // Guardar categorías seleccionadas en el contexto y localStorage
        const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
        saveDateSelection(formattedDate); // Guardar la fecha en formato truncado en el contexto y localStorage
        navigate("/listSearch"); // Navegar a la página de resultados de búsqueda
    };

    const handleCategoryChange = (newCategory) => {
        setCategorys(newCategory);
        console.log("Categoría seleccionada:", newCategory);
    };

    const handleDateChange = (date) => {
        const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
        setSelectedDate(date); // Actualizar el estado local con la fecha seleccionada
        console.log("Fecha seleccionada:", formattedDate);
    };

    return (
        <div className="search-container">
            <h2>Encuentra, explora y descubre espacios de manera rápida y sencilla</h2>
            <div>
                {!isMobile && (
                    <div className="filter-container">
                        <FilterList className="filter-icon" />
                        <span style={{ fontSize: isMobile ? "0.5rem" : "1rem" }} className="filter-text">
                            Filtrar
                        </span>
                    </div>
                )}

                <div className="input-container">
                    <Categorias setCategorys={handleCategoryChange} />
                    <DatePickerComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
                    <Button
                        style={{ width: "4rem", height: "2rem" }}
                        variant="contained"
                        className="search-button"
                        color="warning"
                        onClick={handleBuscar}
                    >
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Search;