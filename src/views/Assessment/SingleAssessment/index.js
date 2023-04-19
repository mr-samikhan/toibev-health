import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "../../../components/AlertDialog";
import AddQuestionForm from "../components/AddQuestionForm";
import AddConditionForm from "../components/AddConditionForm";

export default function SingleAssessment() {
  const [openQusetion, setOpenQuestion] = useState(false);
  const [openCondition, setOpenCondition] = useState(false);
  return (
    <>
      {openQusetion && (
        <AlertDialog
          open={openQusetion}
          setOpen={setOpenQuestion}
          title="Add Question"
          message={<AddQuestionForm />}
        />
      )}
      {openCondition && (
        <AlertDialog
          open={openCondition}
          setOpen={setOpenCondition}
          title="Add Condition"
          message={<AddConditionForm />}
        />
      )}

      <Grid container flexDirection="column">
        <Grid item>
          <Grid container>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography fontWeight={500} fontSize="20px">
                  Opioid Use
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenQuestion(true)}
                >
                  {" "}
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography fontWeight={500} fontSize="20px">
                  Condition
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenCondition(true)}
                >
                  {" "}
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
