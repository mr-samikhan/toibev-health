import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { Alert } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
//imports
import './list.scss'
import icons from '../../assets/index'

const Paper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export function CustomList({
  cat,
  icon,
  noData,
  Actions,
  listing,
  indexed,
  list = [],
  onRowClick,
}) {
  const removeOnClick = (event) => {
    event.stopPropagation()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            {list?.length === 0 ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {noData ?? 'No data found!'}
              </Alert>
            ) : (
              <List dense={false} className="listing">
                {list?.map((item, index) => (
                  <ListItem
                    className="listing-item"
                    secondaryAction={
                      !!Actions ? (
                        <Grid onClick={removeOnClick}>
                          <Actions data={item} list={list} cat={cat} />
                        </Grid>
                      ) : (
                        <IconButton edge="end" aria-label="delete">
                          <img src={icons.editIcon} alt="edit-icon" />
                        </IconButton>
                      )
                    }
                    sx={{ cursor: onRowClick && 'pointer' }}
                    onClick={() => onRowClick(item)}
                  >
                    <ListItemAvatar sx={{ mr: 2 }}>
                      {indexed ? (
                        <Grid
                          container
                          px={3}
                          py={2}
                          alignItems={'center'}
                          className="text-avatar"
                          justifyContent={'center'}
                        >
                          <Typography className="text">{item.text}</Typography>
                        </Grid>
                      ) : (
                        <Avatar
                          className={
                            listing === 'events'
                              ? 'image-avatar avatar'
                              : 'avatar'
                          }
                        >
                          <img src={icon ?? item.icon} alt="edit-icon" />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="primary-text">
                          {item?.title}
                        </Typography>
                      }
                      secondary={
                        <Typography className="secondary-text">
                          {item?.subtitle ?? ''}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
