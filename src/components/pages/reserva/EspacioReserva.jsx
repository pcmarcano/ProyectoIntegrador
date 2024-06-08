import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardMobileReserva from "./CardMobileReserva";

const EspacioReserva = () => {
    const { id } = useParams();

    const [space, setSpace] = useState([]);
    const [arrayFotos, setArrayFotos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [caracteristicas, setCaracteristicas] = useState([]);

    useEffect(() => {
        // Llamada a la API
        fetch(`https://api.curso.spazioserver.online/lugares/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSpace(data);
                setCategorias(data.categorias);
                setCaracteristicas(data.caracteristicas);
                arrFotos(data); // Llama a arrFotos después de establecer space
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    const arrFotos = (data) => {
        if (data && data.fotos && data.fotos.length > 0) {
            let arr = [];
            data.fotos.forEach((element) => {
                arr.push(element);
            });
            setArrayFotos(arr);
        }
    };



    return (
        <div style={{ width: "auto", height: "auto" }}>
            <div style={{ marginTop: "5rem" }}>
                <CardMobileReserva
                    space={space}
                    arrayFotos={arrayFotos}
                    caracteristicas={caracteristicas}
                    categorias={categorias}
                />
            </div>
        </div>
    );
};

export default EspacioReserva;