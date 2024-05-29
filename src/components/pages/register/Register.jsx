import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, signUp } from "../../../firebaseConfig";

import { useTheme } from "@mui/material/styles";

const Register = () => {
  const navigate = useNavigate();
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    apellido: "",
    numeroTelefono: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  const theme = useTheme();
  const isNarrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    // Validate and allow only numeric characters for phone number
    if (e.target.name === "telefono" && !/^\d*$/.test(e.target.value)) {
      setErrorTelefono("El formato del telefono es incorrecto");
      return;
    } else {
      setErrorTelefono(""); // Restablecer el error a una cadena vacía si el formato es correcto
    }

    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, apellido, telefono, confirmPassword } =
      userCredentials;

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const res = await signUp({ email, password });

      let userAgentRequest;
      try {
        userAgentRequest = window.navigator.userAgent;
      } catch (error) {
        console.log(error);
      }

      if (res.user.uid) {
        const userDoc = {
          email: res.user.email,
          roll: "customer",
          name,
          apellido,
          telefono,
          fechaInicio: serverTimestamp(),
          userAgent: userAgentRequest,
        };
        await setDoc(doc(db, "users", res.user.uid), userDoc);
      }
      navigate("/");
    } catch (error) {
      // Manejo de errores de Firebase
      console.error(error);
      // Mostrar un mensaje de error al usuario
      if (error.code === "auth/email-already-in-use") {
        // Aquí puedes mostrar un mensaje al usuario indicando que la dirección de correo electrónico ya está en uso
        // Por ejemplo:
        setErrorLogin("La dirección de correo electrónico ya está en uso.");
      } else {
        // Puedes manejar otros tipos de errores aquí
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",

        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        padding: "5%",
        paddingTop: "0",

        // backgroundColor: theme.palette.secondary.main,
      }}
    >
      <img
        src="../../../Logo1.png"
        alt="logo"
        style={{
          width: isNarrowScreen ? "70%" : "auto",
          maxWidth: "400px",
          margin: "1rem",
          marginBottom: "5rem",
        }}
      />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          justifyContent="center"
          style={{ maxWidth: "600px" }}
        >
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="name"
              label="Nombre"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="apellido"
              label="Apellido"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="telefono"
              label="Número de Teléfono"
              fullWidth
              error={errorTelefono !== ""}
              helperText={errorTelefono}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth error={passwordError}>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth error={passwordError}>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar contraseña"
              />
            </FormControl>
          </Grid>
          {passwordError && (
            <Grid item xs={10} md={12}>
              <p style={{ color: "red" }}>Las contraseñas no coinciden.</p>
            </Grid>
          )}
          {errorLogin && (
            <Grid item xs={10} md={12}>
              <p style={{ color: "red" }}>
                Este correo ya tiene una cuenta asociada
              </p>
              <p style={{ color: "red" }}>
                Haz click{" "}
                <Link style={{ color: "blue" }} to="/forgot-password">
                  aqui
                </Link>{" "}
                para reestablecer su contraseña
              </p>
            </Grid>
          )}
          <Grid
            container
            style={{ display: "flex" }}
            justifyContent="center"
            spacing={3}
            mt={2}
          >
            <Grid item xs={5} md={5}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  textTransform: "none",
                  textShadow: "2px 2px 2px grey",
                }}
              >
                Regresar
              </Button>
            </Grid>
            <Grid item xs={5} md={5}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "#FF9550",
                  color: "white",
                  textTransform: "none",
                  textShadow: "2px 2px 2px grey",
                }}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;
