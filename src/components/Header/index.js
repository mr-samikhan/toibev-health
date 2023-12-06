import React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import {
  Grid,
  Avatar,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'

//icons
import { ReactComponent as Logo } from '../../assets/icons/header-logo.svg'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as DownArrow } from '../../assets/icons/downarrow.svg'
import { ReactComponent as HamburgerIcon } from '../../assets/icons/hamburger.svg'
import { ReactComponent as NotificationBadge } from '../../assets/icons/notificationbadge.svg'

//imports
import './header.scss'
import '../Sidebar/sidebar.scss'
import CustomMenu from '../CustomMenu'
import { useHeader } from './useHeader'
import CustomButton from '../CustomButton'
import { DatePicker } from '../DatePicker'
import { CustomDateRangePicker } from '../CustomDateRangePicker/CustomDateRangePicker'

export const Header = ({ childData, handleDrawerToggle }) => {
  const {
    user,
    open,
    title,
    AppBar,
    matches,
    tabMode,
    dispatch,
    anchorEl,
    dateRange,
    handleClose,
    setDateRange,
    hanldeLogout,
    showDateModal,
    handleOpenMenu,
    setShowDateModal,
    onGotoSettingPage,
  } = useHeader()

  const onToggle = () => setShowDateModal((prev) => !prev)
  const { pathname } = useLocation()

  let isDashboard = pathname === '/dashboard'
  return (
    <>
      {open && (
        <CustomMenu
          open={open}
          title="Logout"
          sx={{ mt: 2 }}
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <CustomButton
            fullWidth
            variant="contained"
            sx={{ width: '250px' }}
            onClick={hanldeLogout}
          >
            Logout
          </CustomButton>
        </CustomMenu>
      )}

      {showDateModal && (
        <CustomMenu
          isDate
          isCenter
          sx={{ mt: 2 }}
          handleClose={onToggle}
          open={showDateModal}
          anchorEl={anchorEl}
          title="Select Date Range"
          width={{ xs: 'auto', md: '50%', sm: '50%' }}
        >
          <CustomDateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
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
                  <Grid item onClick={onGotoSettingPage}>
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
                          <SearchIcon />
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
                      <Typography className="title">
                        {pathname === '/home' ? 'Home Page' : title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center">
                        {isDashboard && !tabMode && (
                          <Grid item>
                            <DatePicker
                              setOpen={onToggle}
                              dateRange={dateRange}
                            />
                          </Grid>
                        )}
                        <Grid item sx={{ margin: '0px 24px 0px 32px' }}>
                          {/* <IconButton>
                            <NotificationBadge />
                          </IconButton> */}
                        </Grid>
                        <Grid item>
                          <Avatar onClick={onGotoSettingPage} />
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
