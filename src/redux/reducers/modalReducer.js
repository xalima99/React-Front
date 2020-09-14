import * as types from "../actions/types";

const initialState = {
  show: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW:
      return {
        show: true,
      };
      break;
    case types.HIDE:
      return {
        show: false,
      };
    default:
        return state
      break;
  }
};
