import AuthReducer from './AuthReducer'
import CommonReducer from './CommonReducer'
import SidebarReducer from './SidebarReducer'
import DashboardReducer from './DashboardReducer'

export const rootReducer = {
  Auth: AuthReducer,
  Sidebar: SidebarReducer,
  Dashboard: DashboardReducer,
  CommonReducer: CommonReducer,
}
