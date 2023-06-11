import React from "react";
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "../../components/AlertDialog";
import CustomCard from "../../components/CustomCrad";
import CardListing from "../../components/CardListing";
import { useInformation } from "./useInformation";
import CustomTextfield from "../../components/CustomTextfield";
import CustomButton from "../../components/CustomButton";
import ServiceForm from "./components/Forms/ServiceForm";
import ClinicForm from "./components/Forms/ClinicForm";
import CardActionButton, {
  ClinicCardActionButton,
} from "./components/CardListActionButton";
import "./style.scss";

export function Information() {
  const {
    description,
    services,
    isLoadingServices,
    isFetchingServices,
    clinics,
    isLoadingClinics,
    isFetchingClinics,
    urls,
    open,
    setOpen,
    openClinicForm,
    setOpenClinicForm,
  } = useInformation();
  const mobile = useMediaQuery("(max-width:600px)");
  if (
    isLoadingClinics ||
    isFetchingClinics ||
    isLoadingServices ||
    isFetchingServices
  ) {
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
          message={<ServiceForm setOpen={setOpen} />}
        />
      )}
      {openClinicForm && (
        <AlertDialog
          open={openClinicForm}
          title="Add Clinic"
          setOpen={setOpenClinicForm}
          message={<ClinicForm setOpen={setOpenClinicForm} />}
        />
      )}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item>
          <Typography className="information-title">Services</Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            {" "}
            {!mobile && "Add Service"}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          {mobile ? (
            <CustomCard noSearch>
              <Grid px={2} pt={1}>
                <CustomTextfield
                  multiline
                  sx={{
                    "& .MuiInputBase-input": {
                      minHeight: "368px",
                      padding: "16px",
                    },
                  }}
                  label="Services Description"
                  value={description}
                />
              </Grid>
            </CustomCard>
          ) : (
            <CustomTextfield
              multiline
              sx={{
                "& .MuiInputBase-input": {
                  minHeight: "368px",
                  padding: "16px",
                },
              }}
              label="Services Description"
              value={description}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomCard isLoading={isLoadingServices ?? isFetchingServices}>
            <CardListing list={services} CardActionButton={CardActionButton} />
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomCard
            heading="Clinics"
            isLoading={isLoadingClinics ?? isFetchingClinics}
            buttonText="Add Clinic"
            buttonAction={() => {
              setOpenClinicForm(true);
            }}
          >
            <CardListing
              list={clinics}
              CardActionButton={ClinicCardActionButton}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard heading="Toiyabe Social" noSearch>
            <Grid container flexDirection="column" px={2} flexGrow={1}>
              <Grid item mb={4}>
                <CustomTextfield
                  placeholder="Facebook URL"
                  label="Facebook URL"
                  value={urls?.facebook}
                />
              </Grid>
              <Grid item mb={4}>
                {" "}
                <CustomTextfield
                  placeholder="LinkedIn URL"
                  label="LinkedIn URL"
                  value={urls?.linkedIn}
                />
              </Grid>
              <Grid item container flexGrow={1}>
                <Grid item xs={12} alignSelf="flex-end">
                  <CustomButton variant="contained" fullWidth color="primary">
                    SAVE
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </CustomCard>
        </Grid>
      </Grid>
    </>
  );
}
