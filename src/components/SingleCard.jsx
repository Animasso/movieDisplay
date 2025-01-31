import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import star from "../assets/star.svg";
import { MoviesContext } from "../context/MovieContext";
const SingleCard = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState({});
  const { moviesList } = useContext(MoviesContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Vérifier si le film existe déjà dans le contexte
    let foundMovie = moviesList.find((m) => m.id.toString() === id);
    if (foundMovie) {
      setSingleMovie(foundMovie);
      setLoading(false);
    } else {
      // Si le film n'est pas dans le contexte, le récupérer via l'API
      fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`, API_OPTIONS)
        .then((res) => res.json())
        .then((data) => {
          setSingleMovie(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement du film :", error);
          setLoading(false);
        });
    }
  }, [id, moviesList]);

  if (loading) return <p>Chargement du film...</p>;
  if (!singleMovie) return <p>Film non trouvé.</p>;

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
          <div className="rating">
            <div className=" flex place-self-center">
              <p className=" text-white mr-2">
                Note: {singleMovie.vote_average}
              </p>
              <img src={star} alt="star svg" />
            </div>

            <p className=" text-white">
              language: {singleMovie.original_language}
            </p>
            <p className=" text-white">
              Release Date: {singleMovie.release_date}
            </p>
          </div>
        </div>
      </div>
      <div className=" justify-self-center">
        <button
          onClick={() => navigate("/")}
          className=" bg-black text-white py-3 px-3 hover:text-black hover:bg-white border-2 shadow-2xl rounded-lg mt-4 cursor-pointer"
        >
          Go back to the movie list
        </button>
      </div>
    </div>
  );
};

export default SingleCard;
