import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React, { useState } from "react";
import AlertDialog from "../../../../components/AlertDialog";
import TribeForm from "../TribeForm";

export function CultureActions({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AlertDialog
          title="Edit Tribe"
          open={open}
          setOpen={setOpen}
          message={<TribeForm isEdit data={data} />}
        />
      )}
      <Grid container>
        <Grid item>
          {" "}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setOpen(true)}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
