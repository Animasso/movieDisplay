import React from "react";
import Search from "./components/Search";
import { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import { useDebounce } from "react-use";
import heroBg from "./assets/hero.png";
import Card from "./components/Card";
import { MoviesContext } from "./context/MovieContext";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
const App = () => {
  // const [moviesList, setMoviesList] = useState([]);
  const { moviesList, setMoviesList } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isloading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const fetchMovies = async (query = "") => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      setMoviesList(data.results);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch movies.");
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <motion.img
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              src={heroBg}
              alt="hero banner"
            />
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              Find <span className="text-gradient"> Movies</span> You'll Enjoy
              Without the Hassel
            </motion.h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, i) => (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ delay: i * 0.2, duration: 0.3 }}
                    key={movie.$id}
                  >
                    <p>{i + 1} </p>
                    <img src={movie.poster_url} alt={movie.title} />
                    <h3>{movie.title}</h3>
                  </motion.li>
                ))}
              </ul>
            </section>
          )}
          <section className="all-movies">
            <h2 className="">All Movies</h2>
            {isloading ? (
              <p className=" text-white">Loading</p>
            ) : errorMessage ? (
              <p className=" text-red-500 text-center">{errorMessage}</p>
            ) : (
              <ul>
                {moviesList.map((movie, i) => (
                  <Card key={movie.id} movie={movie} index={i} />
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
