import Home from "../components/pages/home/Home";
import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import Search from "../components/pages/home/Search.jsx";

export const routes = [
    {
        id: "home",
        path: "/",
        Element: () => (
            <div>
                <Home />
                <Search />
            </div>
        ),
    },
    {
        id: "formulario",
        path: "/form",
        Element: Formulario,
    },
];
