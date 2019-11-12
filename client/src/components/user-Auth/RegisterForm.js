import React from "react";
import axios from "../../config/axios";

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios.post("/users/register", formData).then(users => {
      this.props.history.push("/users/login");
    });

    console.log(formData);
  };

  render() {
    console.log("form render");
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
          />
          <br />
          <label htmlFor="email">email</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
          />
          <br />
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
          />
          <br />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
export default RegistrationForm;
