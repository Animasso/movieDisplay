import React from "react";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import heroBg from "./assets/hero.png";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isloading, setisLoading] = useState(false);
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const fetchMovies = async () => {
    setisLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch movies.");
    } finally {
      setisLoading(false);
    }
  };

  console.log("movies:", movies);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src={heroBg} alt="hero banner" />
            <h1>
              Find <span className="text-gradient"> Movies</span> You'll Enjoy
              Without the Hassel
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2 className=" mt-10">All Movies</h2>
            {isloading ? (
              <p className=" text-white">Loading</p>
            ) : errorMessage ? (
              <p className=" text-red-500 text-center">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <li key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3 className=" text-white">{movie.title}</h3>
                    <p className=" text-white">
                      {movie.overview.slice(0, 100)}...
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
