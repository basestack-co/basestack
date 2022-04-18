import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";

export const baseUrl = `http://localhost:3000/api/v1`;

export const prepareHeaders = (headers: Headers) => {
  // const state = getState() as RootState;
  return headers;
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const {
        payload: { status },
      } = action;
      // Access forbidden
      if (status === 403) {
        console.log("rtkQueryErrorLogger Access forbidden");
      }
    }
    return next(action);
  };
