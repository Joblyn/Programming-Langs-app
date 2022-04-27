import { client } from "./axios";
import { getError } from "./redux/actions/getError";

export const getData = (endpoint, callback) => {
  return (dispatch) => {
    client()
      .then((data) => {
        dispatch(callback(data));
      })
      .catch((error) => {
        dispatch(getError(error));
        throw error;
      });
  };
};
