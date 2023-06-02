import { Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import icons from "../../../../assets";
import React from "react";
import AlertDialog from "../../../../components/AlertDialog";
import useActionButtons from "../../hooks/useActionButtons";
import EventForm from "../Forms/EventForm";
import "./style.scss";

export function Actions(data) {
  const { open, setOpen } = useActionButtons();
  const mobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Edit Event"
          message={
            <EventForm isEdit data={data.data} open={open} setOpen={setOpen} />
          }
        />
      )}

      <Grid container className="event-action-buttons">
        <Grid item sx={{ marginRight: "8px", alignSelf: "center" }}>
          {" "}
          <Grid
            className="clicks-count-container"
            onClick={() => mobile && setOpen(true)}
          >
            <Typography className="clicks-count">224 Clicks</Typography>
          </Grid>
        </Grid>
        {!mobile && (
          <Grid item>
            <IconButton edge="end" onClick={() => setOpen(true)}>
              <img src={icons.editIcon} />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  );
}
