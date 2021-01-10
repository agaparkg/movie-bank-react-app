import React, { Component } from "react";
import HeaderContent from "./components/HeaderContent";
import IsLoading from "./components/IsLoading";
import MainMovieContent from "./components/MainMovieContent";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      activePage: 1,
      total_pages: 0,
      total_results: 0,
    };
  }

  componentDidMount() {
    const { activePage } = this.state;
    this.setState({ isLoading: false });
    this.fetchJson(activePage);
  }

  fetchJson = (pageNum) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=df8b08ecb436696fee41a00f8d87a540&language=en-US&page=${pageNum}`
    )
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
    console.log("pageNumber is = ", pageNumber);
    const { total_pages } = this.state;
    if (pageNumber >= 1 && pageNumber <= total_pages) {
      this.setState({ activePage: pageNumber, isLoading: false });
      this.fetchJson(pageNumber);
    }
  };
  render() {
    const { movies, isLoading, activePage, total_pages } = this.state;
    return (
      <div className="App">
        <HeaderContent handlePageChange={this.handlePageChange} />
        {isLoading ? (
          <MainMovieContent
            activePage={activePage}
            total_pages={total_pages}
            handlePageChange={this.handlePageChange}
            movies={movies}
          />
        ) : (
          <IsLoading />
        )}
      </div>
    );
  }
}
