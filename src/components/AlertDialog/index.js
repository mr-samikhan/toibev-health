import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";

export default function AlertDialog({
  open,
  setOpen,
  maxWidth = "sm",
  title,
  message,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth={true}
      onClose={handleClose}
      sx={{ "& .MuiPaper-root": { py: 4, px: 4, borderRadius: 4 } }}
      maxWidth={maxWidth}
    >
      <DialogTitle className="dialog-title">
        {title}{" "}
        {/* <IconButton className="close-button">
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent> {message}</DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
