import React from 'react'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import {
  Avatar,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
//icons
import { ReactComponent as Logo } from '../../assets/icons/header-logo.svg'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as DownArrow } from '../../assets/icons/downarrow.svg'
import { ReactComponent as HamburgerIcon } from '../../assets/icons/hamburger.svg'
//imports
import './header.scss'
import '../Sidebar/sidebar.scss'
import CustomMenu from '../CustomMenu'
import { useHeader } from './useHeader'
import CustomButton from '../CustomButton'
import { DatePicker } from '../DatePicker'
import { ReactComponent as NotificationBadge } from '../../assets/icons/notificationbadge.svg'

export const Header = ({ childData, handleDrawerToggle }) => {
  const {
    open,
    title,
    AppBar,
    matches,
    tabMode,
    dispatch,
    anchorEl,
    handleClose,
    hanldeLogout,
    handleOpenMenu,
  } = useHeader()

  const { user } = useSelector((state) => state?.Auth) ?? {}

  return (
    <>
      {open && (
        <CustomMenu
          title="Logout"
          handleClose={handleClose}
          open={open}
          anchorEl={anchorEl}
          sx={{ mt: 2 }}
        >
          <CustomButton
            variant="contained"
            fullWidth
            sx={{ width: '250px' }}
            onClick={hanldeLogout}
          >
            Logout
          </CustomButton>
        </CustomMenu>
      )}
      <Box className="header">
        <AppBar
          position="fixed"
          className="app-bar"
          sx={{
            background: matches ? '#fff' : '#468D8D',
          }}
          elevation={0}
        >
          <Toolbar
            className="toolbar"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {!matches ? (
              <Grid container flexDirection="column">
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Grid item ml={-1}>
                    <IconButton
                      onClick={() => dispatch({ type: 'TOGGLESIDEBAR' })}
                    >
                      <HamburgerIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Logo />
                  </Grid>
                  <Grid item>
                    <Avatar />
                  </Grid>
                </Grid>
                <Grid item mb={3}>
                  <TextField
                    fullWidth
                    className="search-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />{' '}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item mb={1}>
                  <Typography className="header-title">{title}</Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  flexWrap={'nowrap'}
                  alignItems="center"
                  spacing={1}
                >
                  {tabMode && (
                    <Grid item>
                      <IconButton
                        onClick={() => dispatch({ type: 'TOGGLESIDEBAR' })}
                      >
                        <HamburgerIcon
                          style={{
                            filter: 'brightness(0.3)',
                          }}
                        />
                      </IconButton>
                    </Grid>
                  )}
                  <Grid
                    item
                    container
                    justifyContent={'space-between'}
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography className="title">{title}</Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center">
                        {!tabMode && (
                          <Grid item>
                            <DatePicker />
                          </Grid>
                        )}
                        <Grid item sx={{ margin: '0px 24px 0px 32px' }}>
                          <IconButton>
                            <NotificationBadge />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Avatar />
                        </Grid>
                        <Grid item>
                          <Typography className="username">
                            {user?.username}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={handleOpenMenu}>
                            <DownArrow />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
