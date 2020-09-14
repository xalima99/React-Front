import * as types from "../actions/types";

const initialState = {
  isSignedIn: false,
  Userid: null,
  Username: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        isSignedIn: true,
        Userid: action.payload.id,
        Username: action.payload.name
      };

    case types.LOGOUT:
      return {
          isSignedIn: false,
          Userid: null
      }
    default:
        return state
      break;
  }
};
