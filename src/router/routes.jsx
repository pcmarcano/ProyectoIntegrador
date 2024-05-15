import React from 'react';
import Home from "../components/pages/home/Home.jsx";
import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import Search from "../components/pages/home/Search.jsx";
import Listado from "../components/pages/home/listado/Listado.jsx";

const HomeAndSearch = () => (
    <div>
        <Search />
        <Home />
    </div>
);

export const routes = [
    {
        id: "home",
        path: "/",
        Element: HomeAndSearch,
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
];
