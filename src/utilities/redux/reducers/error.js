import * as ActionTypes from "../../../constants/actionTypes";
import { error } from "../initialState";

export default function errorReducer(state = error, action) {
  switch (action.type) {
    case ActionTypes.GET_ERROR:
      // internet error
      return {
        isError: true,
        data: action.payload,
      };

    default:
      return state;
  }
}
