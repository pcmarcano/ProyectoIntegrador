import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import LockResetIcon from "@mui/icons-material/LockReset";
import { AuthContext } from "../../../context/AuthContext";

const UserInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const UserDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: theme.spacing(1),
  },
}));

const Cuenta = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      fetch(
        `https://api.curso.spazioserver.online/usuarios/email/${user.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user]);

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>
      {userData && ( // Conditional rendering based on userData
        <UserInfo>
          <Avatar
            sx={{
              bgcolor: "#FF9550",
              marginRight: "20px",
              width: "70px",
              height: "70px",
            }}
          >
            {userData.nombre.charAt(0).toUpperCase()}
            {userData.apellido.charAt(0).toUpperCase()}
          </Avatar>
          <UserDetails>
            <Typography color="textSecondary">
              Nombre: {userData.nombre}
            </Typography>
            <Typography color="textSecondary">
              Apellido: {userData.apellido}
            </Typography>
            <Typography color="textSecondary">
              Email: {userData.email}
            </Typography>
            <Typography color="textSecondary">Tipo: {user?.rol}</Typography>
            {/*<Typography color="textSecondary">{userData?.phone}</Typography>*/}
          </UserDetails>
        </UserInfo>
      )}
      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<LockResetIcon />}
        >
          Cambiar Contraseña
        </Button>
      </Grid>
    </Container>
  );
};

export default Cuenta;
