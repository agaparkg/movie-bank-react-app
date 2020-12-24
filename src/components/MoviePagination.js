import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default class MoviePagination extends Component {
  render() {
    const { activePage, total_pages, handlePageChange } = this.props;
    return (
      <div className="pagination-rstrap">
        <Pagination aria-label="Page navigation example">
          <PaginationItem onClick={() => handlePageChange(1)}>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage <= 1}
          >
            <PaginationLink previous href="#" />
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(1)}
            active={activePage === 1}
          >
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(2)}
            active={activePage === 2}
          >
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(3)}
            active={activePage === 3}
          >
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(4)}
            active={activePage === 4}
          >
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(5)}
            active={activePage === 5}
          >
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(6)}
            active={activePage === 6}
          >
            <PaginationLink href="#">6</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(7)}
            active={activePage === 7}
          >
            <PaginationLink href="#">7</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(8)}
            active={activePage === 8}
          >
            <PaginationLink href="#">8</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(9)}
            active={activePage === 9}
          >
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(10)}
            active={activePage === 10}
          >
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage >= total_pages}
          >
            <PaginationLink next href="#" />
          </PaginationItem>
          <PaginationItem onClick={() => handlePageChange(total_pages)}>
            <PaginationLink last href="#" />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}
