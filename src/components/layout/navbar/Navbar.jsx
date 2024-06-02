import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Typography, Avatar, Snackbar, Alert } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { logOut } from "../../../firebaseConfig.js";
import DeckIcon from "@mui/icons-material/Deck";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./Navbar.css";
import Usuario from "../../pages/home/usuario/Usuario.jsx";

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLogged, user, handleLogoutContext } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ADMIN;
  const rolAdminTotal = import.meta.env.VITE_ADMINTOTAL;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [logoutMessage, setLogoutMessage] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (user && user.email) {
      fetch(
        `https://api.curso.spazioserver.online/usuarios/email/${user.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user]);

  const cerrarSesion = () => {
    handleLogoutContext();
    logOut();
    setLogoutMessage(true);
    setTimeout(() => {
      setLogoutMessage(false);
      navigate("/");
    }, 2000);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List style={{ color: "#CE8B67" }}>
        {menuItems.map(({ id, path, title, Icon }) => (
          <Link key={id} to={path} onClick={handleDrawerToggle}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon sx={{ color: "#CE8B67" }} />
                </ListItemIcon>
                <Typography
                  sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                >
                  {title}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {user?.rol === rolAdminTotal && (
          <>
            <Link to="/form" onClick={handleDrawerToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddBusinessIcon sx={{ color: "#CE8B67" }} />
                  </ListItemIcon>
                  <Typography
                    sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                  >
                    Nuevo Espacio
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/dashboard" onClick={handleDrawerToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardCustomizeIcon sx={{ color: "#CE8B67" }} />
                  </ListItemIcon>
                  <Typography
                    sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                  >
                    Dashboard
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
        {(user?.rol === rolAdmin || user?.rol === rolAdminTotal) && (
          <Link to="/list" onClick={handleDrawerToggle}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DeckIcon sx={{ color: "#CE8B67" }} />
                </ListItemIcon>
                <Typography
                  sx={{ color: "#CE8B67", fontFamily: '"Dosis", sans-serif' }}
                >
                  Espacios
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "100%", backgroundColor: "#1E3231", height: "90px" }}
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
            <img
              className="logoimg"
              src="https://firebasestorage.googleapis.com/v0/b/spazio-f05f1.appspot.com/o/nuevaCarpeta%2FLogo1.png?alt=media&token=4ca5bdc7-8152-4f89-86ea-21ee3ee6f7a7"
              alt="Logo"
            />
          </Link>
          <div
            className="user-info"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            {userData && isLogged ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Usuario />
              </div>
            ) : (
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
                  onClick={() => navigate("/login")}
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
          </div>

          {isLogged && (
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginLeft: "0.5rem" }}
            >
              <MenuIcon sx={{ fontSize: "200%", color: "white" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor={"right"}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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
        sx={{ flexGrow: 1, py: 4, width: "100%", minHeight: "100vh", px: 2 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <Box>
        <Snackbar
          open={logoutMessage}
          autoHideDuration={3000}
          onClose={() => setLogoutMessage(false)}
        >
          <Alert
            onClose={() => setLogoutMessage(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Sesión cerrada exitosamente
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Navbar;
