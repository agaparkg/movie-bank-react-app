import React, { Component } from "react";
import HeaderContent from "./components/HeaderContent";
import IsLoading from "./components/IsLoading";
import MainMovieContent from "./components/MainMovieContent";
import { moviesUrl, genresUrl } from "./apiUrls";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      activePage: 1,
      total_pages: 0,
      total_results: 0,
      genres: [],
      selectedGenreId: "",
      searchText: "",
    };
  }

  componentDidMount() {
    const { activePage } = this.state;
    this.setState({ isLoading: false });
    this.fetchJson(activePage);
    this.fetchGenres();
  }

  fetchGenres = () => {
    fetch(genresUrl)
      .then((res) => res.json())
      .then((data) => {
        const topGenre = { id: 45, name: "Genre" };
        let fetchedGenres = data.genres;
        fetchedGenres.unshift(topGenre);
        this.setState({ genres: fetchedGenres, selectedGenreId: topGenre.id });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  fetchJson = (pageNum) => {
    fetch(`${moviesUrl}&page=${pageNum}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            movies: data.results,
            isLoading: true,
            total_pages: data.total_pages,
            total_results: data.total_results,
          });
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  handlePageChange = (pageNumber) => {
    const { total_pages } = this.state;
    if (pageNumber >= 1 && pageNumber <= total_pages) {
      this.setState({
        activePage: pageNumber,
        isLoading: false,
        searchText: "",
      });
      this.fetchJson(pageNumber);
    }
  };

  handleGenreChange = (genreName) => {
    const { genres } = this.state;
    const chosenGenre = genres.find((genre) => genre.name === genreName);
    this.setState({ selectedGenreId: chosenGenre.id });
  };

  handleMovieSearch = (text) => {
    this.setState({ searchText: text });
  };

  render() {
    const {
      movies,
      isLoading,
      activePage,
      total_pages,
      genres,
      selectedGenreId,
      searchText,
    } = this.state;
    console.log("list of movies:", movies);
    const moviesByGenre =
      selectedGenreId !== 45
        ? movies.filter((movie) => movie.genre_ids.includes(selectedGenreId))
        : movies;
    const moviesBySearchText =
      searchText !== ""
        ? moviesByGenre.filter((movie) =>
            movie.title.toLowerCase().includes(searchText)
          )
        : moviesByGenre;
    return (
      <div className="App">
        <HeaderContent
          genres={genres}
          handleMovieSearch={this.handleMovieSearch}
          handleGenreChange={this.handleGenreChange}
          handlePageChange={this.handlePageChange}
        />
        {isLoading ? (
          <MainMovieContent
            activePage={activePage}
            total_pages={total_pages}
            handlePageChange={this.handlePageChange}
            movies={moviesBySearchText}
          />
        ) : (
          <IsLoading />
        )}
      </div>
    );
  }
}
