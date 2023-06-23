import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React, { useState } from "react";
import TribeForm from "../TribeForm";
import CustomMenu from "../../../../components/CustomMenu";
import LangugaeForm from "../Forms/LanguageForm";

export function CultureActions({ data }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <CustomMenu
          title="Edit Tribe"
          handleClose={handleClose}
          open={open}
          anchorEl={anchorEl}
        >
          <TribeForm initialState={data} isEdit setOpen={setOpen} />
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
export function LanguageActions({ data }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <CustomMenu
          title="Edit Language"
          handleClose={handleClose}
          open={open}
          anchorEl={anchorEl}
        >
          <LangugaeForm initialState={data} isEdit setOpen={setOpen} />
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
