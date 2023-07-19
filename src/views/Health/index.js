import React from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Actions } from "./components/Actions";
import { CustomList } from "../../components/List";
import AlertDialog from "../../components/AlertDialog";
import { ProviderForm } from "./components/Forms/ProviderForm";
import { CustomTabs } from "../../components/Tabs";
import { useProviders } from "./useProviders";
import icons from "../../assets";

export function Health() {
  const {
    tab,
    setTab,
    providers,
    openAddProvider,
    setOpenAddProvider,
    handleClick,
    isLoadingProviders,
    isFetchingProviders,
  } = useProviders({});

  if (isLoadingProviders || isFetchingProviders) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      {openAddProvider && (
        <AlertDialog
          open={openAddProvider}
          setOpen={setOpenAddProvider}
          title={"Add Medication"}
          message={<ProviderForm setOpen={setOpenAddProvider} />}
        />
      )}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item>
          {" "}
          <CustomTabs
            options={["Recovery", "Providers"]}
            setTab={setTab}
            tab={tab}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
            onClick={handleClick}
          >
            {" "}
            Add
          </Button>
        </Grid>
      </Grid>
      {tab === 0 && <CustomList Actions={Actions} list={[]} />}
      {tab === 1 && (
        <CustomList
          Actions={Actions}
          list={providers}
          icon={icons.peopleIcon}
        />
      )}
    </>
  );
}
