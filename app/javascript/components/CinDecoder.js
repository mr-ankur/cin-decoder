import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import axios from 'axios'
import { Field, reduxForm } from "redux-form";
import SearchHistory from './SearchHistory'
import { Container, Row, Col } from "react-grid-system"

const GET_CIN_SEARCH_SUCCESS = 'GET_CIN_SEARCH_SUCCESS';
const GET_SEARCH_HISTORY_SUCCESS = "GET_SEARCH_HISTORY_SUCCESS";

const renderTextField = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className="search-field"
        {...input}
        placeholder={label}
        type="text"
      />
      {touched &&
        ((error && <span style={{color: 'red'}}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = (values) => {
  const errors = { cin: {}};
  let {cin = {}} = values
  if (cin && !cin.number) {
    errors.cin.number = "CIN Number is required";
  } else if(cin && cin.number && cin.number.length != 21 ){
    errors.cin.number = "CIN Number is Invalid";
  }
  return errors;
};

function searchCIN(number){
  return dispatch => {
    return axios
      .get("v1/cin?number="+number )
      .then((response) => response.data)
      .then((data) => dispatch(searchCINSuccess(data)))
      .catch((error) => console.log(error));
  }
}

function searchCINSuccess(data) {
  return {
    type: GET_CIN_SEARCH_SUCCESS,
    data,
  };
}

function getSearchHistory(){
  return (dispatch) => {
    return axios
      .get("v1/cin/search_history")
      .then((response) => response.data)
      .then((data) => dispatch(getSearchHistorySuccess(data)))
      .catch((error) => console.log(error));
  };
}

function getSearchHistorySuccess(data){
  return {
    type: GET_SEARCH_HISTORY_SUCCESS,
    data,
  };
}

class CinDecoder extends Component {
  state={
    showHistory: false
  }
  submit = (values) => {
    let number = values.cin && values.cin.number;
    if(number) this.props.searchCIN(number);
  };
  render() {
    const { handleSubmit } = this.props;
    const { showHistory } = this.state
    const valid = this.props.cin && this.props.cin.valid
    console.log(8888, this.props)
    return (
      <Container>
        {!showHistory && (
          <Row style={{ marginTop: "10%" }}>
            <Col xs={12}>
              <h1
                style={{
                  textAlign: "center",
                  color: "lightslategray",
                  fontSize: "3vmax",
                }}
              >
                CIN Number Decoder
              </h1>
            </Col>
            <Col xs={12}>
              <form onSubmit={handleSubmit(this.submit)}>
                <Row>
                  <Col xs={8}>
                    <Field
                      name="cin.number"
                      component={renderTextField}
                      label="CIN Number"
                    />
                  </Col>
                  <Col xs={4}>
                    <button className="search-button" type="submit">
                      Search
                    </button>
                  </Col>
                </Row>
              </form>
            </Col>
            {!valid && this.props.cin && (
              <Col xs={12} style={{ color: "red", fontSize: "2.5vmax" }}>
                CIN Number is incorrect, please check it again and try again.
              </Col>
            )}
            {valid && (
              <Col xs={12}>
                <br />
                <br />
                <table className="table-style">
                  <tbody>
                    <tr>
                      <td>Listing status</td>
                      <td>{this.props.cin.listing}</td>
                    </tr>
                    <tr>
                      <td>Industry Code</td>
                      <td>{this.props.cin.industry_code}</td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td>{this.props.cin.state}</td>
                    </tr>
                    <tr>
                      <td>Company Incorporate Year</td>
                      <td>{this.props.cin.year}</td>
                    </tr>
                    <tr>
                      <td>Company Type</td>
                      <td>{this.props.cin.ownership}</td>
                    </tr>
                    <tr>
                      <td>Registration Number</td>
                      <td>{this.props.cin.reg_no}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            )}
            <Col xs={12}>
              <br />
              <br />
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "3vmax",
                }}
                onClick={() => this.setState({ showHistory: true })}
              >
                Search History
              </span>
            </Col>
          </Row>
        )}
        {showHistory && (
          <Row style={{ marginTop: "5%" }}>
            <Col xs={12}>
              <SearchHistory {...this.props} />
            </Col>
            <br />
            <br />
            <Col xs={12}>
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "3vmax",
                }}
                onClick={() => this.setState({ showHistory: false })}
              >
                Back
              </span>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const structuredSelector = createStructuredSelector({
  cin: (state) => state.cinReducer.cin,
  search_history: (state) => state.cinReducer.search_history,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getSearchHistory: () => dispatch(getSearchHistory()),
    searchCIN: (params) => dispatch(searchCIN(params)),
  };
};

const CinForm = reduxForm({
  // a unique name for the form
  form: "cin",
  validate,
})(CinDecoder);

export default connect(structuredSelector, mapDispatchToProps)(CinForm);

