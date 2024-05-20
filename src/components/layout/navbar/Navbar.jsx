import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { menuItems } from "../../../router/navigation.jsx";
import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import logo from "../../../../public/logo1.png";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List style={{ color: "#CE8B67" }}>
                {menuItems.map(({ id, path, title, Icon }) => {
                    return (
                        <Link key={id} to={path} onClick={() => handleDrawerToggle()}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon sx={{ color: "#CE8B67" }} />
                                    </ListItemIcon>
                                    <Typography
                                        sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                                        color="#CE8B67"
                                    >
                                        {title}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon sx={{ color: "#CE8B67" }} />
                        </ListItemIcon>
                        <Typography
                            sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                            color="#CE8B67"
                        >
                            Cerrar sesion
                        </Typography>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: "100%",
                    backgroundColor: "#1E3231",
                    height: "90px",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link
                        to="/"
                        style={{
                            color: "whitesmoke",
                            display: "flex",
                            alignItems: "center",
                            padding: "0.5rem",
                        }}
                    >
                        <img className="logoimg" src={logo} alt="Logo" />
                    </Link>
                    <div className="menu-container">
                        <div className="button-container">
                            <Button
                                variant="contained"
                                sx={{
                                    width: "150px",
                                    height: "32px",
                                    fontFamily: "Dosis",
                                    fontSize: "80%",
                                    backgroundColor: "#FF9550",
                                    color: "#FFFFFF",
                                    marginRight: "10px",
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    width: "150px",
                                    height: "32px",
                                    fontFamily: "Dosis",
                                    fontSize: "80%",
                                    backgroundColor: "#94B7D0",
                                    color: "#FFFFFF",
                                    marginRight: "10px",
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                Crear Cuenta
                            </Button>
                            <IconButton
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    color: "#FF9550",
                                    marginRight: "10px"
                                }}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    color: "#94B7D0",
                                    marginRight: "10px"
                                }}
                            >
                                <PersonAddIcon />
                            </IconButton>
                        </div>
                        <IconButton
                            color="secondary.primary"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                marginLeft: "0.5rem",
                            }}
                        >
                            <MenuIcon
                                style={{
                                    fontSize: "200%",
                                    "@media (max-width: 620px)": {
                                        fontSize: "30px",
                                    },
                                }}
                                color="secondary.primary"
                            />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Box component="nav" aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    anchor={"right"}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 200,
                            backgroundColor: "#73C6B6",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4,
                    width: "100%",
                    minHeight: "100vh",
                    px: 2,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Navbar;
