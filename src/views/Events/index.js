import React from "react";
import { Grid, Button, useMediaQuery, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Actions } from "./components/ActionButtons";
import { CustomList } from "../../components/List";
import EventForm from "./components/Forms/EventForm";
import AlertDialog from "../../components/AlertDialog";
import useEvent from "./useEvent";

export function Events() {
  const { open, setOpen, data, isLoading, isFetching } = useEvent();
  const mobile = useMediaQuery("(max-width: 600px)");

  if (isLoading || isFetching) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Add Service"
          setOpen={setOpen}
          message={<EventForm open={open} setOpen={setOpen} />}
        />
      )}

      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
            onClick={() => setOpen(true)}
          >
            {" "}
            {!mobile && "Add"}
          </Button>
        </Grid>
      </Grid>
      <CustomList list={data} Actions={Actions} listing="events" />
    </>
  );
}
