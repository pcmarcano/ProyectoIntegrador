import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Usuario = () => {
  const { user, isLogged, handleLogoutContext } = useContext(AuthContext);
  const firstLetter = user?.email ? user.email.charAt(0).toUpperCase() : "";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const rolAdmin = import.meta.env.VITE_ADMIN;
  const rolAdminTotal = import.meta.env.VITE_ADMINTOTAL;
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (open) {
      handleClose();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderAdmin = (rol) => {
    if (rol === rolAdminTotal) {
      return "Administrador";
    } else if (rol === "usuario") return "Reservador";
    else return "Anonimo";
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
    window.location.reload();
    navigate("/");
  };

  return (
    <div
      style={{
        textAlign: "right",
        width: "100%",
        padding: "1rem",
        fontFamily: '"Dosis", sans-serif',
        fontWeight: 900,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userData && isLogged && (
        <>
          {!isMobile && (
            <div>
              <h4 style={{ fontWeight: 100 }}>
                Comunidad: <strong>{user.rol && "#537"}</strong>
              </h4>
              <h4 style={{ fontWeight: 100 }}>
                Usuario: <strong>{renderAdmin(user.rol)}</strong>
              </h4>
              <h4 style={{ fontWeight: 100 }}>
                <strong>
                  {userData.nombre}, {userData.apellido}
                </strong>
              </h4>
            </div>
          )}

          <div>
            <Link
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar sx={{ bgcolor: "#FF9550", margin: "1rem" }}>
                {userData.nombre.charAt(0).toUpperCase()}
                {userData.apellido.charAt(0).toUpperCase()}
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link to="/cuenta">
                    <IconButton sx={{ color: "#FFFFFF" }}>
                      <AccountCircleIcon
                        sx={{ fontSize: "1.3rem", color: "black" }}
                      />
                    </IconButton>
                    My account
                  </Link>
                </MenuItem>
                <MenuItem>
                  <IconButton onClick={cerrarSesion} sx={{ color: "#FFFFFF" }}>
                    <LogoutIcon sx={{ fontSize: "1.3rem", color: "black" }} />
                  </IconButton>
                  Logout
                </MenuItem>
              </Menu>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Usuario;
