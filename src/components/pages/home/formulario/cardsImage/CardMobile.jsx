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

  const politicasDeUso = {
    "Sala de Reuniones": [
      "Respetar el horario reservado",
      "Prohibido fumar",
      "Prohibido superar la capacidad permitida de personas por turno",
      "Cuidar el mobiliario que se encuentra a disposición",
    ],
    "Sala de Juegos": [
      "Prohibido el uso indebido de los elementos puestos a disposición",
      "Prohibido dejar menores sin supervisión de un adulto",
      "Cuidar los juegos, no escribir, ni romper los mismo",
      "Prohibido fumar",
      "Prohibido correr",
    ],
    "Sala de Lectura": [
      "Se ruega guardar silencio",
      "Respetar los lugares asignados",
      "Cuidar los libros y el mobiliario",
      "Prohibido llegerse libros sin autorización expresa",
      "Prohibido fumar",
    ],
    "Salón de Fiestas": [
      "Respetar el horario reservado",
      "Prohibido fumar",
      "Prohibido superar la capacidad permitida de personas por turno",
      "Cuidar el mobiliario que se encuentra a disposición",
      "Prohibido arrojar basura",
      "Se ruega mantener el orden",
    ],
    "Sum y Parrilla": [
      "Respetar el horario reservado",
      "Prohibido fumar",
      "Prohibido superar la capacidad permitida de personas por turno",
      "Cuidar el mobiliario que se encuentra a disposición",
      "Prohibido arrojar basura",
      "Se ruega mantener el orden",
    ],
    "Patio para Mascotas": [
      "Prohibido correo o jugar en el sector",
      "Prohibidas las mascotas",
      "Prohibido consumir bebidas alcohólicas",
      "Prohibido dejar basura u otros elementos desechables",
    ],
    "Gimnasio": [
      "Se ruega mantener el orden de los elementos",
      "Cuidar la limpieza",
      "No maltratar los elementos",
      "Cuidar los elementos personales",
      "Respetar los horarios de uso",
    ],
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
            {/* Políticas de uso */}
            <Typography style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }} variant="body2" color="text.secondary">
            <div>
              <h3 style={{ fontFamily: "Dosis", fontWeight: "800", marginBottom: "0.5rem", borderBottom: "2px solid #FF9550", paddingBottom: "0.5rem" }}>
                Políticas de uso
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gridGap: "1rem", width: "100%" }}>
                {politicasDeUso[space.nombre]?.map((politica, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h6 style={{ fontFamily: "Dosis", fontSize: "100%", fontWeight: "600", marginBottom: "0.5rem" }}>
                      Política {index + 1}
                    </h6>
                    <p style={{ fontFamily: "Dosis", fontSize: "90%", fontWeight: "400", margin: "0" }}>
                      {politica}
                    </p>
                  </div>
                ))}
                {!politicasDeUso[space.nombre] && (
                  <div
                    style={{
                      backgroundColor: "#f9f9f9",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p style={{ fontFamily: "Dosis", fontSize: "100%", fontWeight: "400", margin: "0" }}>
                      No hay políticas de uso disponibles para este lugar.
                    </p>
                  </div>
                )}
              </div>
            </div>
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
