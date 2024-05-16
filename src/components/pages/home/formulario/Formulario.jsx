import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uploadFile } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Formulario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [arrayImagenes, setArrayImagenes] = useState([]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    let imagenUrl = await uploadFile(file);
    if (imagenUrl) {
      setArrayImagenes([...arrayImagenes, { rutaFoto: imagenUrl }]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(arrayImagenes);

    try {
      let body = {
        nombre: formData.name,
        descripcion: formData.description,
        fotos: arrayImagenes,
      };

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
        bgcolor: "#f0f0f0",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "#fff",
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Typography variant="h5" mb={2} align="center">
          Formulario
        </Typography>
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
        {arrayImagenes.length <= 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="body1" mb={1}>
              Subir imagen 1
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", width: "100%" }}
            />
          </div>
        )}

        {arrayImagenes.length <= 1 && (
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="body1" mb={1}>
              Subir imagen 2
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", width: "100%" }}
            />
          </div>
        )}
        {arrayImagenes.length <= 2 && (
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="body1" mb={1}>
              Subir imagen 3
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", width: "100%" }}
            />
          </div>
        )}
        {arrayImagenes.length <= 3 && (
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="body1" mb={1}>
              Subir imagen 4
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", width: "100%" }}
            />
          </div>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Formulario;
