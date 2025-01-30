import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SingleCard from "./components/SingleCard.jsx";
import { MoviesProvider } from "./context/MovieContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MoviesProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/single-movie/:id" element={<SingleCard />} />
        </Routes>
      </MoviesProvider>
    </BrowserRouter>
  </StrictMode>
);
