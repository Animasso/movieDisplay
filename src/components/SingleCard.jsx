import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MoviesContext } from "../context/MovieContext";
const SingleCard = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState({});
  const { moviesList } = useContext(MoviesContext);
  useEffect(() => {
    const movie = moviesList.find((m) => m.id.toString() === id);
    setSingleMovie(movie);
    if (!singleMovie) {
      return <p>Sorry we didn't find this movie...</p>;
    }
  }, []);

  return (
    <div>
      <h1 className=" mt-11 mb-11">{singleMovie.title}</h1>
      <div className=" lg:flex lg:mx-10 lg:place-self-center">
        <img
          className=" justify-self-center"
          src={`https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`}
          alt={singleMovie.title}
        />
        <div
          className=" mx-3 lg:max-w-96 lg:min-h-fit lg:place-self-center
       mt-5 text-center  p-2 border-4 border-white"
        >
          <p className=" text-white">{singleMovie.overview}</p>
          <p className=" text-white">Note: {singleMovie.vote_average}</p>
          <p className=" text-white">
            language: {singleMovie.original_language}
          </p>
          <p className=" text-white">
            Release Date: {singleMovie.release_date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
