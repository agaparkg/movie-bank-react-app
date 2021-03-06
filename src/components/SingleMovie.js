import React from "react";

export default function SingleMovie(props) {
  const { movie, handleAddFavorite } = props;
  return movie.poster_path !== null ? (
    <div className="movie">
      <img
        src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt="movie poster"
      />
      <div className="overlay" onClick={() => handleAddFavorite(movie.id)}>
        Add to Favorites
      </div>
      <div className="vote-average">{movie.vote_average.toFixed(1)}</div>
    </div>
  ) : null;
}
