import React, { useEffect, useState } from "react";
import CardGrande from "../cardsImage/CardGrande";
import CardChica from "../cardsImage/CardChica";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Search from "../../search/Search.jsx";
import "./EspacioVista.css";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardMobile from "../cardsImage/CardMobile.jsx";

const EspacioVista = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [space, setSpace] = useState([]);
    const [arrayFotos, setArrayFotos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [politicas, setPoliticas] = useState([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        // Llamada a la API
        fetch(`https://api.curso.spazioserver.online/lugares/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSpace(data);
                setCategorias(data.categorias);
                setCaracteristicas(data.caracteristicas);
                arrFotos(data); // Llama a arrFotos después de establecer space
                setPoliticas(data.politicas && Array.isArray(data.politicas) ? data.politicas : []); //por el momento
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    console.log(categorias);
    console.log(politicas);

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


const politicaRenderMap = {
  1: (
    <h1 style={{ color: "black" }}>
      Respetar el horario reservado
    </h1>
  ),
  2: (
    <h1 style={{ color: "black" }}>
      Prohibido fumar
    </h1>
  ),
  3: (
    <h1 style={{ color: "black" }}>
      Prohibido superar la capacidad permitida de personas por turno
    </h1>
  ),
  4: (
    <h1 style={{ color: "black" }}>
      Cuidar el mobiliario que se encuentra a disposición
    </h1>
  ),
  5: (
    <h1 style={{ color: "black" }}>
      Prohibido el uso indebido de los elementos puestos a disposición
    </h1>
  ),
  6: (
    <h1 style={{ color: "black" }}>
      Prohibido dejar menores sin supervisión de un adulto
    </h1>
  ),
  7: (
    <h1 style={{ color: "black" }}>
      Cuidar los juegos, no escribir, ni romper los mismos
    </h1>
  ),
  8: (
    <h1 style={{ color: "black" }}>
      Prohibido correr
    </h1>
  ),
  9: (
    <h1 style={{ color: "black" }}>
      Se ruega guardar silencio
    </h1>
  ),
  10: (
    <h1 style={{ color: "black" }}>
      Respetar los lugares asignados
    </h1>
  ),
  11: (
    <h1 style={{ color: "black" }}>
      Cuidar los libros y el mobiliario
    </h1>
  ),
  12: (
    <h1 style={{ color: "black" }}>
      Prohibido llevarse libros sin autorización expresa
    </h1>
  ),
  13: (
    <h1 style={{ color: "black" }}>
      Prohibido arrojar basura
    </h1>
  ),
  14: (
    <h1 style={{ color: "black" }}>
      Se ruega mantener el orden
    </h1>
  ),
  15: (
    <h1 style={{ color: "black" }}>
      Cuidar el mobiliario que se encuentra a disposición
    </h1>
  ),
  16: (
    <h1 style={{ color: "black" }}>
      Prohibido correr o jugar en el sector
    </h1>
  ),
  17: (
    <h1 style={{ color: "black" }}>
      Prohibidas las mascotas
    </h1>
  ),
  18: (
    <h1 style={{ color: "black" }}>
      Prohibido consumir bebidas alcohólicas
    </h1>
  ),
  19: (
    <h1 style={{ color: "black" }}>
      Prohibido dejar basura u otros elementos desechables
    </h1>
  ),
  20: (
    <h1 style={{ color: "black" }}>
      Prohibido dejar basura u otros elementos desechables
    </h1>
  ),
  21: (
    <h1 style={{ color: "black" }}>
      Se ruega mantener el orden de los elementos
    </h1>
  ),
  22: (
    <h1 style={{ color: "black" }}>
      Respetar los horarios de uso
    </h1>
  ),
  23: (
    <h1 style={{ color: "black" }}>
      Se ruega mantener la limpieza
    </h1>
  ),
  24: (
    <h1 style={{ color: "black" }}>
      Recoger las heces de sus mascotas
    </h1>
  ),
  25: (
    <h1 style={{ color: "black" }}>
      Se ruega mantener el orden de los elementos
    </h1>
  ),
  26: (
    <h1 style={{ color: "black" }}>
      Cuidar la limpieza
    </h1>
  ),
  27: (
    <h1 style={{ color: "black" }}>
      No maltratar los elementos
    </h1>
  ),
  28: (
    <h1 style={{ color: "black" }}>
      Cuidar los elementos personales
    </h1>
  ),
};

  const caracteristicaRenderMap = {
    1: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          groups
        </span>
      </h1>
    ),
    2: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          groups
        </span>
      </h1>
    ),
    3: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          groups
        </span>
      </h1>
    ),
    4: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          mode_cool
        </span>
      </h1>
    ),
    5: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          thermostat
        </span>
      </h1>
    ),
    6: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          thermometer_add
        </span>
      </h1>
    ),
    7: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          auto_stories
        </span>
      </h1>
    ),
    8: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          table_bar
        </span>
      </h1>
    ),
    9: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          settings_accessibility
        </span>
      </h1>
    ),
    10: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          coffee_maker
        </span>
      </h1>
    ),
    11: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          restaurant
        </span>
      </h1>
    ),
    12: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          chair
        </span>
      </h1>
    ),
    13: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          dry_cleaning
        </span>
      </h1>
    ),
    14: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          ar_stickers
        </span>
      </h1>
    ),
    15: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          sports_esports
        </span>
      </h1>
    ),
    16: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          sports_soccer
        </span>
      </h1>
    ),
    17: (
      <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} class="material-symbols-outlined">
          camera_indoor
        </span>
      </h1>
    ),
  };

    const handleReserve = () => {
        navigate(`/reserva/${id}`);
    };

    return (
        <div style={{ width: "100vw", height: "100%" }}>
            <Search />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                {!isMobile && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50rem",
                            marginTop: "1rem",
                            height: "auto",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
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
                                height: "auto",
                                borderRadius: "50px",
                                borderTopRightRadius: "0px",
                                borderTopLeftRadius: "0px",
                                background: "linear-gradient(to right top, #ffffff, #f3f3f3)",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                padding: "1rem",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    margin: "2rem",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {categorias.map((categoria, index) => (
                                    <h6
                                        style={{
                                            fontFamily: "Dosis",
                                            fontSize: "120%",
                                            fontWeight: "600",
                                            margin: "1rem",
                                        }}
                                        key={index}
                                    >
                    <span
                        style={{ color: "black" }}
                        className="material-symbols-outlined"
                    >
                      done_outline
                    </span>

                                        {categoria.nombre}
                                    </h6>
                                ))}
                            </div>
                            {/* Contenido de tu tarjeta grande */}

                            <div>
                                <h6
                                    style={{
                                        fontFamily: "Dosis",
                                        fontSize: "120%",
                                        fontWeight: "600",
                                        margin: "1rem",
                                    }}
                                >
                                    {space.nombre}
                                </h6>
                                <h6
                                    style={{
                                        fontFamily: "Dosis",
                                        fontSize: "120%",
                                        fontWeight: "100",
                                        margin: "1rem",
                                    }}
                                >
                                    {space.descripcion}
                                </h6>

                                <h6
                                    style={{
                                        fontFamily: "Dosis",
                                        fontSize: "120%",
                                        fontWeight: "600",
                                        margin: "1rem",
                                        color: "black",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "Dosis",
                                            fontSize: "120%",
                                            fontWeight: "100",
                                            margin: "1rem",
                                        }}
                                    >
                                        Caracteristicas:
                                    </p>

                                    {caracteristicas.map((categoria, index) => (
                                        <div
                                            style={{
                                              
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                            }}
                                            key={index}
                                        >
                                            <p style={{ textAlign: "left" }}>
                                                {caracteristicaRenderMap[categoria.id]}
                                            </p>
                                            <p style={{ textAlign: "left" }}>{categoria.nombre}</p>
                                        </div>
                                    ))}
                                </h6>

                                <h6
                                    style={{
                                        fontFamily: "Dosis",
                                        fontSize: "120%",
                                        fontWeight: "600",
                                        margin: "1rem",
                                        color: "black",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "Dosis",
                                            fontSize: "120%",
                                            fontWeight: "100",
                                            margin: "1rem",
                                        }}
                                    >
                                        Políticas de Uso:
                                    </p>
                                      
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "1rem",
                                            alignItems: "start",
                                        }}
                                    >
                                        {politicas.map((politica, index) => (
                                            <div key={index} style={{ width: "100%", margin: "1rem 0" }}>
                                                <h6
                                                    style={{
                                                        fontFamily: "Dosis",
                                                        fontSize: "120%",
                                                        fontWeight: "600",
                                                        marginBottom: "0.5rem",
                                                    }}
                                                >
                                                    {politicaRenderMap[politica.id]}
                                                </h6>
                                                <p style={{ fontFamily: "Dosis", fontSize: "100%", margin: 0 }}>
                                                    {politica.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
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

                                <div style={{ width: "100%", textAlign: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleReserve}
                                    >
                                        Reservar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isMobile && (
                    <div style={{ marginTop: "5rem" }}>
                        <CardMobile
                            space={space}
                            arrayFotos={arrayFotos}
                            caracteristicas={caracteristicas}
                            categorias={categorias}
                            politicas={politicas}
                            onReserve={handleReserve}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EspacioVista;