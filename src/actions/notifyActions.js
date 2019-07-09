import {NOTIFY_USER} from "./types";

export const notifyUser = (message, messageType) => (dispatch) => {
  dispatch({
    type: NOTIFY_USER,
    message,
    messageType,
  });
};