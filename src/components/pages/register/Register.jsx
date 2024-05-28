import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const enviarSolicitud = async () => {           // Envía solicitud post al back para crear un usuario
        try {
          const response = await fetch('http://localhost:8080/usuarios/agregar', {  //Cambiar puerto a donde tengas hosteado tu back, generalmente es el 8080
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) 
        });
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación de campos
        let errors = {};
        if (!/^(?! )[a-zA-Z\s]+(?<!\s)$/.test(formData.nombre)) {
            errors.nombre = "Solo se pueden ingresas letras, mínimo 2 carácteres y no puede iniciar con espacio.";
        }
        if (!/^(?! )[a-zA-Z\s]+(?<!\s)$/.test(formData.apellido)) {
            errors.apellido = "Solo se pueden ingresas letras, mínimo 2 carácteres y no puede iniciar con espacio.";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "El email ingresado no es válido.";
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(formData.password)) {
            errors.password = "La contraseña debe contener 8 carácteres. (Mayúscula, minúscula, 0-9 y caracter especial)";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden.";
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            //BackEnd
            enviarSolicitud();
            console.log("Formulario enviado:", formData);
        }
    };

    return (
        <Box
            sx={{
                width: "calc(100% - 40px)",
                marginLeft: "20px",
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontFamily: '"Dosis", sans-serif',
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    rowSpacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ maxWidth: "350px" }}
                >
                    <Grid item xs={12}>
                        <TextField
                            name="nombre"
                            label="Nombre"
                            fullWidth
                            value={formData.nombre}
                            onChange={handleChange}
                            InputLabelProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
                            inputProps={{
                                style: {
                                    fontFamily: '"Dosis", sans-serif',
                                    height: "auto",
                                    boxSizing: "border-box",
                                },
                            }}
                            sx={{ backgroundColor: "white" }}
                        />
                        {errors.nombre && <FormHelperText error>{errors.nombre}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="apellido"
                            label="Apellido"
                            fullWidth
                            value={formData.apellido}
                            onChange={handleChange}
                            InputLabelProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
                            inputProps={{
                                style: {
                                    fontFamily: '"Dosis", sans-serif',
                                    height: "auto",
                                    boxSizing: "border-box",
                                },
                            }}
                            sx={{ backgroundColor: "white" }}
                        />
                        {errors.apellido && <FormHelperText error>{errors.apellido}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            InputLabelProps={{ style: { fontFamily: '"Dosis", sans-serif' } }}
                            inputProps={{
                                style: {
                                    fontFamily: '"Dosis", sans-serif',
                                    height: "auto",
                                    boxSizing: "border-box",
                                },
                            }}
                            sx={{ backgroundColor: "white" }}
                        />
                        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ fontFamily: '"Dosis", sans-serif', backgroundColor: "white" }}
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                style={{ fontFamily: '"Dosis", sans-serif' }}
                            >
                                Contraseña
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
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
                                inputProps={{
                                    style: {
                                        fontFamily: '"Dosis", sans-serif',
                                        height: "auto",
                                        boxSizing: "border-box",
                                    },
                                }}
                            />
                            {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ fontFamily: '"Dosis", sans-serif', backgroundColor: "white" }}
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                style={{ fontFamily: '"Dosis", sans-serif' }}
                            >
                                Confirmar contraseña
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
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
                                inputProps={{
                                    style: {
                                        fontFamily: '"Dosis", sans-serif',
                                        height: "auto",
                                        boxSizing: "border-box",
                                    },
                                }}
                            />
                            {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} mt={2}
                          sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                          }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                color: "white",
                                textTransform: "none",
                                textShadow: "2px 2px 2px grey",
                                fontFamily: '"Dosis", sans-serif',
                                padding: "10px",
                                marginBottom: "10px",
                                maxWidth: "130px",
                            }}
                        >
                            Registrarme
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            // onClick={() => navigate("/login")}
                            type="button"
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
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Register;