import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { SearchContext } from "../../../context/SearchContext";
import { InputBase } from "@mui/material";

export default function Categorias({ setCategorys, search }) {
  const [categorias, setCategorias] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const {
    categoriaFiltroID,
    setCategoriaFiltroID,
    setCategorysFiltro,
    categorysFiltro,
    saveCategoryStorage,
  } = React.useContext(SearchContext);
  const obtenerCategorias = async () => {
    try {
      const response = await fetch(
        "https://api.curso.spazioserver.online/categorias/listar",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
        console.log("Solicitud HTTP GET exitosa");
      } else {
        console.error("Error en la solicitud HTTP GET:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud HTTP GET:", error);
    }
  };

  React.useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleSelectionChange = (event, values) => {
    setSelectedCategories(values);
    const selectedIds = values.map((category) => category.id);
    setCategoriaFiltroID(selectedIds);
    setCategorys(selectedIds);
    console.log(selectedIds);
  };

  return (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={categorias}
        getOptionLabel={(option) => option.nombre}
        filterSelectedOptions
        value={selectedCategories}
        onChange={handleSelectionChange}
        sx={{ backgroundColor: "transparent" }}
        renderInput={(params) => (
          <InputBase
            {...params.InputProps}
            inputProps={{ ...params.inputProps }}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              border: "0px",
              padding: "10px",
              width: "100%",
              boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
            }}
            placeholder={
              selectedCategories.length > 0 ? "" : " Selecciona Categorías"
            }
          />
        )}
      />
    </Stack>
  );
}
