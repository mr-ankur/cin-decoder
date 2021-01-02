import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from "redux-form";
import { Container, Row, Col } from "react-grid-system"
import { searchCIN } from "../actions/cinActions";
import { signOut } from "../actions/authActions";
import { textField } from './formComponents'
import { Link } from "react-router-dom";

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

class CinDecoder extends Component {
  state = {
    lastSearch: null,
  }
  submit = (values) => {
    let number = values.cin && values.cin.number;
    if(number && number !== this.state.lastSearch) {
      this.setState({ lastSearch: number})
      this.props.searchCIN(number);
    }
  };
  render() {
    const { handleSubmit } = this.props;
    const valid = this.props.cin && this.props.cin.valid
    const { auth } = this.props
    return (
      <Container>
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
                    component={textField}
                    label="CIN Number"
                  />
                </Col>
                <Col xs={4}>
                  <button className="search-button" type="submit" style={{marginLeft: '-8px'}}>
                    Search
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
          {!valid && this.props.cin && (
            <Col
              xs={12}
              style={{ color: "grey", fontSize: "2.5vmax", marginTop: "2vmax" }}
            >
              CIN Number is incorrect, please check it and try again.
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
        </Row>
        <Row style={{ marginTop: "3.5vmax" }}>
          {auth &&
            !auth.currentUser && (
              <Col xs={9}>
                <Link to="/login" style={{ fontSize: "2.5vmax" }}>
                  Log In
                </Link>
              </Col>
            )}
          {auth &&
            auth.currentUser && (
              <div>
                <Col xs={9}>
                  <Link to="/search_history" style={{ fontSize: "2.5vmax" }}>
                    Search History
                  </Link>
                </Col>
                <Col xs={3}>
                  <button onClick={() => this.props.signOut()}>Sign Out</button>
                </Col>
              </div>
            )}
        </Row>
      </Container>
    );
  }
}

const structuredSelector = createStructuredSelector({
  cin: (state) => state.cinReducer.cin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    signOut: () => dispatch(signOut()),
    searchCIN: (params) => dispatch(searchCIN(params)),
  };
};

const CinForm = reduxForm({
  // a unique name for the form
  form: "cin",
  validate,
})(CinDecoder);

export default connect(structuredSelector, mapDispatchToProps)(CinForm);

