import React, { Component } from "react";
import HeaderContent from "./components/HeaderContent";
import IsLoading from "./components/IsLoading";
import MainMovieContent from "./components/MainMovieContent";
import { moviesUrl, genresUrl, searchUrl } from "./apiUrls";

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
      favorites: [],
      navbar: "home",
      downloads: [],
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
    const { total_pages, searchText } = this.state;
    if (pageNumber >= 1 && pageNumber <= total_pages) {
      if (!searchText) {
        this.fetchJson(pageNumber);
      } else {
        this.handleMovieSearch(searchText);
      }
      this.setState({
        activePage: pageNumber,
        isLoading: false,
        searchText: "",
      });
    }
  };

  handleGenreChange = (genreName) => {
    const { genres } = this.state;
    const chosenGenre = genres.find((genre) => genre.name === genreName);
    this.setState({ selectedGenreId: chosenGenre.id });
  };

  handleMovieSearch = (text) => {
    this.setState({ isLoading: false });
    const { activePage } = this.state;

    fetch(`${searchUrl}&query=${text}&page=${activePage}&include_adult=false`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            movies: data.results,
            isLoading: true,
            total_pages: data.total_pages,
            total_results: data.total_results,
            searchText: text,
          });
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  handleAddFavorite = (id) => {
    const { favorites, movies } = this.state;
    const newFavorites = [...favorites];
    const favMovie = movies.find((movie) => movie.id === id);
    newFavorites.push(favMovie);
    this.setState({ favorites: newFavorites });
  };

  handleNavBarChange = (nav) => {
    switch (nav) {
      case "home":
        this.fetchJson(1);
        this.setState({ activePage: 1, navbar: "home", searchText: "" });
        break;
      case "favorites":
        const { favorites } = this.state;
        this.setState({
          movies: favorites,
          navbar: "favorites",
          searchText: "",
        });
        break;
      case "downloads":
        const { downloads } = this.state;
        this.setState({
          movies: downloads,
          navbar: "downloads",
          searchText: "",
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      movies,
      isLoading,
      activePage,
      total_pages,
      genres,
      selectedGenreId,
      navbar,
    } = this.state;
    console.log("list of movies:", movies);
    const moviesByGenre =
      selectedGenreId !== 45
        ? movies.filter((movie) => movie.genre_ids.includes(selectedGenreId))
        : movies;
    return (
      <div className="App">
        <HeaderContent
          genres={genres}
          handleMovieSearch={this.handleMovieSearch}
          handleGenreChange={this.handleGenreChange}
          handlePageChange={this.handlePageChange}
          handleNavBarChange={this.handleNavBarChange}
          navbar={navbar}
        />
        {isLoading ? (
          <MainMovieContent
            activePage={activePage}
            total_pages={total_pages}
            handlePageChange={this.handlePageChange}
            movies={moviesByGenre}
            handleAddFavorite={this.handleAddFavorite}
          />
        ) : (
          <IsLoading />
        )}
      </div>
    );
  }
}
