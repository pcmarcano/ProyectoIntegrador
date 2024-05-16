import React, { useEffect, useState } from "react";
import CardGrande from "../cardsImage/CardGrande";
import CardChica from "../cardsImage/CardChica";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Search from "../../search/Search.jsx";
import "./EspacioVista.css";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardMobile from "../cardsImage/CardMobile.jsx";

const EspacioVista = () => {
  const { id } = useParams();

  const [space, setSpace] = useState([]);
  const [arrayFotos, setArrayFotos] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Llamada a la API
    fetch(`https://api.spazio.spazioserver.online/lugares/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSpace(data);
        arrFotos(data); // Llama a arrFotos después de establecer space
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const arrFotos = (data) => {
    if (data && data.fotos && data.fotos.length > 0) {
      // Asegura que data y data.fotos no sean nulos y tengan al menos un elemento
      let arr = [];
      data.fotos.forEach((element) => {
        arr.push(element);
      });
      setArrayFotos(arr);
    }
  };

  return (
    <div style={{ width: "100vw" }}>
      <Search />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gridTemplateColumns: "70% auto", // 50% para el CardGrande, y el resto se divide automáticamente
              width: "50rem", // Ajustar al 100% del contenedor
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gridTemplateColumns: "70% auto", // 50% para el CardGrande, y el resto se divide automáticamente
                width: "100%", // Ajustar al 100% del contenedor
                marginTop: "1rem",
              }}
            >
              {arrayFotos.length > 0 && arrayFotos.length < 2 && (
                <div className="card-group">
                  <CardGrande arrayFotos={arrayFotos[0]} onlyOne={false} />
                </div>
              )}
              {arrayFotos.length > 2 && arrayFotos.length < 6 && (
                <div className="card-group">
                  <CardGrande arrayFotos={arrayFotos[0]} onlyOne={true} />
                </div>
              )}

              {arrayFotos.length < 3 && arrayFotos.length > 1 && (
                <div>
                  <div className="card-group">
                    {arrayFotos.slice(0, 2).map((foto, index) => (
                      <div key={index}>
                        <CardChica key={index} foto={foto} dos={true} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {arrayFotos.length <= 3 && arrayFotos.length >= 3 && (
                <div>
                  <div className="card-group">
                    {arrayFotos.slice(0, 2).map((foto, index) => (
                      <div key={index}>
                        <CardChica key={index} foto={foto} tres={true} />
                      </div>
                    ))}
                  </div>
                  <div className="card-group">
                    {arrayFotos.slice(2, 4).map((foto, index) => (
                      <div key={index}>
                        <CardChica key={index} foto={foto} tres={true} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {arrayFotos.length > 3 && (
                <div>
                  <div className="card-group">
                    {arrayFotos.slice(0, 2).map((foto, index) => (
                      <div key={index}>
                        <CardChica key={index} foto={foto} />
                      </div>
                    ))}
                  </div>
                  <div className="card-group">
                    {arrayFotos.slice(2, 4).map((foto, index) => (
                      <div key={index}>
                        <CardChica key={index} foto={foto} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                width: "100%",
                height: "15rem",
                borderRadius: "50px",
                borderTopRightRadius: "0px",
                borderTopLeftRadius: "0px",
                background: "linear-gradient(to right top, #ffffff, #f3f3f3)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Contenido de tu tarjeta grande */}

              <div>
                <p
                  style={{
                    fontFamily: "Dosis",
                    fontSize: "120%",
                    fontWeight: "8w00",
                    margin: "1rem",
                  }}
                >
                  {space.nombre}
                </p>
                <h6
                  style={{
                    fontFamily: "Dosis",
                    fontSize: "120%",
                    fontWeight: "600",
                    margin: "1rem",
                  }}
                >
                  {space.descripcion}
                </h6>
                <div style={{ width: "100%", textAlign: "right" }}>
                  <Button
                    variant="text"
                    style={{
                      color: "#FF9550",
                      marginBottom: "2rem",
                      fontWeight: "600",
                      fontFamily: "Dosis",
                    }}
                  >
                    Ver más
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div style={{ marginTop: "5rem" }}>
            <CardMobile space={space} arrayFotos={arrayFotos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EspacioVista;
