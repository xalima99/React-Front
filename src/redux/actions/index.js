import axios from "axios";
import * as types from "./types";
import history from "../../history/history";

export const fetchAds = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/announces");

    dispatch({ type: types.FETCH_ADS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.FETCH_ADS_ERROR });
  }
};

export const fetchAd = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/announces/${id}`);

    dispatch({ type: types.FETCH_AD, payload: res.data });
  } catch (error) {
    console.log(error)
    dispatch({ type: types.FETCH_AD_ERROR });
    history.push("/");
  }
};

export const editAd = (id, body) => async (dispatch) => {
  try {
    const header = {
      headers: {
        "content-type": "application/json",
      },
    };

    const res = await axios.put(`/api/announces/${id}`, body, header);

    dispatch({ type: types.EDIT_AD, payload: res.data });
    history.push("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.EDIT_AD_ERROR });
    history.push(`/ads/edit/${id}`);
  }
};

export const createAd = (ad) => async (dispatch, getState) => {
  try {
    const {Userid, Username} = getState().auth;
    const res = await axios.post("/api/announces", {...ad, Userid, Username});

    dispatch({ type: types.CREATE_AD, payload: res.data });
    history.push("/");
  } catch (error) {
    console.log(console.log(error))
    dispatch({ type: types.CREATE_AD_ERROR });
    history.push("/visit/ads/new");
  }
};

export const deleteAd = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/announces/${id}`);

    dispatch({ type: types.DELETE_AD });
    history.push("/");
  } catch (error) {
    dispatch({ type: types.DELETE_AD_ERROR, payload: id });
    history.push("/");
  }
};

export const clear = () => {
  return {
    type: types.CLEAR_SINGLE,
  };
};

export const modalShow = () => {
  return {
    type: types.SHOW,
  };
};

export const modalHide = () => {
  return {
    type: types.HIDE,
  };
};

export const signIn = (id, name) => {
  return {
    type: types.LOGIN,
    payload: {id, name},
  };
};

export const signOut = () => {
  return {
    type: types.LOGOUT,
  };
};
