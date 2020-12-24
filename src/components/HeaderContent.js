import React, { Component } from "react";
import { Button, Input } from "reactstrap";

export default class HeaderContent extends Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=df8b08ecb436696fee41a00f8d87a540&language=en-US";
    fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ genres: data.genres }))
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  render() {
    const { genres } = this.state;
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
          <div className="header-middle-tabs home active-tab">HOME</div>
          <div className="header-middle-tabs favorites">FAVORITES</div>
          <select className="header-middle-tabs genres" name="genre" id="genre">
            <option className="genre-options" value="genre">
              GENRE
            </option>
            {genres.map((genre) => {
              return (
                <option
                  className="genre-options"
                  value={genre.name.toLowerCase()}
                >
                  {genre.name}
                </option>
              );
            })}
          </select>
          <div className="header-middle-tabs downloads">DOWNLOADS</div>
          <div className="header-middle-tabs contact">CONTACT US</div>
        </div>
        <div className="header-right">
          <Input name="search" id="search-inp" />
          <Button color="info" id="search-btn">
            Search
          </Button>
        </div>
      </header>
    );
  }
}
