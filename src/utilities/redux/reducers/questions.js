import { questions } from "../initialState";
import * as ActionTypes from "../../../constants/actionTypes";

export const questionsReducer = (state = questions, action) => {
  switch (action.type) {
    case ActionTypes.GET_QUESTIONS:
      return {
        isSuccessful: true,
        isError: false,
        data: action.payload.data,
        error: null,
      };
    case ActionTypes.GET_QUESTIONS_ERROR:
      return {
        isSuccessful: false,
        isError: true,
        data: [],
        error: action.payload.error,
      };
    default:
      return state;
  }
};
