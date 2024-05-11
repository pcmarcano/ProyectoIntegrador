import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uploadFile } from "../../../../firebaseConfig"; // Importa la función uploadFile desde su ubicación correcta
import "./formulario.css";

const Formulario = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null, // Estado para almacenar el archivo de imagen seleccionado
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.image) {
        // Si hay una imagen seleccionada, carga la imagen y obtén la URL
        const imageUrl = await uploadFile(formData.image);
        // Usa la URL de la imagen para lo que necesites, como guardarla en la base de datos
        console.log("URL de la imagen cargada:", imageUrl);
      }
      // Aquí puedes manejar el envío del resto de los datos del formulario si es necesario
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Box className="container">
      <form className="form" id="userForm" onSubmit={handleSubmit}>
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
          value={formData.name}
          onChange={handleInputChange}
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
          value={formData.description}
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="image">
          Imagen:
        </label>
        <input
          className="textfield"
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*" // Limita la selección a archivos de imagen
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
