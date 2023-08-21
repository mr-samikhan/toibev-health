import React from "react";
import { Grid, Button, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Actions, TreatmentActions } from "./components/Actions";
import { CustomList } from "../../components/List";
import AlertDialog from "../../components/AlertDialog";
import { ProviderForm } from "./components/Forms/ProviderForm";
import { GroupSessionForm } from "./components/Forms/GroupSessionForm";
import { MedicationForm } from "./components/Forms/MedicationForm";
import { TreatmentForm } from "./components/Forms/TreatmentForm";
import { CustomTabs } from "../../components/Tabs";
import CustomCard from "../../components/CustomCrad";
import { useHealth } from "./useHealth";
import CardListing from "../../components/CardListing";
import icons from "../../assets";
import CustomTextfield from "../../components/CustomTextfield";
import GroupSessionCardActionButton, {
  MedicationCardActionButton,
} from "./components/CardListActionButton";
import { TreatmentList } from "./components/TreatmentList";
import { TreatmentResourceActions } from "./components/Actions";

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
    openGroupSessionForm,
    openMedicationForm,
    openTreatmentForm,
    setOpenGroupSessionForm,
    setOpenMedicationForm,
    setOpenTreatmentForm,
    isLoadingGroupSessions,
    isLoadingMedication,
    isLoadingTreatment,
    isFetchingGroupSessions,
    isFetchingMedication,
    isFetchingTreatment,
    groupSessions,
    medication,
    treatments,
  } = useHealth({});

  if (
    isLoadingProviders ||
    isFetchingProviders ||
    isFetchingGroupSessions ||
    isFetchingMedication ||
    isFetchingTreatment ||
    isLoadingGroupSessions ||
    isLoadingMedication ||
    isLoadingTreatment
  ) {
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
      {openGroupSessionForm && (
        <AlertDialog
          open={openGroupSessionForm}
          setOpen={setOpenGroupSessionForm}
          title={"Add Group Session"}
          message={<GroupSessionForm setOpen={setOpenGroupSessionForm} />}
        />
      )}
      {openMedicationForm && (
        <AlertDialog
          open={openMedicationForm}
          setOpen={setOpenMedicationForm}
          title={"Add Medication"}
          message={<MedicationForm setOpen={setOpenMedicationForm} />}
        />
      )}
      {openTreatmentForm && (
        <AlertDialog
          open={openTreatmentForm}
          setOpen={setOpenTreatmentForm}
          title={"Add Treatment"}
          message={<TreatmentForm setOpen={setOpenTreatmentForm} />}
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
        {tab === 1 && (
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
        )}
      </Grid>
      {tab === 0 && (
        <Grid container>
          <Grid item container columnSpacing={2}>
            <Grid item xs={6}>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems="center"
                mb={1}
              >
                <Typography className="recovery_title">
                  Group Sessions
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenGroupSessionForm(true)}
                >
                  {" "}
                  Add Group Sessions
                </Button>
              </Grid>
              <Grid container>
                {/* <CustomCard isLoading={isLoadingServices ?? isFetchingServices}> */}
                <CustomCard>
                  <CardListing
                    list={groupSessions}
                    CardActionButton={({ data }) => (
                      <GroupSessionCardActionButton data={data} />
                    )}
                  />
                </CustomCard>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems="center"
                mb={1}
              >
                <Typography className="recovery_title">Medication</Typography>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenMedicationForm(true)}
                >
                  {" "}
                  Add Medication
                </Button>
              </Grid>
              <Grid container>
                <CustomCard>
                  <CardListing
                    list={medication}
                    CardActionButton={({ data }) => (
                      <MedicationCardActionButton data={data} />
                    )}
                  />
                </CustomCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent={"space-between"}
            alignItems="center"
            mb={1.5}
          >
            <Typography className="recovery_title">Treatment</Typography>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              className="contained-button"
              onClick={() => setOpenTreatmentForm(true)}
            >
              {" "}
              Add Treatment
            </Button>
          </Grid>
          <Grid item container>
            <CustomTextfield multiline rows={3} label="Treatment Description" />
          </Grid>
          <TreatmentList
            ResourceActions={TreatmentResourceActions}
            Actions={TreatmentActions}
            list={treatments}
            icon={icons.peopleIcon}
          />
        </Grid>
      )}
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
