import Home from "../components/pages/home/Home.jsx";
import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import EspacioVista from "../components/pages/home/formulario/espacio/EspacioVista.jsx";
import ListadoAleatorio from "../components/pages/home/listado/ListadoAleatorio.jsx";

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
    Element: ListadoAleatorio,
  },
  {
    id: "espacio",
    path: "/space/:id", // Ajustar la ruta para aceptar un parámetro dinámico
    Element: EspacioVista,
  },
];
