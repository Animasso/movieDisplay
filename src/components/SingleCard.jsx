import { useParams } from "react-router-dom";
import { useContext } from "react";

import { MoviesContext } from "../context/MovieContext";
const SingleCard = () => {
  const { id } = useParams();
  const { moviesList } = useContext(MoviesContext);
  const movie = moviesList.find((m) => m.id.toString() === id);

  if (!movie) {
    return <p>Sorry we didn't find this movie...</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Note: {movie.vote_average}</p>
      <p>Langue: {movie.original_language}</p>
      <p>Date de sortie: {movie.release_date}</p>
    </div>
  );
};

export default SingleCard;
