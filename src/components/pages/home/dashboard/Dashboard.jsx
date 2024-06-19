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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
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
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [nuevasCategorias, setNuevasCategorias] = useState([]);
  const [idCaracteristicas, setIdCaracteristicas] = useState([]);
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  // Inicializa usuarios lugares categorias
  const [showLugares, setShowLugares] = useState(true);
  const [showUsuarios, setShowUsuarios] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);

  // para uso de desktop o no desktop
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  //const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  //#region llama API Lugares
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

  //const [categorias, setCategorias] = React.useState([]);

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
  //#endregion

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

  //#region llama API usuarios
  useEffect(() => {
    fetch("https://api.curso.spazioserver.online/usuarios/listar")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) =>
        console.error("Error buscando datos de usuarios:", error)
      );
  }, []);
  //#endregion

  //#region llama API categorias
  useEffect(() => {
    fetch("https://api.curso.spazioserver.online/categorias/listar")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) =>
        console.error("Error buscado datos de categorias:", error)
      );
  }, []);
  //#endregion

  const handleToggleLugares = () => {
    setShowLugares(true);
    setShowUsuarios(false);
    setShowCategorias(false);
  };

  const handleToggleUsuarios = () => {
    setShowLugares(false);
    setShowUsuarios(true);
    setShowCategorias(false);
  };

  const handleToggleCategorias = () => {
    setShowLugares(false);
    setShowUsuarios(false);
    setShowCategorias(true);
  };



  //#region return
  return (
    <Container maxWidth='md'>
      {isDesktop ? (
        <>
          <Typography style={{ fontFamily: "Dosis" }} variant='h4' gutterBottom>
            Panel de Administrador
          </Typography>

      {/**Botonera */}
      <Box display={"flex"} justifyContent={"center"} mb={2}>
        <Button
          variant='contained'
          onClick={handleToggleLugares}
          color={showLugares ? "secondary" : "primary"}
          style={{ marginRight: "1rem" }}
        >
          Mostrar Lugares
        </Button>
        <Button
          variant='contained'
          onClick={handleToggleUsuarios}
          color={showUsuarios ? "secondary" : "primary"}
          style={{ marginRight: "1rem" }}
        >
          Mostrar Usuarios
        </Button>
        <Button
          variant='contained'
          onClick={handleToggleCategorias}
          color={showCategorias ? "secondary" : "primary"}
          style={{ marginRight: "1rem" }}
        >
          Mostrar Categorias
        </Button>
      </Box>

      {/*Lista de lugares*/}
      {showLugares && (
        <>
          <Typography style={{ fontFamily: "Dosis" }} variant='h5' gutterBottom>
            Lugares
          </Typography>
          {lugares.map((lugar) => (
        <SpaceCard key={lugar.id}>
          <Modal
            open={open && selectedLugar?.id === lugar.id}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Stack spacing={3} sx={{ width: 350 }}>
                <Autocomplete
                  multiple
                  id='tags-outlined'
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
                      label='Selecciona Categorias'
                      placeholder=''
                    />
                  )}
                />
              </Stack>
              <Button type='submit' onClick={() => handleSubmit()}>
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
            <Typography style={{ fontFamily: "Dosis" }} variant='h6'>
              {lugar.nombre}
            </Typography>

            <Typography style={{ fontFamily: "Dosis" }} color='textSecondary'>
              {lugar.categorias.map((cat) => (
                <div key={cat.id}>
                  <Typography style={{ fontFamily: "Dosis" }} variant='h6'>
                    -> {cat.nombre}
                  </Typography>
                </div>
              ))}
            </Typography>
            {}
          </SpaceDetails>
          <Box>
            <Tooltip title='Editar'>
              <IconButton color='primary' aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar'>
              <IconButton
                color='secondary'
                aria-label='delete'
                onClick={() => deleteLugar(lugar.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Agregar Categoria'>
              <IconButton
                color='secondary'
                aria-label='add-category'
                onClick={() => agregarCategoria(lugar)}
              >
                <ClassIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </SpaceCard>
      ))}
        </>
      )}

      {/*Lista de usuarios */}
      {showUsuarios && (
        <>
          <Typography style={{ fontFamily: "Dosis" }} variant='h5' gutterBottom>
            Usuarios
          </Typography>
          <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>

                <TableCell>
                  {usuario.nombre} {usuario.apellido}
                </TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.tipoUsuario}</TableCell>
                <TableCell>

                  <IconButton color='primary'>
                    <EditIcon />
                  </IconButton>
                  <IconButton color='secondary'>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

          </TableContainer>
        </>
      )}

      {/*Lista de Categorías*/}
      {showCategorias && (
        <>
          <Typography style={{ fontFamily: "Dosis" }} variant='h5' gutterBottom>
            Categorías
          </Typography>
          <TableContainer component={Paper}>
            {/*  */}
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell>Nombre</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {categorias.map((categoria) => (
                  <TableRow key={categoria.id}>

                    <TableCell>{categoria.nombre}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}


        </>
      ) : (
        <>
          <Typography style={{ fontFamily: "Dosis" }} variant='h4' gutterBottom>
            Esta vista solo está disponible en dispositivos de escritorio.
          </Typography>
        </>
      )}
    </Container>
  );
};
//#endregion

export default Dashboard;
