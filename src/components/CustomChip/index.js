import React from "react";
import { Chip } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-circle.svg";
import "./style.scss";

export const CustomChip = ({ index, title, handleDelete }) => {
  return (
    <Chip
      className="chip"
      label={title}
      onDelete={() => handleDelete(index)}
      deleteIcon={<CloseIcon />}
    />
  );
};
