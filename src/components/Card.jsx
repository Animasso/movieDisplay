import React from "react";
import noMovie from "../assets/no-movie.png";
import star from "../assets/star.svg";
import { motion } from "motion/react";
const Card = ({
  index,
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.3 }}
      className=" movie-card"
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : { noMovie }
        }
        alt={title}
      />
      <div className=" mt-4">
        <h3>{title} </h3>
        <div className="content">
          <div className="rating">
            <img src={star} alt="star svg" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"} </p>
          </div>
          <span>/</span>
          <p className="lang">{original_language}</p>
          <span>/</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}{" "}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
