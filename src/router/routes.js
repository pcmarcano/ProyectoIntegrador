import Home from "../components/pages/home/Home";
import Formulario from "../components/pages/home/Formulario";

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
];
