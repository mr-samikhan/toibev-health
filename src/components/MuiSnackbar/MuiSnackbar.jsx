import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const MuiSnackbar = (props) => {
  // const { open, message, isError } = props || {}

  const { alert } = useSelector((state) => state.CommonReducer)
  const { isOpen, message, type } = alert

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch({
      type: 'HIDE_ALERT',
      payload: {
        type: '',
        message: '',
        isOpen: false,
      },
    })
  }

  let severity = type === 'error' ? 'error' : 'success'

  return (
    <Snackbar
      open={Boolean(isOpen)}
      onClose={handleClose}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        variant="filled"
        severity={severity}
        onClose={handleClose}
        sx={{ width: '100%', mt: '10%', mr: '5%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MuiSnackbar
