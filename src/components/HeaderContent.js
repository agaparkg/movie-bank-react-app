import React, { Component } from "react";
import { Button } from "reactstrap";
import { DebounceInput } from "react-debounce-input";

export default class HeaderContent extends Component {
  state = {
    inputVal: "",
  };

  handleSearchChange = (e) => {
    this.setState({ inputVal: e.target.value });
  };

  handleSearchClick = () => {
    const { inputVal } = this.state;
    const { handleMovieSearch } = this.props;
    if (inputVal) {
      handleMovieSearch(inputVal);
      this.setState({ inputVal: "" });
    }
  };

  render() {
    const { inputVal } = this.state;
    const { handlePageChange, genres, handleGenreChange } = this.props;
    console.log("list of genres:", genres);
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
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            {genres.map((genre) => {
              return (
                <option
                  key={genre.id}
                  className="genre-options"
                  value={genre.name}
                >
                  {genre.name.toUpperCase()}
                </option>
              );
            })}
          </select>
          <div className="header-middle-tabs downloads">DOWNLOADS</div>
          <div className="header-middle-tabs contact">CONTACT</div>
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
