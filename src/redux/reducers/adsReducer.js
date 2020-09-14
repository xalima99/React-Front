import * as types from "../actions/types";
const initialState = {
  announces: [],
  single: [],
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ADS:
      return {
        ...state,
        announces: [...action.payload],
      };
      break;
    case types.CREATE_AD:
      return {
        ...state,
        announces: [...state.announces, action.payload],
      };
    case types.FETCH_AD:
      return {
        ...state,
        single: [action.payload],
      };
    case types.CLEAR_SINGLE:
      return {
        ...state,
        single: [],
      };
    case types.DELETE_AD:
      return {
        ...state,
        announces: state.announces.filter((ad) => {
          return ad._id !== action.payload;
        }),
      };
    case types.EDIT_AD:
      return {
        ...state,
        announces: state.announces.map((ad) => {
          return ad._id === action.payload._id
            ? Object.assign({}, ad, {
                title: action.payload.title,
                description: action.payload.description,
                prix: action.payload.prix
              })
            : ad;
        }),
      };
    default:
      return state;
      break;
  }
};

export default adsReducer;
