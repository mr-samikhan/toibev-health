import { Router } from './Router/router'
import { QueryClientProvider, QueryClient } from 'react-query'
import MuiSnackbar from './components/MuiSnackbar/MuiSnackbar'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MuiSnackbar />
      <Router />
    </QueryClientProvider>
  )
}

export default App
