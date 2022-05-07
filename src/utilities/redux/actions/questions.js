import { createAction } from "@reduxjs/toolkit";
import * as ActionTypes from "../../../constants/actionTypes";
import { getData } from "../../services";

const onGetQuestions = (payload) => {
  let getQuestionsAction =
    payload.status === 200
      ? createAction(ActionTypes.GET_QUESTIONS)
      : createAction(ActionTypes.GET_QUESTIONS_ERROR);

  return getQuestionsAction(payload);
};

export const getQuestions = (endpoint) => {
  return getData(endpoint, onGetQuestions);
};
