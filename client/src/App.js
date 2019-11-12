import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CategoryList from "./components/categories/List";

import RegistrationForm from "./components/user-Auth/RegisterForm";
import LoginForm from "./components/user-Auth/LoginForm";

import NotesShow from "./components/notes/Show"
import NotesList from "./components/notes/List";
import NotesNew from "./components/notes/New";

import NotesEdit from "./components/notes/Edit";

import { connect } from "react-redux"
import Logout from "./components/user-Auth/Logout";

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <h2 className="navbar-brand mb-0 h1">Notes App</h2>

            <ul className="navbar-nav">
              {/* conditional rendering */}
              {Object.keys(props.user).length === 0 ? ( //not logged in
                <div>
                  <li className="nav-item">
                    <a className="nav-link" href="/users/register">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/users/login">
                      Login
                    </a>
                  </li>
                </div>
              ) : (
                  <div>
                    <li className="nav-item">
                      <a className="nav-link" href="/users/logout">
                        Logout
                    </a>
                    </li>

                    <li className="nav-item ">
                      <a className="nav-link" href="/categories">
                        Categories
                    </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/notes">
                        Notes
                    </a>
                    </li>

                  </div>
                )}
            </ul>
          </div>
        </nav>
        <Switch>
          <Route
            path="/users/register"
            component={RegistrationForm}
            exact={true}
          />

          <Route path="/users/login" component={LoginForm} exact={true} />
          <Route path="/users/logout" component={Logout} exact={true} />

          <Route path="/notes" component={NotesList} exact={true} />
          <Route path="/notes/new" component={NotesNew} exact={true} />
          <Route path="/notes/:id" component={NotesShow} exact={true} />
          <Route path="/notes/edit/:id" component={NotesEdit} eaxct={true} />

          <Route path="/categories" component={CategoryList} exact={true} />
        </Switch>


        {/* <Route path="/notes" component={EditNotes} /> */}
      </div>
    </BrowserRouter>
  );
}
const mapStateToProp = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProp)(App);
