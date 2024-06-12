import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Politicas = ({ setPoliticas }) => {
  const [politicasInput, setPoliticasInput] = useState([""]);

  const handlePoliticasChange = (event, index) => {
    const newPoliticas = [...politicasInput];
    newPoliticas[index] = event.target.value;
    setPoliticasInput(newPoliticas);
  };

  const handleAddPolitica = () => {
    setPoliticasInput([...politicasInput, ""]);
  };

  const handleRemovePolitica = (index) => {
    const newPoliticas = [...politicasInput];
    newPoliticas.splice(index, 1);
    setPoliticasInput(newPoliticas);
  };

  const handleBlur = () => {
    setPoliticas(politicasInput.filter((politica) => politica.trim() !== ""));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Políticas de Uso
      </Typography>
      {politicasInput.map((politica, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <TextField
            value={politica}
            onChange={(event) => handlePoliticasChange(event, index)}
            onBlur={handleBlur}
            fullWidth
            variant="outlined"
            size="small"
          />
          <IconButton
            aria-label="Agregar política"
            color="primary"
            onClick={handleAddPolitica}
            disabled={index !== politicasInput.length - 1}
          >
            <AddIcon />
          </IconButton>
          {politicasInput.length > 1 && (
            <IconButton
              aria-label="Remover política"
              color="secondary"
              onClick={() => handleRemovePolitica(index)}
            >
              <RemoveIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Politicas;