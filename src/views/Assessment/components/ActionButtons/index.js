import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React, { useState } from "react";
import AlertDialog from "../../../../components/AlertDialog";
import useActions from "../../hooks/useActions";
import AssessmentForm from "../Forms/AssessmentForm";
import QuestionForm from "../Forms/QuestionForm";
import AddConditionForm from "../Forms/ConditionForm";

export function Actions({ data }) {
  const { open, setOpen } = useActions();

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Assessment"
          setOpen={setOpen}
          message={<AssessmentForm isEdit data={data} setOpen={setOpen} />}
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

export function SingleAssessmentActionButtons({ data, list }) {
  const [open, setOpen] = useState();

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Question"
          setOpen={setOpen}
          message={
            <QuestionForm isEdit initialState={data} setOpen={setOpen} />
          }
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

export function ConditionActionButtons({ data, list }) {
  const [open, setOpen] = useState();

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Question"
          setOpen={setOpen}
          message={
            <AddConditionForm isEdit initialState={data} setOpen={setOpen} />
          }
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
