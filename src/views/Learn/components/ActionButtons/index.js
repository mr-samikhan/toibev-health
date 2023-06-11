import { Grid, IconButton, Menu } from "@mui/material";
import icons from "../../../../assets";
import React, { useState } from "react";
import AlertDialog from "../../../../components/AlertDialog";
import TribeForm from "../TribeForm";
import CustomMenu from "../../../../components/CustomMenu";

export function CultureActions({ data }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* {open && (
        <AlertDialog
          title="Edit Tribe"
          open={open}
          setOpen={setOpen}
          message={<TribeForm isEdit data={data} />}
        />
      )} */}
      {open && (
        <CustomMenu
          title="Edit Tribe"
          handleClose={handleClose}
          open={open}
          anchorEl={anchorEl}
        >
          <TribeForm />
        </CustomMenu>
      )}
      <Grid container>
        <Grid item>
          {" "}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(event) => {
              setOpen(true);
              setAnchorEl(event.currentTarget);
            }}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
