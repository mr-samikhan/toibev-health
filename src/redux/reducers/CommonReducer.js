import produce from 'immer'

const initialstate = {
  alert: {
    type: '',
    message: '',
    isOpen: false,
  },
}

const CommonReducer = produce((state = initialstate, action) => {
  switch (action.type) {
    case 'SHOW_ALERT': {
      state.alert = action.payload
      return state
    }
    case 'HIDE_ALERT': {
      state.alert = action.payload
      return state
    }

    default:
      return state
  }
})

export default CommonReducer
