import React from "react";
import { startSetUser } from "../../actions/user";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.dispatch(startSetUser(formData)); //we have to dispatch.    redux make request to the backend
  };

  render() {
    console.log("form render");
    if (this.props.user._id) {
      return <div> {this.props.history.push("/notes")}</div>;
    } else {
      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email"></label>
            <input
              type="text"
              placeholder="email"
              value={this.state.name}
              onChange={this.handleChange}
              name="email"
            />
            <br />
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            <br />

            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(LoginForm);
