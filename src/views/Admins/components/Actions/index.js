import { IconButton, Grid } from "@mui/material";
import React, { useState } from "react";
import icons from "../../../../assets";
import AlertDialog from "../../../../components/AlertDialog";
import ManageAdminForm from "../ManageAdminForm";

export function Actions({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Manage Admin"
          setOpen={setOpen}
          message={<ManageAdminForm data={data} />}
        />
      )}
      <Grid container justifyContent="flex-end">
        {" "}
        <Grid item sx={{ paddingTop: "0px" }}>
          <IconButton onClick={() => setOpen(true)}>
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
        <Grid item sx={{ paddingTop: "0px" }}>
          <IconButton>
            <img src={icons.deleteIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
