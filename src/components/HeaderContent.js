import React, { Component } from "react";
import { Button } from "reactstrap";
import { DebounceInput } from "react-debounce-input";

export default class HeaderContent extends Component {
  state = {
    genres: [],
    inputVal: "",
  };

  handleSearchChange = (e) => {
    this.setState({ inputVal: e.target.value });
  };

  handleSearchClick = () => {
    const { inputVal } = this.state;
    console.log("input value is", inputVal);
  };

  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=df8b08ecb436696fee41a00f8d87a540&language=en-US";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const topGenre = { id: 45, name: "Genre" };
        let fetchedGenres = data.genres;
        fetchedGenres.unshift(topGenre);
        this.setState({ genres: fetchedGenres });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  handleSelectedGenre = (e) => {
    console.log(e.target.value);
  };

  render() {
    const { genres, inputVal } = this.state;
    const { handlePageChange } = this.props;
    console.log(genres);
    return (
      <header>
        <div className="header-left">
          <img
            id="logo"
            src={require("../images/logo.png").default}
            alt="logo here"
          />
          <div>MOVIE BANK</div>
          <img
            id="blk-matters"
            src={require("../images/blkmatters.gif").default}
            alt="black lives matter gif"
          />
        </div>
        <hr />
        <div className="header-center">
          <div
            className="header-middle-tabs home active-tab"
            onClick={() => handlePageChange(1)}
          >
            HOME
          </div>
          <div className="header-middle-tabs favorites">FAVORITES</div>
          <select
            className="header-middle-tabs genres"
            name="genre"
            id="genre"
            onClick={(e) => this.handleSelectedGenre(e)}
          >
            {genres.map((genre) => {
              return (
                <option
                  key={genre.id}
                  className="genre-options"
                  value={genre.name.toLowerCase()}
                >
                  {genre.name.toUpperCase()}
                </option>
              );
            })}
          </select>
          <div className="header-middle-tabs downloads">DOWNLOADS</div>
          <div className="header-middle-tabs contact">CONTACT US</div>
        </div>
        <div className="header-right">
          {/* <Input name="search" id="search-inp" /> */}
          <DebounceInput
            value={inputVal}
            name="search"
            id="search-inp"
            minLength={2}
            debounceTimeout={300}
            onChange={(e) => this.handleSearchChange(e)}
          />
          <Button color="info" id="search-btn" onClick={this.handleSearchClick}>
            Search
          </Button>
        </div>
      </header>
    );
  }
}
