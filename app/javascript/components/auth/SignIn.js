import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Field, reduxForm } from "redux-form";
import { Container, Row, Col } from "react-grid-system";
import { signIn } from "../../actions/authActions";
import { passwordField, emailField } from "../formComponents";
import { Link } from "react-router-dom";

const validate = (values) => {
  const errors = { user: {} };
  let { user = {} } = values;
  if (user && !user.email) {
    errors.user.email = "Email is required";
  } else if (user && !user.password) {
    errors.user.password = "Password is required";
  }
  return errors;
};

class SignIn extends Component {
    submit = (values) => {
        this.props.signIn(values)
    }
    componentWillMount(){
      if (this.props.auth && this.props.auth.currentUser)
        window.location.href = "/";
    }
    UNSAFE_componentWillReceiveProps(np){
      if (np && np.loggedIn) window.location.href = "/";
    }
    render() {
        const { handleSubmit } = this.props
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
                  Sign In
                </h1>
              </Col>
              <Col xs={12}>
                <form onSubmit={handleSubmit(this.submit)}>
                  <Col xs={9} style={{ marginLeft: "10%" }}>
                    <Field
                      name="user.email"
                      component={emailField}
                      label="Email"
                    />
                    <Field
                      name="user.password"
                      component={passwordField}
                      label="Password"
                    />
                    <button className="full-button" type="submit">
                      Log In
                    </button>
                  </Col>
                </form>
              </Col>
            </Row>
            <Row style={{ marginLeft: "10%", marginTop: "10px" }}>
              <Col xs={4}>
                <Link to="/sign_up" style={{ fontSize: "2vmax" }}>
                  New User?
                </Link>
              </Col>
              <Col xs={4}>
                <Link to="/" style={{ fontSize: "2vmax" }}>
                  Home
                </Link>
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
    signIn: (params) => dispatch(signIn(params)),
    // searchCIN: (params) => dispatch(searchCIN(params)),
  };
};

const SignInForm = reduxForm({
  // a unique name for the form
  form: "login",
  validate,
})(SignIn);

// export default SignInForm;
export default connect(structuredSelector, mapDispatchToProps)(SignInForm);