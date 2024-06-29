import React, { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

const SearchContextComponent = ({ children }) => {
  // Estado para categorías filtradas
  const [categorysFiltro, setCategorysFiltro] = useState(
      JSON.parse(localStorage.getItem("categorysFiltro")) || []
  );

  // Estado para fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(null);

  // Función para guardar categorías en localStorage
  const saveCategoryStorage = (categorys) => {
    setCategorysFiltro(categorys);
    localStorage.setItem("categorysFiltro", JSON.stringify(categorys));
    console.log("Categorías actualizadas:", categorys);
  };

  // Función para guardar fecha seleccionada
  const saveDateSelection = (date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada actualizada:", date);
    // Aquí podrías también guardar en localStorage si lo deseas
  };

  // Estado para ID de categoría filtrada
  const [categoriaFiltroID, setCategoriaFiltroID] = useState("");

  // Cargar datos de localStorage al inicio
  useEffect(() => {
    const storedCategorys = JSON.parse(localStorage.getItem("categorysFiltro"));

    if (storedCategorys) {
      setCategorysFiltro(storedCategorys);
    }
  }, []);

  // Guardar cambios en localStorage cuando cambien las categorías filtradas
  useEffect(() => {
    localStorage.setItem("categorysFiltro", JSON.stringify(categorysFiltro));
    console.log("Categorías guardadas en localStorage:", categorysFiltro);
  }, [categorysFiltro]);

  // Objeto de datos a pasar al contexto
  const contextData = {
    categorysFiltro,
    setCategorysFiltro,
    saveCategoryStorage,
    categoriaFiltroID,
    setCategoriaFiltroID,
    selectedDate,
    saveDateSelection,
  };

  return (
      <SearchContext.Provider value={contextData}>
        {children}
      </SearchContext.Provider>
  );
};

export default SearchContextComponent;