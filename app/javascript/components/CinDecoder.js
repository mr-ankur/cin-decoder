import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import axios from 'axios'
import { Field, reduxForm } from "redux-form";
import SearchHistory from './SearchHistory'

const GET_CIN_SEARCH_SUCCESS = 'GET_CIN_SEARCH_SUCCESS';
const GET_SEARCH_HISTORY_SUCCESS = "GET_SEARCH_HISTORY_SUCCESS";


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
  // UNSAFE_componentWillReceiveProps(np) {
  //   console.log(111, np);
  // }
  submit = (values) => {
    let number = values.cin && values.cin.number;
    if(number) this.props.searchCIN(number);
  };
  render() {
    const { handleSubmit } = this.props;
    const { showHistory } = this.state
    const valid = this.props.cin && this.props.cin.valid
    return (
      <div>
        {!showHistory && (
          <div>
            <form onSubmit={handleSubmit(this.submit)}>
              <div>
                <label>CIN Number</label>
                <div>
                  <Field
                    name="cin.number"
                    component="input"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <button type="submit">Search CIN Number</button>
            </form>
            {!valid && this.props.cin && <div>CIN is not valid</div>}
            {valid && (
              <div>
                <br />
                <br />
                <span>Listing status: {this.props.cin.listing} compony</span>
                <br />
                <span>Industry Code: {this.props.cin.industry_code}</span>
                <br />
                <span>State: {this.props.cin.state}</span>
                <br />
                <span>Company incorporate year: {this.props.cin.year}</span>
                <br />
                <span>Company Type: {this.props.cin.ownership}</span>
                <br />
                <span>Registration Number: {this.props.cin.reg_no}</span>
              </div>
            )}
            <br />
            <br />
            <button onClick={() => this.setState({ showHistory: true })}>
              Search History
            </button>
          </div>
        )}
        {showHistory && (
          <div>
            <SearchHistory {...this.props} />
            <br />
            <br />
            <button onClick={() => this.setState({ showHistory: false })}>
              Back
            </button>
          </div>
        )}
      </div>
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
})(CinDecoder);

export default connect(structuredSelector, mapDispatchToProps)(CinForm);

