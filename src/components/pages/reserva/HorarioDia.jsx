import React, { useState } from "react";

const HorarioDia = ({ selectedDate }) => {
    const generateFranjasHorarias = () => {
        let franjasHorarias = [];
        for (let hora = 0; hora < 24; hora++) {
            const horaInicio = hora.toString().padStart(2, "0") + ":00";
            const horaFin = (hora + 1).toString().padStart(2, "0") + ":00";
            franjasHorarias.push(`${horaInicio} - ${horaFin}`);
        }
        return franjasHorarias;
    };

    const [selectedHoras, setSelectedHoras] = useState([]);

    const handleHoraChange = (hora) => {
        if (selectedHoras.includes(hora)) {
            setSelectedHoras(selectedHoras.filter((h) => h !== hora));
        } else {
            setSelectedHoras([...selectedHoras, hora]);
        }
    };

    const franjasHorarias = generateFranjasHorarias();

    return (
        <div>
            <h2>Franjas horarias disponibles para {selectedDate.toLocaleDateString()}:</h2>
            <ul>
                {franjasHorarias.map((franja, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            id={franja}
                            name={franja}
                            checked={selectedHoras.includes(franja)}
                            onChange={() => handleHoraChange(franja)}
                        />
                        <label htmlFor={franja}>{franja}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HorarioDia;
