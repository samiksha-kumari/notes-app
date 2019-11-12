import axios from "../config/axios";

export const setUser = user => {
  //whenever we get a user object from the server that user object send we will it to redux
  return {
    type: "SET_USER",
    payload: user ////synchronous - to set the user
  };
};

export const startSetUser = formData => {
  return dispatch => {
    axios.post("/users/login", formData).then(response => {
      // console.log(response.data.errors); //here we make API call
      if (response.data.hasOwnProperty("errors")) {
        alert(response.data.errors);
      } else {
        localStorage.setItem("authToken", response.data.token.token);
        console.log(response.data.token);
        dispatch(setUser(response.data.user));
        // dispatch(setUser({ id: 1, name: "ani" }));
      }
    });
  };
};

export const resetUser = () => {
  return {
    type: "RESET_USER"
  };
};
//async - to api calls
