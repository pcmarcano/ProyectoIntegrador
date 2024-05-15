import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uploadFile } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
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
        const imageUrl = await uploadFile(formData.image);
        body.fotos.push({ rutaFoto: imageUrl });
      }

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
      } else {
        console.error("Error en la solicitud HTTP POST:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud HTTP POST:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            type="text"
            name="name"
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            type="text"
            name="description"
            label="Descripción"
            variant="outlined"
            fullWidth
            required
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default Formulario;
