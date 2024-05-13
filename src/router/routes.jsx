import React from 'react';
import Home from "../components/pages/home/Home.jsx";
import Formulario from "../components/pages/home/formulario/Formulario.jsx";
import Search from "../components/pages/home/Search.jsx";

const HomeAndSearch = () => (
    <div>
        <Home />
        <Search />
        <Formulario />
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
];