import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchContextComponent = ({ children }) => {
  const [categorysFiltro, setCategorysFiltro] = useState(
    JSON.parse(localStorage.getItem("categorysFiltro")) || []
  );

  const saveCategoryStorage = (categorys) => {
    setCategorysFiltro(categorys);
    localStorage.setItem("categorysFiltro", JSON.stringify(categorysFiltro));
  };

  const [categoriaFiltroID, setCategoriaFiltroID] = useState("");

  let data = {
    setCategorysFiltro,
    categorysFiltro,
    saveCategoryStorage,
    categoriaFiltroID,
    setCategoriaFiltroID,
  };

  return (
    <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
  );
};

export default SearchContextComponent;
