import React from "react";
import Listado from "./listado/Listado";
import Search from "./search/Search";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Search />
      <Listado />
    </div>
  );
};

export default Home;
