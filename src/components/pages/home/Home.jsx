import React from "react";
import Box from "@mui/material/Box";
import Search from "./search/Search.jsx";
import ListadoAleatorio from "./listado/ListadoAleatorio.jsx";

const Home = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Search />

      <ListadoAleatorio />
    </Box>
  );
};

export default Home;
