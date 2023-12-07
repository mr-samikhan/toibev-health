import React from 'react'
import './listItem.scss'
import { Grid, Avatar, Typography, IconButton } from '@mui/material'

export function ListItem({ startIcon, title, endIcon, onOpenMainModal }) {
  return (
    <Grid container className="list-item">
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className="wrapper"
        flexWrap={'nowrap'}
      >
        <Grid item xs={10}>
          <Grid container spacing={2} alignItems="center" flexWrap={'nowrap'}>
            <Grid item>
              <Avatar className="avatar">
                <img src={startIcon} />
              </Avatar>
            </Grid>
            <Grid item flexGrow={1} sx={{ overflow: 'hidden' }}>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => onOpenMainModal(title)}>
            <img src={endIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
