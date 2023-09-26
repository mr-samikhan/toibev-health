import React from 'react'
import { Menu, Grid, Typography } from '@mui/material'

export default function CustomMenu({
  open,
  sx,
  title,
  isDate,
  width,
  children,
  anchorEl,
  isCenter,
  handleClose,
}) {
  const CENTER = isCenter && 'center'
  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: CENTER || 'bottom',
        horizontal: CENTER || 'right',
      }}
      transformOrigin={{
        vertical: CENTER || 'top',
        horizontal: CENTER || 'right',
      }}
      sx={{ ...sx }}
      PaperProps={{
        sx: {
          padding: 5,
          borderRadius: '24px',
          width: width || 'auto',
          background: '#FFFFFF',
          border: '1px solid #3B7D7D',
          boxShadow: '0px 6px 20px rgba(36, 41, 41, 0.1)',
        },
      }}
    >
      {isDate ? (
        <Grid container>
          <Grid item mb={6} md={12}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '31px',
                textAlign: 'center',
                color: '#000000',
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12} display="flex" justifyContent="center">
            {children}
          </Grid>
        </Grid>
      ) : (
        <Grid container flexDirection="column">
          <Grid item mb={6}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '31px',
                textAlign: 'center',
                color: '#000000',
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      )}
    </Menu>
  )
}
