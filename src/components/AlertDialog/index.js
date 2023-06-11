import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";

export default function AlertDialog({
  open,
  setOpen,
  maxWidth = "sm",
  title,
  message,
  anchorEl,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const mobile = useMediaQuery("(max-width:600px)");
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth={true}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          py: mobile ? 3 : 4,
          borderRadius: 4,
          position: "relative",
        },
      }}
      anchorEl={anchorEl}
      maxWidth={maxWidth}
    >
      {mobile && (
        <IconButton
          className="dialog-close-button dialog-close-button-mobile"
          onClick={handleClose}
        >
          <CloseIcon className="cancel-mobile-icon" />
        </IconButton>
      )}
      <DialogTitle
        className={mobile ? "dialog-title dialog-title-mobile" : "dialog-title"}
      >
        {title}{" "}
        {!mobile && (
          <IconButton className="dialog-close-button" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent sx={{ pt: "8px !important", px: mobile ? 3 : 7 }}>
        {" "}
        {message}
      </DialogContent>
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
