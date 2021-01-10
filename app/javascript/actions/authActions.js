import axios from "axios";
import ReactOnRails from "react-on-rails";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/authConstants";

axios.defaults.headers.common[
  "X-CSRF-Token"
] = ReactOnRails.authenticityToken();
axios.defaults.headers.post["Content-Type"] = "application/json";

function signUpSuccess(data) {
  return {
    type: SIGNUP_SUCCESS,
    data,
  };
}

function signUpFailed(data) {
  return {
    type: SIGNUP_FAILED,
    data,
  };
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

function loginFailed(data) {
  return {
    type: LOGIN_FAILED,
    data,
  };
}

function logoutSuccess(data) {
  return {
    type: LOGOUT_SUCCESS,
    data,
  };
}

function logoutFailed(data) {
  return {
    type: LOGOUT_FAILED,
    data,
  };
}

export function signOut() {
  return (dispatch) => {
    return axios
      .get("users/sign_out")
      .then((response) => {
        axios.defaults.headers.common["X-CSRF-Token"] =
          response.headers["x-csrf-token"];
          window.location.href = "/";
        if (response.data) dispatch(logoutSuccess(response.data));
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.statusText === "Unprocessable Entity"
        ) {
          console.log("Unprocessable Entity");
          window.location.href = "/";
        } else {
          if (error.response) dispatch(logoutFailed(error.response.data));
        }
      });
  };
}

export function signIn(params) {
  return (dispatch) => {
    return axios
      .post("users/sign_in", params)
      .then((response) => {
        axios.defaults.headers.common["X-CSRF-Token"] =
          response.headers["x-csrf-token"];
        if (response.data) dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.statusText === "Unprocessable Entity"
        ) {
          console.log("Unprocessable Entity");
          window.location.href = "/sign_in";
        } else {
          if (error.response) dispatch(loginFailed(error.response.data));
          window.location.href = "/sign_in";
        }
      });
  };
}

export function signUp(params) {
  return (dispatch) => {
    return axios
      .post("/users", params)
      .then((response) => {
        axios.defaults.headers.common["X-CSRF-Token"] =
          response.headers["x-csrf-token"];
        if (response.data) dispatch(signUpSuccess(response.data));
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.statusText === "Unprocessable Entity"
        ) {
          console.log("Unprocessable Entity");
          window.location.href = "/sign_up";
        } else {
          if (error.response) dispatch(signUpFailed(error.response.data));
          window.location.href = "/sign_up";
        }
      });
  };
}