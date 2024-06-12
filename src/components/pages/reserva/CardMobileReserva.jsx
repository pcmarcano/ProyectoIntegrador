import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CardMobileReserva = ({ space, arrayFotos, caracteristicas, categorias }) => {
    const navigate = useNavigate();
    const fotoPortada = arrayFotos.length > 0 ? arrayFotos[0].rutaFoto : "/placeholder.jpg"; // Use the first photo as cover image

    const handleButtonClick = () => {
        navigate("/list");
    };

    return (
        <Card className="cards" sx={{ width: 275, marginBottom: "5rem", position: "relative" }}>
            <CardMedia
                component="img"
                width="270px"
                height="140"
                image={fotoPortada}
                alt={space.nombre}
            />
            <CardContent>
                <Typography
                    style={{ fontFamily: "Dosis", fontSize: "1rem" }}
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    ID: #{space.id}
                </Typography>
                <Typography
                    style={{ fontFamily: "Dosis", fontWeight: "600", margin: "1rem" }}
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    {space.nombre}
                </Typography>
                <Typography
                    style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }}
                    variant="body2"
                    color="text.secondary"
                >
                    {space.descripcion}
                </Typography>
                <Typography
                    style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }}
                    variant="body2"
                    color="text.secondary"
                >
                    Categorías:
                    {categorias.map((categoria, index) => (
                        <li key={index}>{categoria.nombre}</li>
                    ))}
                </Typography>
                <Typography
                    style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }}
                    variant="body2"
                    color="text.secondary"
                >
                    Características:
                    {caracteristicas.map((caracteristica, index) => (
                        <li key={index}>{caracteristica.nombre}</li>
                    ))}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}
                    sx={{
                        position: "absolute",
                        bottom: "7px",
                        right: "7px",
                        backgroundColor: "#FF9550",
                        '&:hover': {
                            backgroundColor: "#115293",
                        },
                        fontFamily: "Dosis",
                        textTransform: "none",
                    }}
                >
                    Ver más espacios
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardMobileReserva;
