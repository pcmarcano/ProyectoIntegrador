import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EspacioReserva from "./EspacioReserva";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardReturn } from "react-icons/md";

const ConfirmarReserva = () => {
    const { isLogged, user } = useContext(AuthContext);
    const [selectedData, setSelectedData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [spaceData, setSpaceData] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 640);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isLogged) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isLogged, navigate]);

    useEffect(() => {
        if (location.state && location.state.reservasData) {
            const { reservasData } = location.state;
            setSelectedData(reservasData);
        }
    }, [location.state]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://api.curso.spazioserver.online/usuarios/email/${user.email}`)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, [user]);

    useEffect(() => {
        if (selectedData.length > 0) {
            const firstReservation = selectedData[0];
            fetch(`https://api.curso.spazioserver.online/lugares/${firstReservation.lugarId}`)
                .then((response) => response.json())
                .then((data) => {
                    setSpaceData(data);
                })
                .catch((error) => console.error("Error fetching place data:", error));
        }
    }, [selectedData]);

    const handleConfirmarReserva = () => {
        if (userData && spaceData && selectedData.length > 0) {
            const promises = selectedData.map((reserva) =>
                fetch("http://localhost:8080/reservas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usuarioId: userData.id,
                        lugarId: reserva.lugarId,
                        fecha: reserva.fecha,
                        horaInicio: reserva.horaInicio,
                        horaFin: reserva.horaFin,
                    }),
                })
            );

            Promise.all(promises)
                .then((responses) => Promise.all(responses.map((res) => res.json())))
                .then((data) => {
                    console.log("Reservas creadas:", data);
                    setOpenModal(true);
                })
                .catch((error) => console.error("Error creating reservations:", error));
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate("/");
    };

    if (!isLogged) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontFamily: "\"Dosis\", sans-serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                    maxWidth: "400px",
                    margin: "50px auto",
                    padding: "20px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    backgroundColor: "white",
                }}
            >
                <p>
                    No tienes permiso para ver esta página. Por favor, inicia sesión.
                    Serás redirigido en 5 segundos...
                </p>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h2
                    style={{
                        fontFamily: "\"Dosis\", sans-serif",
                        fontSize: "32px",
                        color: "#FF9550",
                        paddingLeft: "50px",
                    }}
                >
                    {spaceData ? spaceData.nombre : '-'}
                </h2>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        paddingRight: "50px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#1E3231",
                        fontFamily: "\"Dosis\", sans-serif",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                    }}
                >
                    VOLVER
                    <MdKeyboardReturn
                        style={{
                            marginLeft: "5px",
                            verticalAlign: "middle",
                            color: "#1E3231",
                        }}
                    />
                </button>
            </Box>
            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid #FF9550",
                    margin: "0 50px"
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobileView ? "column" : "row",
                    justifyContent: "center",
                    alignItems: isMobileView ? "center" : "flex-start",
                }}
            >
                <Box
                    sx={{
                        display: isMobileView ? 'none' : 'flex',
                        marginRight: isMobileView ? "0px" : "50px",
                        marginLeft: isMobileView ? "0px" : "15px",
                        marginTop: isMobileView ? "40px" : "40px",
                        width: isMobileView ? "100%" : "auto",
                        justifyContent: "center",
                    }}
                >
                    <EspacioReserva />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "300px",
                        alignItems: "center",
                        gap: "20px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        boxSizing: "border-box",
                        marginTop: isMobileView ? "40px" : "40px",
                        marginBottom: "30px",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            padding: "20px",
                            boxSizing: "border-box",
                            fontFamily: "\"Dosis\", sans-serif",
                        }}
                    >
                        <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                            Detalles de la reserva
                        </h3>
                        <p><strong>Nombre:</strong> {userData ? userData.nombre + " " + userData.apellido : '-'}</p>
                        <p><strong>Email:</strong> {userData ? userData.email : '-'}</p>
                        <p><strong>Lugar:</strong> {spaceData ? spaceData.nombre : '-'}</p>
                        <p><strong>Fecha:</strong> {selectedData.length > 0 ? selectedData[0].fecha : '-'}</p>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            padding: "20px",
                            boxSizing: "border-box",
                            fontFamily: "\"Dosis\", sans-serif",
                        }}
                    >
                        <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                            Horas reservadas
                        </h3>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                border: "1px solid #ddd",
                            }}
                        >
                            <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        textAlign: "center",
                                    }}
                                >
                                    Hora de inicio
                                </th>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        textAlign: "center",
                                    }}
                                >
                                    Hora de fin
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedData
                                .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)) // Ordena por hora de inicio
                                .map((reserva, index) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                            }}
                                        >
                                            {reserva.horaInicio}
                                        </td>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                            }}
                                        >
                                            {reserva.horaFin}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                    <button
                        onClick={handleConfirmarReserva}
                        style={{
                            marginTop: "1rem",
                            marginBottom: "10px",
                            backgroundColor: "#FF9550",
                            color: "#FFFFFF",
                            padding: "0.5rem 1rem",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontFamily: "'Dosis', sans-serif",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            transition: "background-color 0.3s",
                            maxWidth: "180px"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#dc6401";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#FF9550";
                        }}
                    >
                        Confirmar reserva
                    </button>
                </Box>
            </Box>
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Reservas Confirmadas"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¡Tu reserva ha sido creada con éxito! A continuación, se muestran los detalles:
                    </DialogContentText>
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: "1rem",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            padding: "20px",
                            boxSizing: "border-box",
                            fontFamily: "\"Dosis\", sans-serif",
                        }}
                    >
                        <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                            Detalles de la reserva
                        </h3>
                        <p><strong>Nombre:</strong> {userData ? userData.nombre + " " + userData.apellido : '-'}</p>
                        <p><strong>Email:</strong> {userData ? userData.email : '-'}</p>
                        <p><strong>Lugar:</strong> {spaceData ? spaceData.nombre : '-'}</p>
                        <p><strong>Fecha:</strong> {selectedData.length > 0 ? selectedData[0].fecha : '-'}</p>
                        <h4 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                            Horas reservadas
                        </h4>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                border: "1px solid #ddd",
                            }}
                        >
                            <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        textAlign: "center",
                                    }}
                                >
                                    Hora de inicio
                                </th>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        textAlign: "center",
                                    }}
                                >
                                    Hora de fin
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedData
                                .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
                                .map((reserva, index) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                            }}
                                        >
                                            {reserva.horaInicio}
                                        </td>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "center",
                                            }}
                                        >
                                            {reserva.horaFin}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary" autoFocus>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ConfirmarReserva;