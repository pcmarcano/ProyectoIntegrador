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
import StarRating from "./StarRating.jsx";

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
                setPoliticas(data.politicas); //por el momento
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
        Gimnasio: [
            "Se ruega mantener el orden de los elementos",
            "Cuidar la limpieza",
            "No maltratar los elementos",
            "Cuidar los elementos personales",
            "Respetar los horarios de uso",
        ],
    };

    const caracteristicaRenderMap = {
        1: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          groups
        </span>
            </h1>
        ),
        2: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          groups
        </span>
            </h1>
        ),
        3: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          groups
        </span>
            </h1>
        ),
        4: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          mode_cool
        </span>
            </h1>
        ),
        5: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          thermostat
        </span>
            </h1>
        ),
        6: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          thermometer_add
        </span>
            </h1>
        ),
        7: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          auto_stories
        </span>
            </h1>
        ),
        8: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          table_bar
        </span>
            </h1>
        ),
        9: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          settings_accessibility
        </span>
            </h1>
        ),
        10: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          coffee_maker
        </span>
            </h1>
        ),
        11: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          restaurant
        </span>
            </h1>
        ),
        12: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          chair
        </span>
            </h1>
        ),
        13: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          dry_cleaning
        </span>
            </h1>
        ),
        14: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          ar_stickers
        </span>
            </h1>
        ),
        15: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          sports_esports
        </span>
            </h1>
        ),
        16: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          sports_soccer
        </span>
            </h1>
        ),
        17: (
            <h1 style={{ color: "black" }}>
        <span style={{ color: "black" }} className="material-symbols-outlined">
          camera_indoor
        </span>
            </h1>
        ),
    };

    const handleReserve = () => {
        navigate(`/reserva/${id}`);
    };

    return (
        <div style={{ width: "100vw", marginBottom: "20px"}}>
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

                                <StarRating />

                                <h6
                                    style={{
                                        fontFamily: "Dosis",
                                        fontSize: "120%",
                                        fontWeight: "600",
                                        margin: "1rem",
                                        color: "black",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            borderBottom: "2px solid #FF9550",
                                            paddingBottom: "0.5rem",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontFamily: "Dosis",
                                                fontSize: "120%",
                                                fontWeight: "600",
                                                margin: "0",
                                            }}
                                        >
                                            Políticas de Uso
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, 1fr)",
                                            gridGap: "1rem",
                                            width: "100%",
                                            "@media (max-width: 768px)": {
                                                gridTemplateColumns: "1fr",
                                            },
                                        }}
                                    >
                                        {politicasDeUso[space.nombre]?.map((politica, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    backgroundColor: "#f9f9f9",
                                                    padding: "1rem",
                                                    borderRadius: "4px",
                                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                    "@media (max-width: 768px)": {
                                                        padding: "0.5rem",
                                                    },
                                                }}
                                            >
                                                <h6
                                                    style={{
                                                        fontFamily: "Dosis",
                                                        fontSize: "100%",
                                                        fontWeight: "600",
                                                        marginBottom: "0.5rem",
                                                    }}
                                                >
                                                    Política {index + 1}
                                                </h6>
                                                <p
                                                    style={{
                                                        fontFamily: "Dosis",
                                                        fontSize: "90%",
                                                        fontWeight: "400",
                                                        margin: "0",
                                                    }}
                                                >
                                                    {politica}
                                                </p>
                                            </div>
                                        ))}
                                        {!politicasDeUso[space.nombre] && (
                                            <div
                                                style={{
                                                    backgroundColor: "#f9f9f9",
                                                    padding: "1rem",
                                                    borderRadius: "4px",
                                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                    gridColumn: "1 / -1",
                                                    "@media (max-width: 768px)": {
                                                        padding: "0.5rem",
                                                    },
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontFamily: "Dosis",
                                                        fontSize: "100%",
                                                        fontWeight: "400",
                                                        margin: "0",
                                                    }}
                                                >
                                                    No hay políticas de uso disponibles para este lugar.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </h6>

                                <div style={{ width: "100%", textAlign: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleReserve}
                                        style={{ fontFamily: "Dosis" }}
                                    >
                                        Reservar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isMobile && (
                    <div style={{ marginTop: "5rem", textAlign: "center", }}>
                        <CardMobile
                            space={space}
                            arrayFotos={arrayFotos}
                            caracteristicas={caracteristicas}
                            categorias={categorias}
                            politicas={politicas}
                            onReserve={handleReserve}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleReserve}
                            style={{ fontFamily: "Dosis", marginTop:"-100px" }}
                        >
                            Reservar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EspacioVista;