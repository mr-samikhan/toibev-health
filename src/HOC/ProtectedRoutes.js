import React, { useEffect, useLayoutEffect } from 'react'

import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
  const { search } = useLocation()

  const { userToken, isAuthenticated, isLoading } =
    useSelector((state) => state?.Auth) ?? {}

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (userToken && isAuthenticated) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`
    } else {
      delete axios.defaults.headers.common['Authorization']
      search.includes('mode=resetPassword')
        ? navigate(`/reset-password${search}`)
        : navigate('/login')
    }
    // eslint-disable-next-line
  }, [location, isAuthenticated, userToken])

  // console.log(userToken, isAuthenticated, isLoading, '>>>>>>>>>test')

  useEffect(() => {
    if (!userToken || !isAuthenticated) {
      search.includes('mode=resetPassword')
        ? navigate(`/reset-password${search}`)
        : navigate('/login')
    }
  }, [])

  return isLoading ? (
    'LOADING...'
  ) : userToken && isAuthenticated ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <></>
  )
}

export default ProtectedRoutes
