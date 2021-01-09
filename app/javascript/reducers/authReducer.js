import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/authConstants";

const initialState = {
  message: null,
  errors: null,
  loggedIn: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        data: action.data,
        currentUser: action.data,
      };
    case LOGIN_FAILED:
      return {
        loggingIn: false,
        loggedIn: false,
        errors: action.data.error
          ? action.data.error
          : Object.entries(action.data.errors)
              .map((m) => m.join(" "))[0]
              .replace("_", " "),
      };
    case LOGOUT_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: false,
        currentUser: false,
        message: "Signed out successfully",
      };
    case LOGOUT_FAILED:
      return {
        loggingIn: false,
        loggedIn: true,
        errors: action.data.error
          ? action.data.error
          : Object.entries(action.data.errors)
              .map((m) => m.join(" "))[0]
              .replace("_", " "),
      };
    case SIGNUP_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        currentUser: action.data,
        message: "Signup successful",
      };
    case SIGNUP_FAILED:
      return {
        loggingIn: false,
        loggedIn: false,
        currentUser: null,
        message: "Signup failed",
      };
    default:
      return state;
  }
}
