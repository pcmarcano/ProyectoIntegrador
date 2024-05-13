import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uploadFile } from "../../../../firebaseConfig"; // Importa la función uploadFile desde su ubicación correcta
import "./formulario.css";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
  const navigate = useNavigate();

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
      let body = {
        nombre: formData.name,
        descripcion: formData.description,
        fotos: [],
      };

      if (formData.image) {
        // Si hay una imagen seleccionada, carga la imagen y obtén la URL
        const imageUrl = await uploadFile(formData.image);
        // Agrega la URL de la imagen al cuerpo de la solicitud
        body.fotos.push({ rutaFoto: imageUrl });
      }

      // Realiza la solicitud HTTP POST con el cuerpo construido
      const response = await fetch(
        "https://api.spazio.spazioserver.online/lugares/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        console.log("Solicitud HTTP POST exitosa");
        navigate("/list");

        // Aquí puedes manejar la respuesta del servidor si es necesario
      } else {
        console.error("Error en la solicitud HTTP POST:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud HTTP POST:", error);
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
