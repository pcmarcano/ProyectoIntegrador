import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import EspacioVista from "../components/pages/home/formulario/espacio/EspacioVista.jsx";
import Listado from "../components/pages/home/listado/Listado.jsx";

import Search from "../components/pages/home/search/Search.jsx";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Search,
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
    id: "espacio",
    path: "/space/:id", // Ajustar la ruta para aceptar un parámetro dinámico
    Element: EspacioVista,
  },
];
