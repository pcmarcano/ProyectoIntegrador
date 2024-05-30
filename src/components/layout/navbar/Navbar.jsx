import React, { useContext, useState } from "react";
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
import { menuItems } from "../../../router/navigation.js";
import "./Navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, ListItemText, Typography } from "@mui/material";
import logo from "../../../../public/logo1.png";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { logOut } from "../../../firebaseConfig.js";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { AuthContext } from "../../context/AuthContext.jsx";
import DeckIcon from "@mui/icons-material/Deck";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { WindowSharp } from "@mui/icons-material";
import Usuario from "../../pages/home/usuario/Usuario.jsx";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

function Navbar(props) {
  const { windows } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLogged } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ADMIN;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const rolAdminTotal = import.meta.env.VITE_ADMINTOTAL;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const cerrarSesion = () => {
    logOut();
    navigate("/");
    window.location.reload();
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
        {user.rol === rolAdminTotal && (
          <Link to={"/form"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddBusinessIcon sx={{ color: "#CE8B67" }} />
                </ListItemIcon>
                <Typography
                  sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                  color="#CE8B67"
                >
                  Nuevo Espacio{" "}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user.rol === rolAdmin && (
          <Link to={"/list"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DeckIcon sx={{ color: "#CE8B67" }} />
                </ListItemIcon>
                <Typography
                  sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                  color="#CE8B67"
                >
                  Espacios{" "}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user.rol === rolAdminTotal && (
          <Link to={"/list"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DeckIcon sx={{ color: "#CE8B67" }} />
                </ListItemIcon>
                <Typography
                  sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                  color="#CE8B67"
                >
                  Espacios{" "}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user.rol === rolAdminTotal && (
          <Link to={"/dashboard"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardCustomizeIcon sx={{ color: "#CE8B67" }} />
                </ListItemIcon>
                <Typography
                  sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                  color="#CE8B67"
                >
                  Dashboard{" "}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={() => cerrarSesion()}>
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

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
              {!isLogged && (
                <>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                      width: "150px",
                      height: "32px",
                      fontFamily: "Dosis",
                      fontSize: "80%",
                      backgroundColor: "#FF9550",
                      color: "#FFFFFF",
                      marginRight: "10px",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                    sx={{
                      width: "150px",
                      height: "32px",
                      fontFamily: "Dosis",
                      fontSize: "80%",
                      backgroundColor: "#94B7D0",
                      color: "#FFFFFF",
                      marginRight: "10px",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Crear Cuenta
                  </Button>
                  <IconButton
                    sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#FF9550",
                      marginRight: "10px",
                    }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate("/register")}
                    sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#94B7D0",
                      marginRight: "10px",
                    }}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </>
              )}
              {!isMobile && <div>{isLogged && user.email && <Usuario />}</div>}
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
                  fontSize: "2rem",
                  color: "white",
                }}
              />{" "}
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
              backgroundColor: "#1E3231",
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
