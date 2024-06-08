import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CardMobileReserva = ({ space, arrayFotos, caracteristicas, categorias }) => {
    const fotoPortada = arrayFotos.length > 0 ? arrayFotos[0].rutaFoto : "/placeholder.jpg"; // Use the first photo as cover image

    return (
        <Card className="cards" sx={{ width: 275, marginBottom: "5rem" }}>
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
                <Typography
                    style={{ fontFamily: "Dosis", textAlign: "right", margin: "1rem" }}
                    variant="body2"
                    color="text.secondary"
                >
                    Cantidad fotos: {arrayFotos.length}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardMobileReserva;
