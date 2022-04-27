import * as ActionTypes from "../../../constants/actionTypes";
import { getData } from "../../services";

const onGetQuestions = (payload) => {
  if (payload.status === 200) {
    return {
      type: ActionTypes.GET_QUESTIONS,
      payload,
    };
  } else {
    return {
      type: ActionTypes.GET_QUESTIONS_ERROR,
      payload,
    };
  }
};

export const getQuestions = (endpoint) => {
  return getData(endpoint, onGetQuestions);
};
