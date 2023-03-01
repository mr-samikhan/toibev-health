export const setAuthValues = (data) => (dispatch) => {
  dispatch({ type: "LOGIN_PAGE_ATTEMPT_SUCCESS", payload: data });
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
