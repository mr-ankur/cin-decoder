import React, { Component } from 'react'
import moment from "moment";
import Pagination from "react-js-pagination";

const PER_PAGE_DATA = 5

export default class SearchHistory extends Component {
  state = { activePage: 1 };
  componentWillMount() {
    this.props.getSearchHistory();
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  render() {
    const { search_history } = this.props;
    const page_data =
      search_history &&
      search_history.slice(
        this.state.activePage - 1,
        this.state.activePage + PER_PAGE_DATA - 1
      );
    return (
      <div>
        <h1>Search History</h1>
        {page_data &&
          page_data.map((x) => (
            <div key={x.id}>
              <span style={{ padding: "1rem" }}>{x.search_key}</span>
              <span style={{ padding: "1rem" }}>
                {moment(x.created_at).format("LLLL")}
              </span>
            </div>
        ))}
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={PER_PAGE_DATA}
          totalItemsCount={(search_history && search_history.length) || 100}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
          style={{ display: "inline-flex", listStyleType: "none" }}
        />
      </div>
    );
  }
}
