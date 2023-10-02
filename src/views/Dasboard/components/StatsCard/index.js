import React from 'react'
import '../../style.scss'
import { Avatar, Grid, Typography } from '@mui/material'

export default function StatsCard({ title = 'ABC', count = '10', icon = '' }) {
  return (
    <Grid container flexWrap={'nowrap'} className="stats-card">
      <Grid item>
        <Grid container className="icon-container">
          <Avatar variant="square" className="icon" src={icon} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography className="title">{title}</Typography>
        <Typography className="count">{count}</Typography>
      </Grid>
    </Grid>
  )
}
