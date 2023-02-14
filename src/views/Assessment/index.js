import React from "react";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomList } from "../../components/List";
import { Actions } from "./components/ActionButtons";

export function Assessment() {
  return (
    <>
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
