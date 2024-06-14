import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AuthContext } from "../../../../context/AuthContext";
import "./Card.css";
import axios from "axios";

export default function ActionAreaCard({
  datos,
  setActualizarLugares,
  actualizarLugares,
  isFavorite,
  setIsFavorite,
}) {
  const navigate = useNavigate();
  const { isLogged, userId } = React.useContext(AuthContext); // Accesa estado de authcontext

  const renderCorazon = (id) => {
    if (isFavorite.includes(id)) {
      return "red";
    } else {
      return "inherit";
    }
  };

  const openSpace = () => {
    navigate(`/space/${datos.id}`);
  };

  //#region Agregar o quitar favorito
  const toggleFavorite = async () => {
    console.log(userId, datos.id);
    try {
      await axios.post(
        `https://api.curso.spazioserver.online/usuarios/${userId}/favoritos/${datos.id}`
      );
      setIsFavorite([...isFavorite, datos.id]);
      setActualizarLugares(!actualizarLugares);
    } catch (error) {
      console.error("Error quitando/agregando favorito:", error);
    }
  };
  //#endregion

  return (
    <Card className="cards" sx={{ width: 275 }}>
      <CardActionArea onClick={openSpace}>
        <CardMedia
          component="img"
          width="270px"
          height="140"
          image={datos.fotos[0].rutaFoto} // Aquí asumo que siempre habrá al menos una foto
          alt={datos.nombre}
        />
        <CardContent>
          {/*           <Typography
            style={{ fontFamily: "Dosis", fontSize: "1rem" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            ID : #{datos.id}
          </Typography> */}
          <Typography
            style={{ fontFamily: "Dosis", fontWeight: "600" }}
            gutterBottom
            variant="h6"
            component="div"
          >
            {datos.nombre}
          </Typography>
          <Typography
            style={{ fontFamily: "Dosis", textAlign: "left", color: "grey" }}
            variant="body2"
            color="text.secondary"
          >
            Categorias:
            {datos.categorias.map((categoria) => (
              <h5 key={categoria.id}>{categoria.nombre} </h5>
            ))}
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

      {isLogged && ( // Muestra botón favorito solo si hay un usuario logueado
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            aria-label="favorite"
            onClick={toggleFavorite}
            style={{ color: renderCorazon(datos.id) }}
          >
            {isFavorite.includes(datos.id) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      )}
    </Card>
  );
}
