import { createAction } from "@reduxjs/toolkit";
import * as ActionTypes from "../../../constants/actionTypes";

export const getError = (error) => {
  let getErrorAction = createAction(ActionTypes.GET_ERROR);
  let payload = error
    ? error
    : "Error connecting. Please check internet connection and try again.";

  return getErrorAction(payload);
};
