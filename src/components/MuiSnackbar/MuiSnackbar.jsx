import React from 'react'
import { Alert, Snackbar } from '@mui/material'

const MuiSnackbar = (props) => {
  const { open, setOpen, message, isError } = props || {}

  const handleClose = () => setOpen(false)

  let severity = isError ? 'error' : 'success'

  return (
    <Snackbar
      open={Boolean(open)}
      onClose={handleClose}
      autoHideDuration={3000}
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
