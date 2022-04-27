import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/error";
import { questionsReducer } from "./reducers/questions";
import { responsesReducer } from "./reducers/responses";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    responses: responsesReducer,
    connectionError: errorReducer
  }
})