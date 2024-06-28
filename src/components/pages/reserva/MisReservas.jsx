import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const MisReservas = () => {
    const { isLogged, user } = useContext(AuthContext);
    const [userReservations, setUserReservations] = useState([]);
    const [userData, setUserData] = useState(null);
    const [placeNames, setPlaceNames] = useState({});
    const [showPastReservations, setShowPastReservations] = useState(true);
    const [showFutureReservations, setShowFutureReservations] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isLogged, navigate]);

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
        if (!isLogged || !userData) {
            return;
        }

        fetch(`http://localhost:8080/reservas`)
            .then((response) => response.json())
            .then((data) => {
                const filteredReservations = data.filter(reserva => reserva.usuarioId === userData.id);

                // Ordenar reservas por fecha y luego por hora
                filteredReservations.sort((a, b) => {
                    const dateA = new Date(a.fecha);
                    const dateB = new Date(b.fecha);

                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;

                    // Si las fechas son iguales, ordenar por hora de inicio
                    const horaInicioA = new Date(`1970-01-01T${a.horaInicio}`);
                    const horaInicioB = new Date(`1970-01-01T${b.horaInicio}`);

                    return horaInicioA - horaInicioB;
                });

                setUserReservations(filteredReservations);

                // Obtener los nombres de los lugares para las reservas
                const placeIds = [...new Set(filteredReservations.map(reserva => reserva.lugarId))];
                Promise.all(placeIds.map(id => fetchPlaceName(id)))
                    .then(placeNames => {
                        const placeNamesMap = {};
                        placeNames.forEach((name, index) => {
                            placeNamesMap[placeIds[index]] = name;
                        });
                        setPlaceNames(placeNamesMap);
                    });
            })
            .catch((error) => console.error("Error fetching reservations:", error));
    }, [isLogged, userData]);

    const fetchPlaceName = (id) => {
        return fetch(`https://api.curso.spazioserver.online/lugares/${id}`)
            .then(response => response.json())
            .then(data => data.nombre)
            .catch(error => {
                console.error("Error fetching place name:", error);
                return "";
            });
    };

    const groupReservationsByDateAndPlace = (reservations) => {
        const today = new Date();
        const todayISOString = today.toISOString().split("T")[0];

        const past = {};
        const future = {};

        reservations.forEach(reserva => {
            const reservaDate = new Date(reserva.fecha);
            if (reservaDate < today) {
                if (!past[reserva.fecha]) {
                    past[reserva.fecha] = {};
                }
                if (!past[reserva.fecha][reserva.lugarId]) {
                    past[reserva.fecha][reserva.lugarId] = [];
                }
                past[reserva.fecha][reserva.lugarId].push(reserva);
            } else {
                if (!future[reserva.fecha]) {
                    future[reserva.fecha] = {};
                }
                if (!future[reserva.fecha][reserva.lugarId]) {
                    future[reserva.fecha][reserva.lugarId] = [];
                }
                future[reserva.fecha][reserva.lugarId].push(reserva);
            }
        });

        return { past, future, todayISOString };
    };

    const truncateTime = (time) => time.slice(0, 5);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const monthName = months[parseInt(month, 10) - 1];
        return `${day} de ${monthName} de ${year}`;
    };

    const handleTogglePastReservations = () => {
        setShowPastReservations(!showPastReservations);
    };

    const handleToggleFutureReservations = () => {
        setShowFutureReservations(!showFutureReservations);
    };

    const handleCancelarReserva = (id) => {
        setReservationToDelete(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        if (reservationToDelete) {
            // Llamar a la API para cancelar la reserva
            fetch(`http://localhost:8080/reservas/${reservationToDelete}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        // Actualizar la lista de reservas eliminando la cancelada
                        const updatedReservations = userReservations.filter(reserva => reserva.id !== reservationToDelete);
                        setUserReservations(updatedReservations);
                        setOpenDialog(false);
                    } else {
                        console.error('Error cancelando reserva:', response.status);
                    }
                })
                .catch(error => console.error('Error cancelando reserva:', error));
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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

    const { past, future, todayISOString } = groupReservationsByDateAndPlace(userReservations);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto",
                fontFamily: "\"Dosis\", sans-serif",
            }}
        >
            <Typography variant="h4" component="h2"
                        sx={{
                            fontFamily: "\"Dosis\", sans-serif",
                            color: "#FF9550",
                            marginBottom: "20px",
                            fontWeight: "bold",
                        }}
            >
                Historial de Reservas
            </Typography>
            {Object.keys(past).length > 0 && (
                <>
                    <Typography variant="h5" sx={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#FF9550", marginBottom: "10px" }} onClick={handleTogglePastReservations}>
                        Reservas Pasadas
                        {showPastReservations ? <ExpandLessIcon sx={{ marginLeft: '5px' }} /> : <ExpandMoreIcon sx={{ marginLeft: '5px' }} />}
                    </Typography>
                    {showPastReservations && Object.keys(past).map((date) => (
                        <Box
                            key={date}
                            sx={{
                                marginBottom: "20px",
                                width: "80%",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                padding: "10px",
                                backgroundColor: "#f9f9f9"
                            }}
                        >
                            <Typography variant="h6" component="h3" sx={{ marginBottom: "10px" }}>
                                {formatDate(date)}
                            </Typography>
                            {Object.keys(past[date]).map((placeId) => (
                                <Box key={placeId}
                                     sx={{
                                         display: "flex",
                                         flexDirection: "column",
                                         alignItems: "center",
                                         marginBottom: "10px",
                                     }}
                                >
                                    <Typography variant="h6" component="h4" sx={{ marginBottom: "5px" }}>
                                        {placeNames[placeId] || "Cargando..."}
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table
                                            sx={{
                                                maxWidth: "600px",
                                            }}
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell  sx={{textAlign:"center"}}>Hora Inicio</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}}>Hora Fin</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {past[date][placeId].map((reserva) => (
                                                    <TableRow key={reserva.id}>
                                                        <TableCell  sx={{textAlign:"center"}}>{truncateTime(reserva.horaInicio)}</TableCell>
                                                        <TableCell  sx={{textAlign:"center"}}>{truncateTime(reserva.horaFin)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </>
            )}
            {Object.keys(future).length > 0 && (
                <>
                    <Typography variant="h5" sx={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#FF9550", marginBottom: "10px" }} onClick={handleToggleFutureReservations}>
                        Reservas Futuras
                        {showFutureReservations ? <ExpandLessIcon sx={{ marginLeft: '5px' }} /> : <ExpandMoreIcon sx={{ marginLeft: '5px' }} />}
                    </Typography>
                    {showFutureReservations && Object.keys(future).map((date) => (
                        <Box
                            key={date}
                            sx={{
                                marginBottom: "20px",
                                width: "80%",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                padding: "10px",
                                backgroundColor: "#f9f9f9"
                            }}
                        >
                            <Typography variant="h6" component="h3" sx={{ marginBottom: "10px" }}>
                                {formatDate(date)}
                            </Typography>
                            {Object.keys(future[date]).map((placeId) => (
                                <Box key={placeId}
                                     sx={{
                                         display: "flex",
                                         flexDirection: "column",
                                         alignItems: "center",
                                         marginBottom: "10px",
                                     }}
                                >
                                    <Typography variant="h6" component="h4" sx={{ marginBottom: "5px" }}>
                                        {placeNames[placeId] || "Cargando..."}
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table
                                            sx={{
                                                maxWidth: "600px",
                                            }}
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell  sx={{textAlign:"center"}}>Hora Inicio</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}}>Hora Fin</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}}>Acciones</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {future[date][placeId].map((reserva) => (
                                                    <TableRow key={reserva.id}>
                                                        <TableCell  sx={{textAlign:"center"}}>{truncateTime(reserva.horaInicio)}</TableCell>
                                                        <TableCell  sx={{textAlign:"center"}}>{truncateTime(reserva.horaFin)}</TableCell>
                                                        <TableCell  sx={{textAlign:"center"}}>
                                                            {reserva.fecha > todayISOString && (
                                                                <IconButton
                                                                    color="secondary"
                                                                    onClick={() => handleCancelarReserva(reserva.id)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </>
            )}

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "\"Dosis\", sans-serif" }}>Confirmar cancelación</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontFamily: "\"Dosis\", sans-serif" }}>
                        ¿Estás seguro de que quieres cancelar esta reserva?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleCloseDialog} autoFocus sx={{ fontFamily: "\"Dosis\", sans-serif" }}>
                        No
                    </IconButton>
                    <IconButton onClick={handleConfirmDelete} sx={{ fontFamily: "\"Dosis\", sans-serif", color: "red" }}>
                        Sí, Cancelar
                    </IconButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MisReservas;