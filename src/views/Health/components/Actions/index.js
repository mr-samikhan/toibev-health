import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React from "react";
import AlertDialog from "../../../../components/AlertDialog";
import { ProviderForm } from "../Forms/ProviderForm";
import { useActions } from "../../hooks/useActions";
import { ProviderAvailabilityForm } from "../Forms/ProviderAvailabilityForm";

export function Actions({ data }) {
  const { open, setOpen, setOpenAvailability, openAvalability } = useActions(
    {}
  );

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title={"Add Medication"}
          message={
            <ProviderForm initialState={data} isEdit setOpen={setOpen} />
          }
        />
      )}
      {openAvalability && (
        <AlertDialog
          open={openAvalability}
          setOpen={setOpenAvailability}
          title={"Set Availability"}
          message={<ProviderAvailabilityForm open={openAvalability} />}
        />
      )}
      <Grid container>
        <Grid item sx={{ marginRight: "8px" }}>
          {" "}
          <IconButton edge="end" onClick={() => setOpenAvailability(true)}>
            <img src={icons.editCalendarIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          {" "}
          <IconButton edge="end" onClick={() => setOpen(true)}>
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
