import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Field, reduxForm } from "redux-form";
import { Container, Row, Col } from "react-grid-system";
import { signUp } from "../../actions/authActions";
import { passwordField, emailField, textField } from "../formComponents";

const validate = (values) => {
  const errors = { user: {} };
  let { user = {} } = values;
  if (user && !user.email) {
    errors.user.email = "Email is required";
  } else if (user && !user.password) {
    errors.user.password = "Password is required";
  } else if (user && !user.full_name) {
    errors.user.password = "Full Name is required";
  }
  return errors;
};

class SignUp extends Component {
  submit = (values) => {
    this.props.signUp(values);
  };
  componentWillMount() {
    if (this.props.auth && this.props.auth.currentUser)
      window.location.href = "/";
  }
  UNSAFE_componentWillReceiveProps(np) {
    if (np && np.loggedIn) window.location.href = "/";
  }
  render() {
    const { handleSubmit } = this.props;
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
              Sign Up
            </h1>
          </Col>
          <Col xs={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Col xs={12}>
                <Field name="user.full_name" component={textField} label="Full Name" />
                <Field name="user.email" component={emailField} label="Email" />
                <Field
                  name="user.password"
                  component={passwordField}
                  label="Password"
                />
                <button className="search-button" type="submit">
                  Sign Up
                </button>
              </Col>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const structuredSelector = createStructuredSelector({
  message: (state) => state.authReducer.message,
  loggedIn: (state) => state.authReducer.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    signUp: (params) => dispatch(signUp(params)),
    // searchCIN: (params) => dispatch(searchCIN(params)),
  };
};

const SignUpForm = reduxForm({
  // a unique name for the form
  form: "login",
  validate,
})(SignUp);

export default connect(structuredSelector, mapDispatchToProps)(SignUpForm);
