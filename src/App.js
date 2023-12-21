import { auth } from './firebase'
import { Router } from './Router/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onIdTokenChanged, signOut } from 'firebase/auth'
import MuiSnackbar from './components/MuiSnackbar/MuiSnackbar'
import { QueryClientProvider, QueryClient } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          const expirationTime = idTokenResult.claims.exp
          const currentTime = new Date().getTime()

          if (expirationTime > currentTime) {
            signOut(auth).then(() => {
              dispatch({ type: 'LOGOUT' })
            })
          }
        })
      } else {
        console.log('Your token has been expired!')
        // alert('Your token has been expired!')
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <MuiSnackbar />
      <Router />
    </QueryClientProvider>
  )
}

export default App
