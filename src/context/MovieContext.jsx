import { createContext, useState } from "react";

// Création du contexte
export const MoviesContext = createContext();

// Fournisseur du contexte
export const MoviesProvider = ({ children }) => {
  const [moviesList, setMoviesList] = useState([]);

  return (
    <MoviesContext.Provider value={{ moviesList, setMoviesList }}>
      {children}
    </MoviesContext.Provider>
  );
};
