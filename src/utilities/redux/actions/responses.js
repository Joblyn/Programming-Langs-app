import * as ActionTypes from "../../../constants/actionTypes";

export const updateResponses = (payload) => {
  return {
    type: ActionTypes.UPDATE_RESPONSES,
    payload
  }
}