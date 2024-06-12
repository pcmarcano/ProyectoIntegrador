import React from "react";
import Home from "../components/pages/home/Home.jsx";
import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import Search from "../components/pages/home/search/Search.jsx";
import Listado from "../components/pages/home/listado/Listado.jsx";
import EspacioVista from "../components/pages/home/formulario/espacio/EspacioVista.jsx";
import Registro from "../components/pages/register/Register.jsx";
import Box from "@mui/material/Box";
import Login from "../components/pages/login/Login.jsx";
import Cuenta from "../components/pages/home/cuenta/Cuenta.jsx";
import Dashboard from "../components/pages/home/dashboard/Dashboard.jsx";
import ListadoSearch from "../components/pages/home/listado/ListadoSearch.jsx";
import Reserva from "../components/pages/reserva/Reserva.jsx";
export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "formulario",
    path: "/form",
    Element: Formulario,
  },
  {
    id: "listado",
    path: "/list",
    Element: Listado,
  },
  {
    id: "listSearch",
    path: "/listSearch",
    Element: ListadoSearch,
  },
  {
    id: "espacio",
    path: "/space/:id",
    Element: EspacioVista,
  },
  {
    id: "registro",
    path: "/register",
    Element: Registro,
  },
  {
    id: "login",
    path: "/login",
    Element: Login,
  },
  {
    id: "cuenta",
    path: "/cuenta",
    Element: Cuenta,
  },
  {
    id: "dashboard",
    path: "/dashboard",
    Element: Dashboard,
  },
  {
    id: "reserva",
    path: "/reserva/:id",
    Element: Reserva,
  },
];
