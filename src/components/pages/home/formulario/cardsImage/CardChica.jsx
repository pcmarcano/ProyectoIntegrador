import { SpaceBar } from "@mui/icons-material";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const CardChica = ({ foto, index, dos, tres }) => {
  console.log(dos, tres);
  return (
    <div className="square3" style={{ padding: 0, margin: 0 }}>
      <Card
        key={index} // Asegúrate de usar una clave única para cada iteración en un array en React
        sx={{
          width: dos ? "25rem" : "12.5rem",
          height: dos ? "15rem" : "7.5rem",
          padding: 0,
          margin: 0,
          borderRadius: "0px",
        }}
      >
        <Link>
          <CardMedia
            component="img"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} // Estilo para hacer que la imagen ocupe todo el espacio
            image={foto.rutaFoto}
          />
        </Link>
      </Card>
    </div>
  );
};

export default CardChica;
