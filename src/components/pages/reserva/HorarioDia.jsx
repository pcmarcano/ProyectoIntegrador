import React, { useState, useEffect } from "react";

const HorarioDia = ({ selectedDate }) => {
    const franjasNoDisponibles = ["14:00 - 15:00", "20:00 - 21:00"];

    const generateFranjasHorarias = () => {
        let franjasHorarias = [];
        for (let hora = 7; hora < 24; hora++) {
            const horaInicio = hora.toString().padStart(2, "0") + ":00";
            const horaFin = (hora + 1).toString().padStart(2, "0") + ":00";
            franjasHorarias.push(`${horaInicio} - ${horaFin}`);
        }
        return franjasHorarias;
    };

    const [selectedHoras, setSelectedHoras] = useState([]);
    const [hoveredHora, setHoveredHora] = useState(null);
    const [containerStyle, setContainerStyle] = useState({
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        maxWidth: "250px",
        margin: "10px auto",
    });

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 570 && screenWidth <= 670) {
                setContainerStyle({
                    display: "grid",
                    maxWidth: "125px",
                    margin: "10px auto",
                    gap: "0.3rem",
                });
            } else {
                setContainerStyle({
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    maxWidth: "250px",
                    margin: "10px auto",
                });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleHoraChange = (hora) => {
        if (franjasNoDisponibles.includes(hora)) return;

        setSelectedHoras((prevSelectedHoras) =>
            prevSelectedHoras.includes(hora)
                ? prevSelectedHoras.filter((h) => h !== hora)
                : [...prevSelectedHoras, hora]
        );
    };

    const franjasHorarias = generateFranjasHorarias();

    const handleReservarAhoraClick = () => {
        // Lógica para reservar
        console.log("Reservar ahora");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2
                style={{
                    color: "#1E3231",
                    fontSize: "1rem",
                }}
            >
                Horarios {selectedDate.toLocaleDateString()}
            </h2>
            <div style={containerStyle}>
                {franjasHorarias.map((franja, index) => {
                    const isUnavailable = franjasNoDisponibles.includes(franja);

                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="checkbox"
                                id={franja}
                                name={franja}
                                style={{ display: "none" }}
                                checked={selectedHoras.includes(franja)}
                                onChange={() => handleHoraChange(franja)}
                                disabled={isUnavailable}
                            />
                            <label
                                htmlFor={franja}
                                style={{
                                    display: "inline-block",
                                    border: selectedHoras.includes(franja) ? "1px solid blue" : "1px solid black",
                                    borderRadius: "5px",
                                    backgroundColor: isUnavailable ? "red" : (selectedHoras.includes(franja) ? "lightblue" : (hoveredHora === franja ? "yellow" : "lightgreen")),
                                    color: isUnavailable ? "white" : "black",
                                    fontFamily: "'Dosis', sans-serif",
                                    padding: "0.5rem",
                                    cursor: isUnavailable ? "not-allowed" : "pointer",
                                    width: "100%",
                                    textAlign: "center",
                                    transition: "background-color 0.3s, border 0.3s",
                                }}
                                onMouseEnter={() => setHoveredHora(franja)}
                                onMouseLeave={() => setHoveredHora(null)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleHoraChange(franja);
                                }}
                            >
                                {franja}
                            </label>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={handleReservarAhoraClick}
                style={{
                    marginTop: "1rem",
                    marginBottom:"10px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontFamily: "'Dosis', sans-serif",
                    fontSize: "1rem",
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#135492";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#1976d2";
                }}
            >
                Reservar ahora
            </button>
        </div>
    );
};

export default HorarioDia;
