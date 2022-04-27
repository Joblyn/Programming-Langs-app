import * as ActionTypes from "../../../constants/actionTypes";

export const getError = (payload) => {
  return {
    type: ActionTypes.GET_ERROR,
    payload: payload
      ? payload
      : "Error connecting. Please check internet connection and try again.",
  };
};
