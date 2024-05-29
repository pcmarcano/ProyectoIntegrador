import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Categorias() {
  return (
    <Stack spacing={3} sx={{ width: 350 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Selecciona Categorias" placeholder="" />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "Aire Libre", year: 1994 },
  { title: "Recreacion", year: 1972 },
  { title: "Cerrado", year: 1974 },
  { title: "Apto Fumador", year: 2008 },
  { title: "Apto Mascotas", year: 1957 },
  { title: "Sociales", year: 1993 },
  { title: "Privadas", year: 1994 },
];
