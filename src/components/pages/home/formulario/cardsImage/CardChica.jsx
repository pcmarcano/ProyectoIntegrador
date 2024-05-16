import { SpaceBar } from "@mui/icons-material";
import { Card, CardActionArea, CardMedia } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CardChica = ({ foto, index }) => {
  return (
    <div className="square3" style={{ padding: 0, margin: 0 }}>
      <Card
        key={index} // Asegúrate de usar una clave única para cada iteración en un array en React
        sx={{
          width: "12.5rem",
          height: "7.5rem",
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
