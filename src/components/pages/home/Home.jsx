import React from "react";
import Listado from "./listado/Listado";
import Search from "./search/Search";

const Home = () => {
  return (
    <div>
      <Search />
      <Listado />
    </div>
  );
};

export default Home;
