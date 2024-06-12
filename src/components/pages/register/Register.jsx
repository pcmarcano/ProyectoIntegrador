import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp } from "../../../firebaseConfig"; // Asegúrate de importar tu servicio de autenticación
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Register = () => {
  const navigate = useNavigate();
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    apellido: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const isNarrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validateFields = () => {
    const newErrors = {};

    if (!userCredentials.name) {
      newErrors.name = "Nombre no puede estar en blanco";
    } else if (
      userCredentials.name.length < 2 ||
      userCredentials.name.length > 30
    ) {
      newErrors.name = "Nombre debe tener entre 2 y 30 caracteres";
    }

    if (!userCredentials.apellido) {
      newErrors.apellido = "Apellido no puede estar en blanco";
    } else if (
      userCredentials.apellido.length < 2 ||
      userCredentials.apellido.length > 50
    ) {
      newErrors.apellido = "Apellido debe tener entre 2 y 50 caracteres";
    }

    if (!userCredentials.email) {
      newErrors.email = "Email no puede estar en blanco";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userCredentials.email)
    ) {
      newErrors.email = "Email debe ser un email válido";
    }

    if (!userCredentials.password) {
      newErrors.password = "Contraseña no puede estar en blanco";
    } else if (userCredentials.password.length < 8) {
      newErrors.password = "Contraseña debe tener por lo menos 8 caracteres";
    }

    if (userCredentials.password !== userCredentials.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.name === "telefono" && !/^\d*$/.test(e.target.value)) {
      setErrorTelefono("El formato del telefono es incorrecto");
      return;
    } else {
      setErrorTelefono("");
    }

    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const { email, password, name, apellido, telefono, confirmPassword } =
      userCredentials;

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
          roll: "usuario",
          name,
          apellido,
          telefono,
          fechaInicio: serverTimestamp(),
          userAgent: userAgentRequest,
        };
        await setDoc(doc(db, "users", res.user.uid), userDoc);
      }

      const usuarioEntradaDTO = {
        nombre: name,
        apellido: apellido,
        email: email,
        password: password,
        firebase: res.user.uid,
      };

      const response = await fetch(
        "https://api.curso.spazioserver.online/usuarios/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioEntradaDTO),
        }
      );

      if (response.ok) {
        console.log(
          "User added to secondary database successfully with status 200"
        );
      } else {
        console.log("Failed to add user to secondary database");
        throw new Error("Failed to add user to secondary database");
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setErrorLogin("La dirección de correo electrónico ya está en uso.");
      } else {
        setErrorLogin("Ocurrió un error al registrar el usuario.");
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
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="apellido"
              label="Apellido"
              fullWidth
              error={!!errors.apellido}
              helperText={errors.apellido}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="telefono"
              label="Número de Teléfono"
              fullWidth
              error={!!errorTelefono}
              helperText={errorTelefono}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              onChange={handleChange}
              name="email"
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth error={!!errors.password}>
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
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
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
          {errors.confirmPassword && (
            <Grid item xs={10} md={12}>
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            </Grid>
          )}
          {errorLogin && (
            <Grid item xs={10} md={12}>
              <p style={{ color: "red" }}>{errorLogin}</p>
              <p style={{ color: "red" }}>
                Haz click{" "}
                <Link style={{ color: "blue" }} to="/forgot-password">
                  aquí
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
