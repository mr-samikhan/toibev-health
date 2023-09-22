import produce from 'immer'

const initialstate = {
  isAuthenticated: false,
  user: null,
  userToken: null,
  isLoading: false,
}

const LoginReducer = produce((state = initialstate, action) => {
  switch (action.type) {
    case 'LOGIN_PAGE_ATTEMPT_SUCCESS': {
      state.isAuthenticated = true
      state.user = action.payload
      state.userToken = action.payload.accessToken
      return state
    }

    case 'LOGIN_PAGE_ATTEMPT_FAILED': {
      state.isAuthenticated = false
      state.user = null
      state.isLoading = false
      return state
    }

    case 'LOGOUT': {
      return { ...initialstate }
    }

    default:
      return state
  }
})

export default LoginReducer
