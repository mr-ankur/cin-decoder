import React, { Component } from 'react'
import moment from "moment";
import Pagination from "react-js-pagination";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-grid-system";
import { getSearchHistory } from "../actions/cinActions";
import { signOut } from "../actions/authActions";
import { Link } from "react-router-dom";

const PER_PAGE_DATA = 5

class SearchHistory extends Component {
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
        (this.state.activePage - 1) * PER_PAGE_DATA,
        this.state.activePage * PER_PAGE_DATA
      );
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h1
              style={{
                textAlign: "center",
                color: "lightslategray",
                fontSize: "3vmax",
              }}
            >
              Search History
            </h1>
          </Col>
          <Col xs={12}>
            <table
              className="table-style"
              style={{
                fontSize: "1.5vmax",
              }}
            >
              <tbody>
                <tr>
                  <th style={{ textAlign: "center" }}>Search Key</th>
                  <th style={{ textAlign: "center" }}>Time</th>
                </tr>
                {page_data &&
                  page_data.map((x) => (
                    <tr key={x.id}>
                      <td style={{ textAlign: "center" }}>{x.search_key}</td>
                      <td style={{ textAlign: "center" }}>
                        {moment(x.created_at).format("h:mm:ss A, D MMM YYYY")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {search_history && search_history.length == 0 && (
              <Row>
                <Col xs={12}><span style={{ margin: '2vmax'}}> No search history yet.</span></Col>
              </Row>
            )}
            {search_history && search_history.length > PER_PAGE_DATA && (
              <Row>
                <Col xs={12}>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={PER_PAGE_DATA}
                    totalItemsCount={search_history && search_history.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    style={{ display: "inline-flex", listStyleType: "none" }}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col xs={6}>
            <Link to="/" style={{ fontSize: "2vmax" }}>
              Home
            </Link>
          </Col>
          <Col xs={6}>
            <Link
              onClick={() => this.props.signOut()}
              to=""
              style={{ fontSize: "2vmax" }}
            >
              Sign Out
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

const structuredSelector = createStructuredSelector({
  search_history: (state) => state.cinReducer.search_history,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    signOut: () => dispatch(signOut()),
    getSearchHistory: () => dispatch(getSearchHistory()),
  };
};

export default connect(structuredSelector, mapDispatchToProps)(SearchHistory);
