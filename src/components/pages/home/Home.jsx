import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Listado from "./listado/Listado";
import Box from "@mui/material/Box";
import Search from "./search/Search.jsx";

const Home = () => {
  return (
    <Box sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    }}>
        <Search />
        <Listado />
    </Box>
  );
};

export default Home;
