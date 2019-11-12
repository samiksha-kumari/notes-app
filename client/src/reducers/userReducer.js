const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...action.payload }; //when go set state it dispatch to react
    }
    case "RESET_USER": {
      return {};
    }
    default: {
      return { ...state }; //Object.assign({}, state)  , alternative //equivalent of spread opeartor.
    }
  }
};

export default userReducer;
