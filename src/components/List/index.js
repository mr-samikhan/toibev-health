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
  isNoicon,
  selectedRows,
  cat,
  icon,
  noData,
  Actions,
  listing,
  indexed,
  list = [],
  onRowClick,
  isDragDisabled,
  updateEventDoc,
}) {
  const removeOnClick = (event) => {
    event.stopPropagation()
  }

  let dragDisabled = isDragDisabled === undefined ? true : false

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    result.forEach((item, index) => {
      item.index = index
    })
    return result
  }

  const getItemStyle = (isDraggable, draggableStyle) => ({
    border: 'none',
    userSelect: 'none',
    borderRadius: '16px',
    padding: isDraggable ? '10px' : null,
    background: isDraggable ? 'lightgreen' : '',
    ...draggableStyle,
  })

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
    updatedItems.map(
      async (item, index) =>
        await updateDoc(
          doc(firestore, 'Assessments', list[0].docId, 'questions', item.id),
          {
            index: index,
            updatedAt: new Date(),
          }
        )
    )
  }

  const onSelectStyle = (item) => {
    return selectedRows?.filter((el) => el.id === item.id).length > 0
      ? { background: 'rgba(59, 125, 125, 0.30)' }
      : {}
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
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <List dense={false} className="listing">
                                <ListItem
                                  className="listing-item"
                                  // style={onSelectStyle(item)}
                                  style={onSelectStyle(item)}
                                  secondaryAction={
                                    !!Actions ? (
                                      <Grid onClick={removeOnClick}>
                                        <Actions
                                          data={item}
                                          list={list}
                                          cat={cat}
                                          updateEventDoc={updateEventDoc}
                                        />
                                      </Grid>
                                    ) : (
                                      isNoicon && (
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
                                          src={
                                            icon
                                              ? item.icon || icon
                                              : item?.cover_img || item?.image
                                          }
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
