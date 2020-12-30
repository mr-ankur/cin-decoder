import axios from "axios";
import ReactOnRails from "react-on-rails";

axios.defaults.headers.common[
  "X-CSRF-Token"
] = ReactOnRails.authenticityToken();
axios.defaults.headers.post["Content-Type"] = "application/json";

export function signOut() {
  return (dispatch) => {
    return axios
      .get("users/sign_out")
      .then((response) => {
        axios.defaults.headers.common["X-CSRF-Token"] =
          response.headers["x-csrf-token"];
          window.location.href = "/";
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.statusText === "Unprocessable Entity"
        ) {
          console.log("Unprocessable Entity");
          window.location.href = "/";
        } else {
          console.log(error);
          window.location.href = "/";
        }
      });
  };
}