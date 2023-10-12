export const setAuthValues = (data) => (dispatch) => {
  dispatch({ type: 'LOGIN_PAGE_ATTEMPT_SUCCESS', payload: data })
}

export const resetAuthValues = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' })
}

export const setAlertValues = (data) => (dispatch) => {
  dispatch({
    type: data.type === 'success' ? 'SHOW_ALERT' : 'HIDE_ALERT',
    payload: { ...data },
  })
}
