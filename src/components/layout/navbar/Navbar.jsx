import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../../../public/logo1.png";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#1E3231" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/" style={{ color: "whitesmoke", display: "flex", alignItems: "center", padding: "0.5rem" }}>
                        <img src={logo} alt="Logo" style={{ width: "10rem" }} />
                    </Link>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            sx={{
                                width: "176px",
                                height: "40px",
                                fontFamily: "Dosis",
                                fontSize: "16px",
                                backgroundColor: "#FF9550",
                                color: "#FFFFFF",
                                marginRight: "1rem",
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                width: "176px",
                                height: "40px",
                                fontFamily: "Dosis",
                                fontSize: "16px",
                                backgroundColor: "#94B7D0",
                                color: "#FFFFFF",
                            }}
                        >
                            Crear Cuenta
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
