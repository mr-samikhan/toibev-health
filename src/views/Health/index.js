import React from "react";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Actions } from "./components/Actions";
import { CustomList } from "../../components/List";
import { useGetProviders } from "../../hooks/useGetProviders";
import AlertDialog from "../../components/AlertDialog";
import { ProviderForm } from "./components/Forms/ProviderForm";

export function Health() {
  const { providers } = useGetProviders({});
  return (
    <>
      <AlertDialog
        open={true}
        title={"Add Medication"}
        message={<ProviderForm />}
      />
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
      <CustomList Actions={Actions} list={providers} />
    </>
  );
}
