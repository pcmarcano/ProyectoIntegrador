import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Modal,
  Stack,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClassIcon from "@mui/icons-material/Class";
import { useNavigate } from "react-router-dom";

const SpaceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const SpaceDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flexGrow: 1,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const [lugares, setLugares] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [nuevasCategorias, setNuevasCategorias] = useState([]);
  const [idCaracteristicas, setIdCaracteristicas] = useState([]);
  const [state, setState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Llamada a la API
    fetch("https://api.curso.spazioserver.online/lugares/listar")
      .then((response) => response.json())
      .then((data) => setLugares(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [state]);

  const deleteLugar = (id) => {
    fetch(`https://api.curso.spazioserver.online/lugares/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el lugar");
        }
        return response.text();
      })
      .then((message) => {
        console.log(message);
        setLugares((prevLugares) =>
          prevLugares.filter((lugar) => lugar.id !== id)
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  const [categorias, setCategorias] = React.useState([]);

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

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const agregarCategoria = (lugar) => {
    setSelectedLugar(lugar);
    setSelectedCategories(lugar.categorias);
    handleOpen();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectionChange = (event, values) => {
    setSelectedCategories(values);
    const selectedIds = values.map((category) => category.id);
    setNuevasCategorias(selectedIds);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    console.log(selectedLugar.caracteristicas);
    const caracteristicasIds = selectedLugar.caracteristicas.map(
      (caracteristica) => caracteristica.id
    );

    try {
      const updatedLugar = {
        ...selectedLugar,

        caracteristicas: caracteristicasIds,
        categorias: nuevasCategorias,
      };

      console.log(updatedLugar);

      const response = await fetch(
        `https://api.curso.spazioserver.online/lugares/actualizar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLugar),
        }
      );

      if (response.ok) {
        console.log("Solicitud HTTP PUT exitosa");
        setLugares((prevLugares) =>
          prevLugares.map((lugar) =>
            lugar.id === selectedLugar.id ? updatedLugar : lugar
          )
        );
        setState(!state);
        handleClose();
      } else {
        console.error("Error en la solicitud HTTP PUT:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud HTTP PUT:", error);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom></Typography>
      {lugares.map((lugar) => (
        <SpaceCard key={lugar.id}>
          <Modal
            open={open && selectedLugar?.id === lugar.id}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={3} sx={{ width: 350 }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={categorias.filter(
                    (cat) =>
                      !lugar.categorias.includes(cat.id) &&
                      !selectedCategories.map((sc) => sc.id).includes(cat.id)
                  )}
                  getOptionLabel={(option) => option.nombre}
                  filterSelectedOptions
                  value={selectedCategories}
                  onChange={handleSelectionChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecciona Categorias"
                      placeholder=""
                    />
                  )}
                />
              </Stack>
              <Button type="submit" onClick={() => handleSubmit()}>
                Actualizar
              </Button>
            </Box>
          </Modal>
          <Avatar
            alt={lugar.nombre}
            src={
              lugar.fotos.length > 0
                ? lugar.fotos[0].rutaFoto
                : "https://via.placeholder.com/150"
            }
            sx={{ width: 80, height: 80 }}
          />
          <SpaceDetails>
            <Typography style={{ fontFamily: "Dosis" }} variant="h6">
              {lugar.nombre}
            </Typography>
            <Typography
              style={{ fontFamily: "Dosis", fontWeight: "900" }}
              variant="h6"
            >
              #{lugar.id}
            </Typography>
            <Typography style={{ fontFamily: "Dosis" }} color="textSecondary">
              {lugar.categorias.map((cat) => (
                <div key={cat.id}>
                  <Typography style={{ fontFamily: "Dosis" }} variant="h6">
                    -> {cat.nombre}
                  </Typography>
                </div>
              ))}
            </Typography>
            {/*             <Typography style={{ fontFamily: "Dosis" }} color="textSecondary">
              {lugar.descripcion}
            </Typography>
            <Box mt={1}>
              {lugar.caracteristicas.map((caracteristica) => (
                <Typography
                  key={caracteristica.id}
                  variant="body2"
                  color="textSecondary"
                  style={{ fontFamily: "Dosis" }}
                >
                  - {caracteristica.nombre}
                </Typography>
              ))}
            </Box> */}
          </SpaceDetails>
          <Box>
            <Tooltip title="Editar">
              <IconButton color="primary" aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="secondary"
                aria-label="delete"
                onClick={() => deleteLugar(lugar.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Agregar Categoria">
              <IconButton
                color="secondary"
                aria-label="add-category"
                onClick={() => agregarCategoria(lugar)}
              >
                <ClassIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </SpaceCard>
      ))}
    </Container>
  );
};

export default Dashboard;
