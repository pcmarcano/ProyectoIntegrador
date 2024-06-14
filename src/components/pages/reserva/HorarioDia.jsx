import React, { useState, useEffect } from "react";

const HorarioDia = ({ selectedDate }) => {
  const franjasNoDisponibles = ["14:00 - 15:00", "20:00 - 21:00"];

  const generateFranjasHorarias = () => {
    const franjasHorarias = [];
    for (let hora = 7; hora < 24; hora++) {
      const horaInicio = `${hora.toString().padStart(2, "0")}:00`;
      const horaFin = `${(hora + 1).toString().padStart(2, "0")}:00`;
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
          fontSize: "1.2rem",
          fontFamily: "Dosis",
          fontWeight: "600",
        }}
      >
        Horarios {selectedDate.toLocaleDateString()}
      </h2>
      <div style={{ fontFamily: "Dosis", textAlign: "left", margin: "1rem" }}>
        <h4
          style={{
            fontWeight: "600",
            marginBottom: "0.5rem",
            borderBottom: "2px solid #FF9550",
            paddingBottom: "0.5rem",
            color: "#1E3231",
          }}
        >
          Selecciona tus horarios
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
            const isUnavailable = franjasNoDisponibles.includes(franja);

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
                    border: `1px solid ${
                      selectedHoras.includes(franja) ? "#00B5AD" : "#94B7D0"
                    }`,
                    borderRadius: "5px",
                    backgroundColor: isUnavailable
                      ? "#4D4D4D"
                      : selectedHoras.includes(franja)
                      ? "#FF9550"
                      : hoveredHora === franja
                      ? "#94B7D0"
                      : "#FFFFFF",
                    color: isUnavailable
                      ? "#FFFFFF"
                      : selectedHoras.includes(franja) || hoveredHora === franja
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
                    handleHoraChange(franja);
                  }}
                >
                  {franja}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleReservarAhoraClick}
        style={{
          marginTop: "1rem",
          marginBottom: "10px",
          backgroundColor: "#00B5AD",
          color: "#FFFFFF",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontFamily: "'Dosis', sans-serif",
          fontSize: "1rem",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#007A75";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#00B5AD";
        }}
      >
        Reservar ahora
      </button>
    </div>
  );
};

export default HorarioDia;
