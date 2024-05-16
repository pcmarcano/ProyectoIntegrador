import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../../public/logo1.png";
import { menuItems } from "../../../router/navigation";
import "./Navbar.css";

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />

            <List>
                {menuItems.map(({ id, path, title, Icon }) => {
                    return (
                        <Link key={id} to={path}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon sx={{ color: "whitesmoke" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={title} sx={{ color: "whitesmoke" }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* <LogoutIcon sx={{ color: "whitesmoke" }} /> */}
                        </ListItemIcon>
                        <ListItemText
                            primary={"Cerrar sesion"}
                            sx={{ color: "whitesmoke" }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{
            display: "flex",
        }}>
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
                        <img src={logo} alt="Logo" style={{ width: "10rem" }} />
                    </Link>
                    <div className="menu-container">
                        <Button
                            variant="contained"
                            sx={{
                                width: "176px",
                                height: "40px",
                                fontFamily: "Dosis",
                                fontSize: "16px",
                                backgroundColor: "#FF9550",
                                color: "#FFFFFF",
                                marginRight: "10px",
                                "@media (max-width: 690px)": {
                                    display: "flex",
                                    width: "120px",
                                    height: "32px",
                                    fontSize: "80%",
                                    marginTop: "20px",
                                },
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
                                marginRight: "1rem",
                                "@media (max-width: 690px)": {
                                    width: "120px",
                                    height: "32px",
                                    fontSize: "80%",
                                    marginTop: "-15px",
                                },
                            }}
                        >
                            Crear Cuenta
                        </Button>
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
                                style={{ fontSize: "200%" }}
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
