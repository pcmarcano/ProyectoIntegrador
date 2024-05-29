import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { uploadFile } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Caracteristicas from "./Caracteristicas";
import Categorias from "./Categorias";

const Formulario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: [],
  });
  const [arrayImagenes, setArrayImagenes] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [imageCount, setImageCount] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newThumbnails = [...thumbnails];
        newThumbnails[index] = reader.result;
        setThumbnails(newThumbnails);
      };
      reader.readAsDataURL(file);

      let imagenUrl = await uploadFile(file);
      if (imagenUrl) {
        setArrayImagenes([...arrayImagenes, { rutaFoto: imagenUrl }]);
        setImageCount(imageCount + 1);
      }
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

      const response = await fetch("http://localhost:8080/lugares/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

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
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Dosis", sans-serif',
        marginTop: "30px",
      }}
    >
      <form onSubmit={handleSubmit} style={{ maxWidth: "350px" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              mb={2}
              sx={{
                fontFamily: '"Dosis", sans-serif',
              }}
            >
              Formulario
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nombre"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
              inputProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
              sx={{ backgroundColor: "white" }}
            />
            {errors.name && (
              <FormHelperText error>{errors.name}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Descripción"
              fullWidth
              value={formData.description}
              onChange={handleInputChange}
              InputLabelProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
              inputProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
              sx={{ backgroundColor: "white" }}
            />
            {errors.description && (
              <FormHelperText error>{errors.description}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Categorias />
          </Grid>
          <Grid item xs={12}>
            <Caracteristicas />
          </Grid>

          {[...Array(5)].map((_, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                textAlign: "center",
                display: index <= imageCount ? "block" : "none",
              }}
            >
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "4px",
                  padding: "10px 10px",
                  display: "inline-block",
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    fontFamily: '"Dosis", sans-serif',
                    textTransform: "none",
                    backgroundColor: "#FF9550",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                    },
                  }}
                >
                  Subir imagen {index + 1}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, index)}
                    hidden
                  />
                </Button>
                {thumbnails[index] && (
                  <Box mt={2} sx={{ textAlign: "center" }}>
                    <img
                      src={thumbnails[index]}
                      alt={`Imagen ${index + 1}`}
                      style={{ maxWidth: "40%", height: "auto" }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                color: "white",
                textTransform: "none",
                textShadow: "2px 2px 2px grey",
                fontFamily: '"Dosis", sans-serif',
                padding: "10px",
                maxWidth: "130px",
                marginBottom: "20px",
              }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Formulario;
