import { responses } from "../initialState";
import * as ActionTypes from "../../../constants/actionTypes";

export const responsesReducer = (state = responses, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_RESPONSES:
      return Object.assign({...state}, action.payload);
    default:
      return state;
  }
};
