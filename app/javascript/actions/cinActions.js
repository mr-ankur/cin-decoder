import axios from "axios";
import ReactOnRails from "react-on-rails";
import {
  GET_CIN_SEARCH_SUCCESS,
  GET_SEARCH_HISTORY_SUCCESS,
} from "../constants/cinConstants";
axios.defaults.headers.common[
  "X-CSRF-Token"
] = ReactOnRails.authenticityToken();
axios.defaults.headers.post["Content-Type"] = "application/json";

function searchCINSuccess(data) {
  return {
    type: GET_CIN_SEARCH_SUCCESS,
    data,
  };
}

function getSearchHistorySuccess(data) {
  return {
    type: GET_SEARCH_HISTORY_SUCCESS,
    data,
  };
}

export function getSearchHistory() {
  return (dispatch) => {
    return axios
      .get("v1/cin/search_history")
      .then((response) => response.data)
      .then((data) => dispatch(getSearchHistorySuccess(data)))
      .catch((error) => console.log(error));
  };
}

export function searchCIN(number) {
  return (dispatch) => {
    return axios
      .get("v1/cin?number=" + number)
      .then((response) => response.data)
      .then((data) => dispatch(searchCINSuccess(data)))
      .catch((error) => console.log(error));
  };
}

