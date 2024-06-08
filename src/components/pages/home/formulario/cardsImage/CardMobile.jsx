import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardMobile({ space, arrayFotos, caracteristicas, categorias, onReserve }) {
  const [fotoPortada, setFotoPortada] = React.useState(null);

  React.useEffect(() => {
    const esperarFotos = async (arrayFotos) => {
      if (arrayFotos.length > 0) {
        setFotoPortada(arrayFotos[0].rutaFoto);
      }
    };
    esperarFotos(arrayFotos);
  }, [arrayFotos]);

  const navigate = useNavigate();

  const openSpace = () => {
    navigate(`/space/${space.id}`);
  };

  return (
      <Card className="cards" sx={{ width: 275, marginBottom: "5rem" }}>
        <CardActionArea onClick={() => openSpace()}>
          <CardMedia
              component="img"
              width="270px"
              height="140"
              image={fotoPortada ? fotoPortada : "/placeholder.jpg"} // Default image placeholder
              alt={space.nombre}
          />
          <CardContent>
            <Typography style={{ fontFamily: "Dosis", fontSize: "1rem" }} gutterBottom variant="h6" component="div">
              ID: #{space.id}
            </Typography>
            <Typography style={{ fontFamily: "Dosis", fontWeight: "600", margin: "1rem" }} gutterBottom variant="h6" component="div">
              {space.nombre}
            </Typography>
            <Typography style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }} variant="body2" color="text.secondary">
              {space.descripcion}
            </Typography>
            <Typography style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }} variant="body2" color="text.secondary">
              {categorias.map((categoria, index) => (
                  <li key={index}>{categoria.nombre}</li>
              ))}
            </Typography>
            <Typography style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }} variant="body2" color="text.secondary">
              {caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica.nombre}</li>
              ))}
            </Typography>
            <Typography style={{ fontFamily: "Dosis", textAlign: "right", margin: "1rem" }} variant="body2" color="text.secondary">
              Cantidad fotos: {arrayFotos.length}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Button variant="contained" color="primary" onClick={onReserve}>
            Reservar
          </Button>
        </div>
      </Card>
  );
}
