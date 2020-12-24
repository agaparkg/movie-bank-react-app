import React, { Component } from "react";
import SingleMovie from "./SingleMovie";

export default class MovieList extends Component {
  render() {
    const { movies } = this.props;
    return (
      <div className="movies-list">
        {movies.map((movie) => {
          return <SingleMovie key={movie.id} movie={movie} />;
        })}
      </div>
    );
  }
}
