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
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { db, loginGoogle, onSignIn } from "../../../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isNarrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const userAgentIstagram = "Instagram";

  const [isInstagramBrowser, setIsInstagramBrowser] = useState(false);

  useEffect(() => {
    const userAgentRequest = window.navigator.userAgent;
    if (userAgentRequest.includes(userAgentIstagram)) {
      setIsInstagramBrowser(true);
    }
  }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez

  console.log(isInstagramBrowser);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  console.log(userCredentials);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await onSignIn(userCredentials); // Asumo que tienes una función onSignIn para el inicio de sesión
      if (res.user) {
        const userCollection = collection(db, "users");
        const userRef = doc(userCollection, res.user.uid);
        console.log(res.user);
        const userDoc = await getDoc(userRef);
        let finalyUser = {
          email: res.user.email,
          rol: userDoc.data().roll,
        }; // Obtén los datos del documento
        console.log(finalyUser);
        handleLogin(finalyUser);
        // Asumo que tienes una función navigate para redirigir al usuario

        navigate("/");

        // No necesitas el 'return getDoc(userDoc);' ya que no parece necesario aquí
      }
    } catch (error) {
      alert(
        "Las credenciales ingresadas no son validas. Por favor, comuniquese con el administrador. \n\n Email: usuarios@spazioserver.app \n Tel: +54 9 (011)6870-2318"
      );
      console.log(error);
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const googleSingIn = async () => {
    try {
      const res = await loginGoogle();
      console.log(res);

      if (res.user) {
        const userCollection = collection(db, "users");
        const userRef = doc(userCollection, res.user.uid);

        const userDoc = await getDoc(userRef);
        console.log(userRef);

        if (!userDoc.exists()) {
          const fullName = res.user.displayName;
          const [firstName, lastName] = fullName.split(" ");
          const userData = {
            name: firstName,
            apellido: lastName,
            email: res.user.email,
            roll: "usuario",
            fechaInicio: serverTimestamp(),
          };
          console.log(userData);

          await setDoc(userRef, userData);
        }

        const finalyUser = {
          email: res.user.email,
          rol: "usuario",
        };
        handleLogin(finalyUser);
        navigate("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
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
          // alignItems="center"
          justifyContent={"center"}
          style={{ maxWidth: "600px" }}
        >
          <Grid item xs={10} md={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                onChange={handleChange}
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
          <Link
            to="/forgot-password"
            style={{ color: "steelblue", marginTop: "10px" }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={5}>
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
                Ingresar
              </Button>
            </Grid>
            {!isInstagramBrowser && (
              <Grid item xs={10} md={5}>
                <Tooltip title="ingresa con google">
                  <Button
                    onClick={googleSingIn}
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    type="button"
                    fullWidth
                    sx={{
                      color: "white",
                      textTransform: "none",
                      textShadow: "2px 2px 2px grey",
                    }}
                  >
                    Ingresa con google
                  </Button>
                </Tooltip>
              </Grid>
            )}

            <Grid item xs={10} md={8}>
              <Typography
                color={"secondary.primary"}
                variant={"body"}
                mt={1}
                style={{
                  display: "fle",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    marginTop: "1rem",
                    fontFamily: '"Roboto Condensed", sans-serif',
                    textAlign: "center",
                  }}
                >
                  ¿Aun no tienes cuenta?
                </p>
              </Typography>
            </Grid>
            <Grid item xs={10} md={5}>
              <Tooltip title="ingresa con google">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/register")}
                  type="button"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                  }}
                >
                  Registrate
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
