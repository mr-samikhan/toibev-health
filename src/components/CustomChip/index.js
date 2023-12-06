import React from 'react'
import { Chip } from '@mui/material'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-circle.svg'
import './style.scss'

export const CustomChip = ({ index, title, handleDelete }) => {
  return (
    <Chip
      label={title}
      className="chip"
      deleteIcon={<CloseIcon />}
      onDelete={() => handleDelete(index)}
    />
  )
}
