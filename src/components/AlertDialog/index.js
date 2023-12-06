import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { IconButton, useMediaQuery } from '@mui/material'

import './style.scss'

export default function AlertDialog({
  open,
  title,
  setOpen,
  onClose,
  message,
  anchorEl,
  maxWidth = 'sm',
}) {
  const handleClickOpen = () => {
    setOpen(true)
  }

  const mobile = useMediaQuery('(max-width:600px)')

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      fullWidth={true}
      onClose={onClose || handleClose}
      sx={{
        '& .MuiPaper-root': {
          py: mobile ? 3 : 4,
          borderRadius: 4,
          position: 'relative',
        },
      }}
      anchorEl={anchorEl}
      maxWidth={maxWidth}
    >
      {mobile && (
        <IconButton
          className="dialog-close-button dialog-close-button-mobile"
          onClick={handleClose}
        >
          <CloseIcon className="cancel-mobile-icon" />
        </IconButton>
      )}
      <DialogTitle
        className={mobile ? 'dialog-title dialog-title-mobile' : 'dialog-title'}
      >
        {title}
        {!mobile && (
          <IconButton
            className="dialog-close-button"
            onClick={onClose || handleClose}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent sx={{ pt: '8px !important', px: mobile ? 3 : 7 }}>
        {message}
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  )
}
