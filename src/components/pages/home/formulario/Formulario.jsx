import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./formulario.css";

const Formulario = () => {
  return (
    <Box className="container">
      <form className="form" id="userForm">
        <label className="label" htmlFor="name">
          Nombre:
        </label>
        <TextField
          className="textfield"
          type="text"
          id="name"
          name="name"
          variant="outlined"
          required
        />

        <label className="label" htmlFor="description">
          Descripción:
        </label>
        <TextField
          className="textfield"
          type="text"
          id="description"
          name="description"
          variant="outlined"
          required
        />

        <label className="label" htmlFor="image">
          Imagen:
        </label>
        <TextField
          className="textfield"
          type="text"
          id="image"
          name="image"
          variant="outlined"
          required
        />

        <Button className="button" type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default Formulario;
