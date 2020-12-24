import React, { Component } from "react";
import MoviePagination from "./MoviePagination";
import MovieList from "./MovieList";

export default class MainMovieContent extends Component {
  render() {
    const { activePage, total_pages, handlePageChange, movies } = this.props;
    return (
      <main>
        <MoviePagination
          activePage={activePage}
          total_pages={total_pages}
          handlePageChange={handlePageChange}
        />
        <MovieList movies={movies} />
      </main>
    );
  }
}
