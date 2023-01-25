import { Archive, Favorite, RestoreOutlined } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import React from 'react'

const BottomNav = () => {
  return (
    <Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label='Dashboard' icon={<Archive />} />
          <BottomNavigationAction label='Learn' icon={<RestoreOutlined />} />
          <BottomNavigationAction label='Health' icon={<Favorite />} />
          <BottomNavigationAction label='Event' icon={<RestoreOutlined />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav
