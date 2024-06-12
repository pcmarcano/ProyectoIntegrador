import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Categorias({ setCategorys }) {
  const [categorias, setCategorias] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);

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
    setCategorys(selectedIds);
    console.log(selectedIds);
  };

  return (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={categorias}
        getOptionLabel={(option) => option.nombre}
        filterSelectedOptions
        value={selectedCategories}
        onChange={handleSelectionChange}
        renderInput={(params) => (
          <TextField {...params} label="Selecciona Categorias" placeholder="" />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
