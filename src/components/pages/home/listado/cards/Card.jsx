import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Card.css";

export default function ActionAreaCard({ datos }) {
  console.log(datos);
  const navigate = useNavigate();

  const openSpace = () => {
    navigate(`/space/${datos.id}`);
  };

  return (
    <Card className="cards" sx={{ width: 275 }}>
      <CardActionArea onClick={() => openSpace()}>
        <CardMedia
          component="img"
          width="270px"
          height="140"
          image={datos.fotos[0].rutaFoto} // Aquí asumo que siempre habrá al menos una foto
          alt={datos.nombre}
        />

        <CardContent>
          <Typography
            style={{ fontFamily: "Dosis", fontSize: "1rem" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            ID : #{datos.id}
          </Typography>
          <Typography
            style={{ fontFamily: "Dosis", fontWeight: "600" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {datos.nombre}
          </Typography>
          <Typography
            style={{ fontFamily: "Dosis", textAlign: "right" }}
            variant="body2"
            color="text.secondary"
          >
            Cantidad fotos: {datos.fotos.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
