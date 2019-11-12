import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store/configureStore";
import axios from "./config/axios";
import { setUser } from "./actions/user";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

//initial store value // called frst tym
// console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState()); //
});

//handle page reloads
if (localStorage.getItem("authToken")) {
  //localstorage.getItem of name returns Null // only if string then do axios
  axios
    .get("/users/account", {
      headers: {
        "x-auth": localStorage.getItem("authToken")
      }
    })
    .then(response => {
      const user = response.data;
      store.dispatch(setUser(user)); //call synchronous set users
    });
}

const ele = ( // main component - provider // provider takes props
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(ele, document.getElementById("root"));
