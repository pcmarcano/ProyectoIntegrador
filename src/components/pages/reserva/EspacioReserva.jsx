import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMobileReserva from "./CardMobileReserva";

const EspacioReserva = () => {
    const { id } = useParams();

    const [space, setSpace] = useState({});
    const [arrayFotos, setArrayFotos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [caracteristicas, setCaracteristicas] = useState([]);

    useEffect(() => {
        fetch(`https://api.curso.spazioserver.online/lugares/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSpace(data);
                setCategorias(data.categorias);
                setCaracteristicas(data.caracteristicas);
                arrFotos(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    const arrFotos = (data) => {
        if (data && data.fotos && data.fotos.length > 0) {
            let arr = data.fotos.map((element) => element);
            setArrayFotos(arr);
        }
    };

    return (
        <div style={{ width: "auto", height: "auto" }}>
            <div>
                <CardMobileReserva
                    space={space}
                    arrayFotos={arrayFotos}
                    caracteristicas={caracteristicas}
                    categorias={categorias}
                    lugarId={id}
                />
            </div>
        </div>
    );
};

export default EspacioReserva;