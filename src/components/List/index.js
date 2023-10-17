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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
//imports
import './list.scss'
import icons from '../../assets/index'
import { firestore } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'

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
  isDragDisabled,
}) {
  const removeOnClick = (event) => {
    event.stopPropagation()
  }
  let dragDisabled = isDragDisabled === undefined ? true : false

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return
    }
    const updatedItems = reorder(
      list,
      result.source.index,
      result.destination.index
    )
    list = updatedItems
    const droppable = list.filter(
      (item, index) => index === result.source.index
    )

    await updateDoc(
      doc(
        firestore,
        'Assessments',
        list[0].docId,
        'questions',
        result.draggableId
      ),
      {
        index: result.destination.index,
        updatedAt: new Date(),
      }
    )
    await updateDoc(
      doc(
        firestore,
        'Assessments',
        list[0].docId,
        'questions',
        droppable[0].id
      ),
      {
        index: result.source.index,
        updatedAt: new Date(),
      }
    )
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {list.map((item, index) => (
                        <Draggable
                          key={item.id}
                          index={index}
                          draggableId={item.id}
                          isDragDisabled={dragDisabled}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <List dense={false} className="listing">
                                <ListItem
                                  className="listing-item"
                                  secondaryAction={
                                    !!Actions ? (
                                      <Grid onClick={removeOnClick}>
                                        <Actions
                                          data={item}
                                          list={list}
                                          cat={cat}
                                        />
                                      </Grid>
                                    ) : (
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                      >
                                        <img
                                          src={icons.editIcon}
                                          alt="edit-icon"
                                        />
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
                                        <Typography className="text">
                                          {item.text}
                                        </Typography>
                                      </Grid>
                                    ) : (
                                      <Avatar
                                        className={
                                          listing === 'events'
                                            ? 'image-avatar avatar'
                                            : 'avatar'
                                        }
                                      >
                                        <img
                                          src={icon ?? item.icon}
                                          alt="edit-icon"
                                        />
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
                              </List>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
