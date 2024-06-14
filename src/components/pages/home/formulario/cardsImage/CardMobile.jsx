import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CardMobile({
  space,
  arrayFotos,
  caracteristicas,
  categorias,
}) {
  const [fotoPortada, setFotoPortada] = React.useState(false);

  React.useEffect(() => {
    const esperarFotos = async (arrayFotos) => {
      if (arrayFotos.length > 0) {
        setFotoPortada(arrayFotos[0].rutaFoto);
      }
    };
    esperarFotos(arrayFotos);
  }, [arrayFotos]);

  console.log(arrayFotos);
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
          image={fotoPortada ? fotoPortada : null} // Aquí asumo que siempre habrá al menos una foto
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
            {categorias.map((categoria, index) => (
              <li key={index}>{categoria.nombre}</li>
            ))}
          </Typography>
          <Typography
            style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }}
            variant="body2"
            color="text.secondary"
          >
            {caracteristicas.map((categoria, index) => (
              <li key={index}>{categoria.nombre}</li>
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
      </CardActionArea>
    </Card>
  );
}
