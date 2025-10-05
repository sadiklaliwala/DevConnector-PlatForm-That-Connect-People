import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};

export default errorReducer;
