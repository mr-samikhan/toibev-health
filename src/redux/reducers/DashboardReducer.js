import produce from 'immer'

const initialstate = {
  startDate: null,
  endDate: null,
}

const DashboardReducer = produce((state = initialstate, action) => {
  switch (action.type) {
    case 'SET_START_DATE': {
      state.startDate = action.payload
      return state
    }
    case 'SET_END_DATE': {
      state.endDate = action.payload
      return state
    }

    case 'RESET_DASHBOARD_VALUES': {
      state = initialstate
      return state
    }

    default:
      return state
  }
})

export default DashboardReducer
