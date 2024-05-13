import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { menuItems } from "../../../router/navigation";
import "./Navbar.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../../../../public/logo1.png";

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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundColor: "#1E3231",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to="/"
            style={{
              color: "whitesmoke",
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <img src={logo} alt="" style={{ width: "10rem" }} />
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
            <IconButton
              color="secondary.primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon
                style={{ fontSize: "200%", marginLeft: "1rem" }}
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
