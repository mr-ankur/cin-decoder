import React, { Component } from 'react'
import moment from "moment";
import Pagination from "react-js-pagination";
import { Container, Row, Col } from "react-grid-system";

const PER_PAGE_DATA = 8

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
      <Container>
        <Row>
          <Col xs={12}>
            <h1 style={{ textAlign: "center", color: "lightslategray" }}>
              Search History
            </h1>
          </Col>
          <Col xs={12}>
            <table className="table-style">
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
                        {moment(x.created_at).format("LLLL")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Row>
              <Col xs={12}>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={PER_PAGE_DATA}
                  totalItemsCount={
                    (search_history && search_history.length) || 100
                  }
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  style={{ display: "inline-flex", listStyleType: "none" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
