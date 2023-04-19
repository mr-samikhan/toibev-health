import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "../../components/AlertDialog";
import { CustomList } from "../../components/List";
import AddAssessmentForm from "./components/AddAssessmentForm";
import { Actions } from "./components/ActionButtons";

export function Assessment() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Add Assessment"
          setOpen={setOpen}
          message={<AddAssessmentForm />}
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
            Add
          </Button>
        </Grid>
      </Grid>
      <CustomList Actions={Actions} />
    </>
  );
}
