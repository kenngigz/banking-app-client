import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Form, Button } from "react-bootstrap";
import { initiateLogin } from "../actions/auth";
import { resetErrors } from "../actions/errors";
import { validateFields } from "../utils/common";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    customer_ID: "",
    pin: "",
    errorMsg: "",
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { customer_ID, pin } = this.state;
    const fieldsToValidate = [{ customer_ID }, { pin }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: "Please enter all the fields.",
        },
      });
    } else {
      this.setState({
        errorMsg: {
          signin_error: "",
        },
      });
      // login successful
      this.props.dispatch(initiateLogin(customer_ID, pin));
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="login-page">
        <h1>Banking Application</h1>
        <div className="login-form">
          <Form onSubmit={this.handleLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="customer_ID">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                type="customer_ID"
                name="customer_ID"
                placeholder="Enter your ID"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="pin">
              <Form.Label>Pin</Form.Label>
              <Form.Control
                type="text"
                name="pin"
                placeholder="Enter pin"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button
                variant="primary"
                type="submit"
              >
                Login
              </Button>
              <Link
                to="/register"
                className="btn btn-secondary"
              >
                Create account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(Login);
