import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React from "react";
import AlertDialog from "../../../../components/AlertDialog";
import useActions from "../../hooks/useActions";
import AddAssessmentForm from "../AddAssessmentForm";

export function Actions({ data }) {
  const { open, setOpen } = useActions();

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Assessment"
          setOpen={setOpen}
          message={<AddAssessmentForm isEdit data={data} />}
        />
      )}
      <Grid container>
        <Grid item>
          {" "}
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => setOpen(true)}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
