import { IconButton, Grid } from "@mui/material";
import React, { useState } from "react";
import icons from "../../../../assets";
import AlertDialog from "../../../../components/AlertDialog";
import DeleteAdminForm from "../Forms/DeleteAdminForm";
import AddAdminForm from "../Forms/AddAdminForm";

export function Actions({ data }) {
  const [open, setOpen] = useState(false);
  const [openDeleteAdminForm, setOpenDeleteAdminForm] = useState(false);

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Manage Admin"
          setOpen={setOpen}
          message={<AddAdminForm data={data} isEdit setOpen={setOpen} />}
        />
      )}
      {openDeleteAdminForm && (
        <AlertDialog
          maxWidth="xs"
          open={openDeleteAdminForm}
          title="Delete Admin"
          setOpen={setOpenDeleteAdminForm}
          message={<DeleteAdminForm data={data} />}
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
          <IconButton onClick={() => setOpenDeleteAdminForm(true)}>
            <img src={icons.deleteIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
