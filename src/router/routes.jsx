import React from "react";
import Home from "../components/pages/home/Home.jsx";
import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import Listado from "../components/pages/home/listado/Listado.jsx";
import EspacioVista from "../components/pages/home/formulario/espacio/EspacioVista.jsx";
import Registro from "../components/pages/register/Register.jsx";
import Login from "../components/pages/login/Login.jsx";
import Cuenta from "../components/pages/home/cuenta/Cuenta.jsx";
import Dashboard from "../components/pages/home/dashboard/Dashboard.jsx";
import Favoritos from "../components/pages/home/favoritos/Favoritos.jsx";
import ListadoAleatorio from "../components/pages/home/listado/ListadoAleatorio.jsx";
import ListadoSearch from "../components/pages/home/listado/ListadoSearch.jsx";
import Reserva from "../components/pages/reserva/Reserva.jsx";
import ListaFavoritos from "../components/pages/favoritos/ListaFavoritos.jsx";
import ConfirmarReserva from "../components/pages/reserva/ConfirmarReserva.jsx";
import MisReservas from "../components/pages/reserva/MisReservas.jsx";


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
    id: "favoritos",
    path: "/favoritos",
    Element: Favoritos,
  },
  {
    id: "reserva",
    path: "/reserva/:id",
    Element: Reserva,
  },
  {
    id:"listafavoritos",
    path: "/lista-favoritos",
    Element: ListaFavoritos,
  },
  {
    id: "confirmacion",
    path: "/confirmacion/:id",
    Element: ConfirmarReserva,
  },
  {
    id: "misReservas",
    path: "/misReservas",
    Element: MisReservas,
  },
];
