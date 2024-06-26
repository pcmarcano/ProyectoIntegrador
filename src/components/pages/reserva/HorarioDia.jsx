import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const HorarioDia = ({ selectedDate, handleHoraChange }) => {
    const { id } = useParams();

    const [franjasNoDisponibles, setFranjasNoDisponibles] = useState([]);

    useEffect(() => {
        if (!id || !selectedDate) return;

        // console.log("Fecha seleccionada:", selectedDate);
        // console.log("ID del lugar:", id);

        fetch(`http://localhost:8080/reservas`)
            .then(response => response.json())
            .then(data => {
                // console.log("Reservas obtenidas:", data);

                const reservasPorLugar = data.filter(reserva => reserva.lugarId.toString() === id);

                const reservasFiltradas = reservasPorLugar.filter(reserva => reserva.fecha === selectedDate);

                const franjasOcupadas = reservasFiltradas.map(reserva => ({
                    horaInicio: reserva.horaInicio.substring(0, 5),
                    horaFin: reserva.horaFin.substring(0, 5)
                }));
                setFranjasNoDisponibles(franjasOcupadas);
            })
            .catch(error => console.error("Error fetching reservas:", error));
    }, [id, selectedDate]);

    const generateFranjasHorarias = () => {
        const franjasHorarias = [];
        for (let hora = 7; hora < 24; hora++) {
            const horaInicio = `${hora.toString().padStart(2, "0")}:00`;
            const horaFin = `${(hora + 1).toString().padStart(2, "0")}:00`;
            franjasHorarias.push({ horaInicio, horaFin });
        }
        return franjasHorarias;
    };

    const [selectedHoras, setSelectedHoras] = useState([]);
    const [hoveredHora, setHoveredHora] = useState(null);

    useEffect(() => {
        handleHoraChange(selectedHoras);
    }, [selectedHoras, handleHoraChange]);

    useEffect(() => {
        setSelectedHoras([]);
    }, [selectedDate]);

    const handleHoraClick = (franja) => {
        if (franjasNoDisponibles.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin)) return;

        setSelectedHoras(prevSelectedHoras =>
            prevSelectedHoras.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin)
                ? prevSelectedHoras.filter(f => f.horaInicio !== franja.horaInicio || f.horaFin !== franja.horaFin)
                : [...prevSelectedHoras, franja]
        );
    };

    const franjasHorarias = generateFranjasHorarias();

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }}>
                <h4
                    style={{
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        borderBottom: "2px solid #FF9550",
                        paddingBottom: "0.5rem",
                        color: "#1E3231",
                        textAlign: "center",
                    }}
                >
                    Elige tus horarios para el {format(selectedDate, 'dd/MM/yyyy')}
                </h4>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gridGap: "1rem",
                        width: "100%",
                    }}
                >
                    {franjasHorarias.map((franja, index) => {
                        const isUnavailable = franjasNoDisponibles.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin);

                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: "#EFEFEF",
                                    padding: "0.5rem",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id={`${franja.horaInicio}-${franja.horaFin}`}
                                    name={`${franja.horaInicio}-${franja.horaFin}`}
                                    style={{ display: "none" }}
                                    checked={selectedHoras.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin)}
                                    onChange={() => handleHoraClick(franja)}
                                    disabled={isUnavailable}
                                />
                                <label
                                    htmlFor={`${franja.horaInicio}-${franja.horaFin}`}
                                    style={{
                                        display: "inline-block",
                                        border: `1px solid ${selectedHoras.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin) ? "#00B5AD" : "#94B7D0"}`,
                                        borderRadius: "5px",
                                        backgroundColor: isUnavailable
                                            ? "#4D4D4D"
                                            : selectedHoras.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin)
                                                ? "#FF9550"
                                                : hoveredHora === franja
                                                    ? "#94B7D0"
                                                    : "#FFFFFF",
                                        color: isUnavailable
                                            ? "#FFFFFF"
                                            : selectedHoras.some(f => f.horaInicio === franja.horaInicio && f.horaFin === franja.horaFin) || hoveredHora === franja
                                                ? "#FFFFFF"
                                                : "#1E3231",
                                        fontFamily: "'Dosis', sans-serif",
                                        padding: "0.5rem",
                                        cursor: isUnavailable ? "not-allowed" : "pointer",
                                        width: "100%",
                                        textAlign: "center",
                                        transition:
                                            "background-color 0.3s, color 0.3s, border 0.3s",
                                    }}
                                    onMouseEnter={() => setHoveredHora(franja)}
                                    onMouseLeave={() => setHoveredHora(null)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleHoraClick(franja);
                                    }}
                                >
                                    {`${franja.horaInicio} - ${franja.horaFin}`}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HorarioDia;