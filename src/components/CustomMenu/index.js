import React from "react";
import { Menu, Grid, Typography } from "@mui/material";

export default function CustomMenu({
  children,
  open,
  handleClose,
  anchorEl,
  title,
  sx,
}) {
  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ ...sx }}
      PaperProps={{
        sx: {
          background: "#FFFFFF",
          border: "1px solid #3B7D7D",
          boxShadow: "0px 6px 20px rgba(36, 41, 41, 0.1)",
          borderRadius: "24px",
          padding: 5,
        },
      }}
    >
      <Grid container flexDirection="column">
        <Grid item mb={6}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "31px",
              textAlign: "center",
              color: "#000000",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item> {children}</Grid>
      </Grid>
    </Menu>
  );
}
